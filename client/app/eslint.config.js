const globals = require("globals");

module.exports = {
  overrides: [
    {
      files: ["**/*.js", "**/*.jsx"],
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        browser: true,
      },
      globals: {
        ...globals.browser,
      },
      extends: [
        "plugin:react/recommended",
        "plugin:js/recommended",
      ],
      plugins: ["react"],
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};