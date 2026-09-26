import { chromium } from "playwright";
import { existsSync } from "node:fs";

export const testUrl = process.env.MUSE_TEST_URL || "http://127.0.0.1:3100";
// Prefer the explicit override, then the locally available browser, then Playwright's install.
export async function launchBrowser(options = {}) {
  const localBrowser = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
  const executablePath =
    process.env.MUSE_CHROMIUM ||
    (existsSync(localBrowser) ? localBrowser : undefined);
  return chromium.launch({
    headless: true,
    ...options,
    ...(executablePath ? { executablePath } : {}),
  });
}
