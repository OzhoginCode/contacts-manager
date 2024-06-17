const eslintConfig = require("../eslint.config");

describe("ESLint Configuration", () => {
  it("should export a valid configuration array", () => {
    expect(Array.isArray(eslintConfig.overrides)).toBe(true);
  });

  it("should include parserOptions with expected properties", () => {
    eslintConfig.overrides.forEach((override) => {
      expect(override.parserOptions.ecmaVersion).toBe(2021);
      expect(override.parserOptions.sourceType).toBe("module");
    });
  });

  it("should include recommended JS rules from plugin", () => {
    eslintConfig.overrides.forEach((override) => {
      const hasRecommendedJsConfig = override.extends && override.extends.includes("plugin:js/recommended");
      expect(hasRecommendedJsConfig).toBe(true);
    });
  });

  it("should correctly handle JS files", () => {
    eslintConfig.overrides.forEach((override) => {
      const jsFileConfig = override.files && override.files.includes("**/*.js");
      expect(jsFileConfig).toBe(true);
    });
  });

  it("should include the correct frontend rules", () => {
    eslintConfig.overrides.forEach((override) => {
      const rules = override.rules;

      expect(rules["no-console"]).toBe("warn");
      expect(rules["no-unused-vars"]).toEqual(["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]);
      expect(rules["eqeqeq"]).toEqual(["error", "always"]);
      expect(rules["curly"]).toEqual(["error", "all"]);
      expect(rules["semi"]).toEqual(["error", "always"]);
      expect(rules["quotes"]).toEqual(["error", "single"]);
    });
  });
});
