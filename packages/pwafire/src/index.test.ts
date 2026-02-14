import { visibility } from "./pwa/visibility";
import * as check from "./check";

describe("pwafire", () => {
  // Test CommonJS imports
  describe("CommonJS imports", () => {
    it("should work with require()", async () => {
      const visibilityModule = await import("./pwa/visibility");
      expect(visibilityModule.visibility).toBeDefined();
      expect(typeof visibilityModule.visibility).toBe("function");
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
      // Mock document.visibilityState
      Object.defineProperty(document, "visibilityState", {
        configurable: true,
        get: () => "visible",
      });

      const result = await visibility();

      expect(result).toBeDefined();
      expect(result.ok).toBe(true);
      expect(result.state).toBe("visible");
      expect(result.message).toBe("Page is visible");
    });

    it("should be able to call check API", () => {
      const result = check.visibility();
      expect(typeof result).toBe("boolean");
    });
  });
});
