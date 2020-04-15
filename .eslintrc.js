module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "react-app",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:prettier/recommended",
    "prettier",
  ],
  globals: {
    __PATH_PREFIX__: true,
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["jsx-a11y", "import", "prettier"],
  rules: {},
};
