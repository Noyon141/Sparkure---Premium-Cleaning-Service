import nextPlugin from "@next/eslint-plugin-next";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import ts from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

const eslintConfig = [
  {
    ignores: [
      "lib/generated/",
      "node_modules/",
      ".next/",
      "out/",
      "dist/",
      "build/",
      ".env*",
      "!.env.example",
      "*.tsbuildinfo",
      "next-env.d.ts",
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "pids",
      "*.pid",
      "*.seed",
      "*.pid.lock",
      "coverage/",
      ".npm",
      ".node_repl_history",
      "*.tgz",
      ".yarn-integrity",
      ".env",
      ".cache",
      ".parcel-cache",
      ".nuxt",
      ".vuepress/dist",
      ".serverless",
      ".fusebox/",
      ".dynamodb/",
      ".tern-port",
      ".vscode-test",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": typescriptPlugin,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: ts,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
