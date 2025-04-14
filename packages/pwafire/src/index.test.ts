import { visibility } from "./pwa/visibility";
import { check } from "./check";

describe("pwafire", () => {
  // Test CommonJS imports
  describe("CommonJS imports", () => {
    it("should work with require()", () => {
      const { visibility: visibilityCJS } = require("./pwa/visibility");
      expect(visibilityCJS).toBeDefined();
      expect(typeof visibilityCJS).toBe("function");
    });
  });

  // Test ESM imports
  describe("ESM imports", () => {
    it("should work with import", () => {
      expect(visibility).toBeDefined();
      expect(typeof visibility).toBe("function");
    });
  });

  // Test API functionality
  describe("API functionality", () => {
    it("should be able to call visibility API", async () => {
      const isVisible = jest.fn();
      const notAvailable = jest.fn();

      // Mock document.visibilityState
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: () => 'visible'
      });

      await visibility(isVisible, notAvailable);

      expect(isVisible).toHaveBeenCalled();
      expect(notAvailable).not.toHaveBeenCalled();
    });

    it("should be able to call check API", () => {
      const result = check.visibility();
      expect(typeof result).toBe("boolean");
    });
  });
});
