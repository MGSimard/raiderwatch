import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import { tanstackConfig } from "@tanstack/eslint-config";
import pluginRouter from "@tanstack/eslint-plugin-router";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import drizzlePlugin from "eslint-plugin-drizzle";

export default defineConfig([
  globalIgnores([".output", ".tanstack", ".vscode", "node_modules"]),

  // TanStack ecosystem
  tanstackConfig,
  pluginRouter.configs["flat/recommended"],

  // JavaScript
  {
    extends: [eslint.configs.recommended],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  // TypeScript
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      drizzle: drizzlePlugin,
    },
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      eslintReact.configs["recommended-typescript"],
      reactHooks.configs.flat["recommended-latest"],
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: false,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
      "drizzle/enforce-delete-with-where": [
        "error",
        {
          drizzleObjectName: ["db", "ctx.db"],
        },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        {
          drizzleObjectName: ["db", "ctx.db"],
        },
      ],
    },
  },

  // Prettier
  eslintConfigPrettier,
]);
