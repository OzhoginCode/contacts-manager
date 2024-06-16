const eslintConfig = require("../eslint.config");

describe("ESLint Configuration", () => {
  it("should export a valid configuration array", () => {
    expect(Array.isArray(eslintConfig.overrides)).toBe(true);
  });

  it("should include languageOptions with expected properties", () => {
    eslintConfig.overrides.forEach((override) => {
      expect(override.parserOptions.ecmaVersion).toBe(2021);
      expect(override.parserOptions.sourceType).toBe("module");
      expect(override.parserOptions.ecmaFeatures.jsx).toBe(true);
    });
  });

  it("should include recommended JS rules from plugin", () => {
    eslintConfig.overrides.forEach((override) => {
      const hasRecommendedJsConfig = override.extends && override.extends.includes("plugin:js/recommended");
      expect(hasRecommendedJsConfig).toBe(true);
    });
  });

  it("should correctly handle JSX files", () => {
    eslintConfig.overrides.forEach((override) => {
      const jsxFileConfig = override.files && (override.files.includes("**/*.jsx") || override.files.includes("**/*.js"));
      expect(jsxFileConfig).toBe(true);
    });
  });

  it("should fixup config rules for React plugin", () => {
    eslintConfig.overrides.forEach((override) => {
      if (override.rules) {
        const { fixupConfigRules } = require("@eslint/compat");
        const pluginReactConfig = require("eslint-plugin-react").configs.recommended;
        const fixedUpConfig = Object.values(override.rules).some(
          (rule) => typeof rule === "object" && fixupConfigRules(pluginReactConfig, rule)
        );
        expect(fixedUpConfig).toBe(true);
      }
    });
  });

  it("should correctly configure React rules and settings", () => {
    eslintConfig.overrides.forEach((override) => {
      if (override.plugins && override.plugins.includes("react")) {
        const eslintPluginReact = require("eslint-plugin-react");
        expect(override.plugins.includes("react")).toBe(true);
        expect(eslintPluginReact).toBeTruthy();
      }
    });
  });
});
