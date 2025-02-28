module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    'import/no-unresolved': 0,
    'indent': ['error', 4, { 'SwitchCase': 1 }],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'max-len': ['error', { 'code': 120 }],
    'object-curly-spacing': ['error', 'always'],
    'block-spacing': ['error', 'always'],
    'brace-style': ["error", "1tbs", { "allowSingleLine": true }],
    'linebreak-style': 0,
    'require-jsdoc': 0,
  },
};
