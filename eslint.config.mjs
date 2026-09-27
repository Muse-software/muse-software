import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".next-*/**",
    ".next-muse-dev/**",
    ".next-muse-release/**",
    "docs/mosaic-launch/evidence/**",
    ".next-production/**",
    ".next-directions/**",
    ".next-directions-release/**",
    ".next-premium-dev/**",
    ".next-premium-release/**",
    ".next-mosaic-dev/**",
    ".next-mosaic-release/**",
    "public/draco/**",
    "docs/mosaic/evidence/**",
    "mosaic-evidence/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
