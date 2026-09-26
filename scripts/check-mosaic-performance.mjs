import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "./browser-runtime.mjs";

const base = (process.env.MUSE_TEST_URL || "http://127.0.0.1:3106").replace(/\/$/, "");
const output = process.env.MUSE_PERFORMANCE_OUTPUT
  ? resolve(process.env.MUSE_PERFORMANCE_OUTPUT)
  : fileURLToPath(new URL("../test-results/performance.json", import.meta.url));
const screenshots = process.env.MUSE_PERFORMANCE_SCREENSHOTS === "1";
const observationMs = 5000;
const reports = [];
mkdirSync(dirname(output), { recursive: true });
const browser = await launchBrowser();

function save() {
  writeFileSync(output, `${JSON.stringify(reports, null, 2)}\n`);
}

try {
  for (const locale of ["en", "ar"]) {
    for (const motion of ["no-preference", "reduce"]) {
      // An isolated context has no cookies, storage, service workers, or HTTP
      // cache inherited from an earlier measurement. CDP also disables caching.
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        hasTouch: true,
        isMobile: true,
        reducedMotion: motion,
        serviceWorkers: "block",
      });
      const report = {
        direction: "mosaic", locale, motion,
        url: `${base}/${locale}`,
        measuredAt: new Date().toISOString(),
        viewport: "390x844", deviceScaleFactor: 2,
        conditions: "Cold isolated browser context; cache disabled; 4x CPU slowdown; 1.6 Mbps download; 150 ms latency. Local machine lab measurement, not field data.",
        observationMsAfterLoad: observationMs,
        complete: false,
        errors: [], consoleErrors: [], blockedMutations: [], requestFailures: [], cancelledPrefetches: [],
      };
      let transferredBytes = 0;
      let observing = true;
      try {
        await context.route("**/*", route => {
          const request = route.request();
          if (["GET", "HEAD", "OPTIONS"].includes(request.method())) return route.continue();
          report.blockedMutations.push({ method: request.method(), url: request.url() });
          return route.abort("blockedbyclient");
        });
        await context.addInitScript(() => {
          performance.setResourceTimingBufferSize(1000);
          const metrics = {
            lcp: 0, lcpElement: null, cls: 0, cumulativeLayoutShift: 0,
            layoutShifts: [], longTasks: [], supported: PerformanceObserver.supportedEntryTypes,
          };
          const observers = [];
          let sessionValue = 0, sessionStart = 0, previousShift = 0;
          const describe = element => element ? {
            tag: element.tagName?.toLowerCase(),
            id: element.id || undefined,
            className: element.getAttribute?.("class") || undefined,
          } : null;
          const handlers = {
            "largest-contentful-paint": entries => {
              for (const entry of entries) {
                metrics.lcp = entry.startTime;
                metrics.lcpElement = { ...describe(entry.element), size: entry.size, url: entry.url || undefined };
              }
            },
            "layout-shift": entries => {
              for (const entry of entries) {
                if (entry.hadRecentInput) continue;
                // CLS is the largest session window, not a sum over the page's
                // entire lifetime: at most 5s, with no gap over 1s between shifts.
                if (!sessionStart || entry.startTime - previousShift > 1000 || entry.startTime - sessionStart > 5000) {
                  sessionStart = entry.startTime;
                  sessionValue = 0;
                }
                sessionValue += entry.value;
                previousShift = entry.startTime;
                metrics.cls = Math.max(metrics.cls, sessionValue);
                metrics.cumulativeLayoutShift += entry.value;
                metrics.layoutShifts.push({ startTime: entry.startTime, value: entry.value,
                  sources: (entry.sources || []).map(source => describe(source.node)) });
              }
            },
            longtask: entries => {
              for (const entry of entries) metrics.longTasks.push({ startTime: entry.startTime, duration: entry.duration });
            },
          };
          for (const [type, handler] of Object.entries(handlers)) {
            if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue;
            const observer = new PerformanceObserver(list => handler(list.getEntries()));
            observer.observe({ type, buffered: true });
            observers.push({ observer, handler });
          }
          window.__mosaicPerformance = metrics;
          window.__mosaicFlushPerformance = () => {
            for (const { observer, handler } of observers) handler(observer.takeRecords());
          };
        });

        const page = await context.newPage();
        page.on("pageerror", error => { if (observing) report.errors.push(error.message); });
        page.on("console", message => { if (observing && message.type() === "error") report.consoleErrors.push(message.text()); });
        page.on("requestfailed", request => {
          if (!observing) return;
          const failure = { url: request.url(), error: request.failure()?.errorText };
          const headers = request.headers();
          // Next can cancel speculative route prefetches when its scheduling
          // priority changes. Keep the evidence without calling an unused
          // navigation response a failed page asset.
          const speculative = headers["next-router-prefetch"] === "1" || headers.purpose === "prefetch";
          if (speculative && failure.error === "net::ERR_ABORTED") report.cancelledPrefetches.push(failure);
          else report.requestFailures.push(failure);
        });
        const session = await context.newCDPSession(page);
        await session.send("Network.enable");
        await session.send("Network.setCacheDisabled", { cacheDisabled: true });
        session.on("Network.loadingFinished", event => { transferredBytes += event.encodedDataLength; });
        await session.send("Network.emulateNetworkConditions", {
          offline: false,
          latency: 150,
          downloadThroughput: 200000, // 1.6 megabits / 8 = 200,000 bytes/second.
          uploadThroughput: 90000,
        });
        await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });

        const response = await page.goto(report.url, { waitUntil: "load", timeout: 90000 });
        report.httpStatus = response?.status();
        assert.equal(report.httpStatus, 200, `Unexpected HTTP status ${report.httpStatus}`);
        await page.locator(".mosaic-home h1").waitFor({ timeout: 15000 });
        // A fixed post-load observation window makes all four samples comparable.
        // This captures late font/layout updates and animation main-thread work.
        await page.waitForTimeout(observationMs);
        const data = await page.evaluate(() => {
          window.__mosaicFlushPerformance();
          const metrics = window.__mosaicPerformance;
          const navigation = performance.getEntriesByType("navigation")[0];
          const fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? null;
          const resources = performance.getEntriesByType("resource").map(entry => ({
            name: new URL(entry.name).pathname,
            origin: new URL(entry.name).origin,
            type: entry.initiatorType,
            bytes: entry.transferSize,
            encodedBodyBytes: entry.encodedBodySize,
            decodedBodyBytes: entry.decodedBodySize,
            duration: Math.round(entry.duration),
            startTime: Math.round(entry.startTime),
          }));
          return {
            lcp: Math.round(metrics.lcp), lcpElement: metrics.lcpElement,
            fcp: fcp === null ? null : Math.round(fcp),
            cls: metrics.cls, cumulativeLayoutShift: metrics.cumulativeLayoutShift,
            layoutShifts: metrics.layoutShifts,
            longTasks: metrics.longTasks.map(entry => ({
              startTime: Math.round(entry.startTime), duration: Math.round(entry.duration),
            })),
            longTaskSummary: {
              count: metrics.longTasks.length,
              totalDurationMs: Math.round(metrics.longTasks.reduce((sum, entry) => sum + entry.duration, 0)),
              longestDurationMs: Math.round(Math.max(0, ...metrics.longTasks.map(entry => entry.duration))),
              // This is an observation-window diagnostic, not Lighthouse TBT.
              blockingTimeAfterFcpMs: fcp === null ? null : Math.round(metrics.longTasks.filter(entry => entry.startTime >= fcp).reduce((sum, entry) => sum + Math.max(0, entry.duration - 50), 0)),
            },
            resources,
            resourceTransferBytes: resources.reduce((sum, resource) => sum + resource.bytes, 0),
            navigation: navigation ? {
              ttfbMs: Math.round(navigation.responseStart),
              domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
              loadMs: Math.round(navigation.loadEventEnd),
              documentTransferBytes: navigation.transferSize,
            } : null,
            observedUntilMs: Math.round(performance.now()),
            metricsSupported: metrics.supported,
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: innerWidth,
          };
        });
        Object.assign(report, data, { networkTransferredBytes: transferredBytes });
        if (screenshots) {
          const screenshotDirectory = `${dirname(output)}/performance-screenshots`;
          mkdirSync(screenshotDirectory, { recursive: true });
          report.screenshot = `${screenshotDirectory}/${locale}-${motion}.png`;
          // Screenshot happens after metrics are sampled, keeping its extra
          // rendering work out of the measured observation window.
          await page.screenshot({ caret: "initial", path: report.screenshot, animations: "allow" });
        }
        assert(report.lcp > 0, "No LCP candidate was recorded");
        assert.deepEqual(report.errors, [], "Browser runtime errors during measurement");
        assert.deepEqual(report.blockedMutations, [], "Unexpected mutation request was blocked");
        assert.deepEqual(report.requestFailures, [], "Resources failed to load during measurement");
        report.complete = true;
      } catch (error) {
        report.measurementError = error.stack || error.message;
        console.error(`FAIL Mosaic performance ${locale} ${motion}: ${error.message}`);
      } finally {
        // Closing an isolated context can cancel in-flight prefetches; those
        // deliberate shutdowns are outside the recorded measurement window.
        observing = false;
        reports.push(report);
        save();
        await context.close();
      }
      console.log(JSON.stringify({
        locale, motion, complete: report.complete,
        LCP_ms: report.lcp, CLS: report.cls,
        transfer_bytes: report.networkTransferredBytes,
        longTasks: report.longTaskSummary,
        pageErrors: report.errors,
      }));
    }
  }
} finally {
  await browser.close();
  save();
}

console.log(`Mosaic performance evidence: ${output}`);
process.exitCode = reports.length !== 4 || reports.some(report => !report.complete) ? 1 : 0;
