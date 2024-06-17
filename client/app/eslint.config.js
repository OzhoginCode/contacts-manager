const globals = require("globals");

module.exports = {
  overrides: [
    {
      files: ["**/*.js"],
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
      env: {
        browser: true,
      },
      globals: {
        ...globals.browser,
      },
      extends: [
        "eslint:recommended",
        "plugin:js/recommended",
      ],
      plugins: [],
      rules: {
        "no-console": "warn",
        "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
        "eqeqeq": ["error", "always"],
        "curly": ["error", "all"],
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
      },
    },
  ],
};