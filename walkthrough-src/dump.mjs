// Full bilingual content dump for the walkthrough PDF author.
// Run with node 24 from repo root: dumps /tmp/wt-messages.txt and /tmp/wt-content.txt
import fs from "fs";

const en = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));
const ar = JSON.parse(fs.readFileSync("messages/ar.json", "utf8"));
const out = [];

function walk(prefix, e, a) {
  if (e && typeof e === "object" && !Array.isArray(e)) {
    for (const k of Object.keys(e)) walk(prefix + "." + k, e[k], a?.[k]);
  } else {
    const ev = typeof e === "string" ? e : JSON.stringify(e);
    const av = typeof a === "string" ? a : JSON.stringify(a);
    if (av !== undefined && av !== ev) out.push(`\n${prefix}\n  EN: ${ev}\n  AR: ${av}`);
    else if (av !== undefined) out.push(`\n${prefix}\n  BOTH: ${ev}`);
    else out.push(`\n${prefix}\n  EN: ${ev}  (no AR)`);
  }
}
walk("messages", en, ar);
fs.writeFileSync("/tmp/wt-messages.txt", out.join(""));
console.log("messages dump:", fs.statSync("/tmp/wt-messages.txt").size, "bytes");

const { services: enServices } = await import("../lib/content/en/services.ts");
const { services: arServices } = await import("../lib/content/ar/services.ts");
const { careerRoles: enCareers } = await import("../lib/content/en/careers.ts");
const { careerRoles: arCareers } = await import("../lib/content/ar/careers.ts");
const t = [];

function dumpRec(label, e, a) {
  for (const [i, r] of e.entries()) {
    t.push(`\n## ${label}[${i}] slug=${r.slug}`);
    for (const k of Object.keys(r)) {
      const ev = r[k], av = a?.[i]?.[k];
      if (typeof ev === "string" && typeof av === "string") {
        t.push(`${k}\n  EN: ${ev}\n  AR: ${av}`);
      } else if (Array.isArray(ev) && Array.isArray(av)) {
        for (let j = 0; j < Math.max(ev.length, av.length); j++) {
          t.push(`${k}[${j}]\n  EN: ${ev[j] ?? "(none)"}\n  AR: ${av[j] ?? "(none)"}`);
        }
      } else if (ev && typeof ev === "object") {
        for (const k2 of Object.keys(ev)) {
          const e2 = ev[k2], a2 = av?.[k2];
          if (typeof e2 === "string") {
            t.push(`${k}.${k2}\n  EN: ${e2}\n  AR: ${typeof a2 === "string" ? a2 : "(obj)"}`);
          } else if (Array.isArray(e2)) {
            for (let j = 0; j < Math.max(e2.length, (a2 || []).length); j++) {
              t.push(`${k}.${k2}[${j}]\n  EN: ${e2[j] ?? "(none)"}\n  AR: ${(a2 || [])[j] ?? "(none)"}`);
            }
          }
        }
      }
    }
  }
}
dumpRec("services", enServices, arServices);
dumpRec("careers", enCareers, arCareers);
fs.writeFileSync("/tmp/wt-content.txt", t.join(""));
console.log("content dump:", fs.statSync("/tmp/wt-content.txt").size, "bytes");
