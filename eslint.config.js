import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Node.js globals
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        console: "readonly",
        // Browser globals
        window: "readonly",
        document: "readonly",
        gtag: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    ignores: ["node_modules/**", "_site/**", "src/site/js/main.js"],
  },
];
