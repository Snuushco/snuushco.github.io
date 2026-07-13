import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    // Existing generated/legacy marketing pages predate the flat config. Keep
    // these migration findings visible without blocking focused release gates.
    rules: {
      "react/no-unescaped-entities": "warn",
      "@next/next/no-html-link-for-pages": "warn",
      "@next/next/no-img-element": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  globalIgnores([".next/**", "node_modules/**", "public/uploads/**", "tsconfig.tsbuildinfo"]),
]);
