// Nested services fields dump (pillars, whatWeDo, whyWorkWithUs, faq) EN/AR.
import fs from "fs";
const { services: en } = await import("../lib/content/en/services.ts");
const { services: ar } = await import("../lib/content/ar/services.ts");
const t = [];
for (let i = 0; i < 3; i++) {
  const E = en[i], A = ar[i];
  for (const field of ["pillars", "whatWeDo", "whyWorkWithUs"]) {
    if (E[field]) {
      for (let j = 0; j < E[field].length; j++) {
        const e = E[field][j], a = A[field][j];
        const keys = Object.keys(e).filter((k) => typeof e[k] === "string");
        t.push(`services[${i}].${field}[${j}]`);
        for (const k of keys) t.push(`  ${k} EN: ${e[k]}`);
        for (const k of keys) t.push(`  ${k} AR: ${a?.[k] ?? "(none)"}`);
      }
    }
  }
  if (E.faq) {
    for (let j = 0; j < E.faq.length; j++) {
      t.push(`services[${i}].faq[${j}]`);
      t.push(`  q EN: ${E.faq[j].q}`);
      t.push(`  q AR: ${A.faq[j].q}`);
      t.push(`  a EN: ${E.faq[j].a}`);
      t.push(`  a AR: ${A.faq[j].a}`);
    }
  }
}
fs.writeFileSync("/tmp/wt-nested.txt", t.join("\n"));
console.log("nested dump:", fs.statSync("/tmp/wt-nested.txt").size, "bytes");
