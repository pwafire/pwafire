import "../styles.css";
import * as pwafire from "pwafire";
import * as check from "pwafire/check";
import { initMatrixEffect } from "../matrix";
import { logConsole, clearConsole, toggleConsole } from "../log";
import { closeSidebar, downloadStream } from "../results";
import { updateStats } from "../stats";
import { generateTests, runTest, runAllTests } from "../tests";
import { checkAllFeatures } from "../features";
import { initKeyboardShortcuts } from "../keyboard";

declare global {
  interface Window {
    pwafire: typeof pwafire;
    check: typeof check;
    runTest: typeof runTest;
    runAllTests: typeof runAllTests;
    clearConsole: typeof clearConsole;
    toggleConsole: typeof toggleConsole;
    checkAllFeatures: typeof checkAllFeatures;
    closeSidebar: typeof closeSidebar;
    downloadStream: typeof downloadStream;
    showTopLoadingBar: () => void;
    hideTopLoadingBar: () => void;
    __visibilityUnlisten: (() => void) | null;
  }
}

export const showTopLoadingBar = (): void => {
  const loadingBar = document.getElementById("top-loading-bar");
  if (loadingBar) {
    loadingBar.classList.remove("complete");
    loadingBar.classList.add("active", "loading");
  }
};

export const hideTopLoadingBar = (): void => {
  const loadingBar = document.getElementById("top-loading-bar");
  if (loadingBar) {
    loadingBar.classList.remove("loading");
    loadingBar.classList.add("complete");

    // Reset after animation completes
    setTimeout(() => {
      loadingBar.classList.remove("active", "complete");
    }, 300);
  }
};

export const init = (): void => {
  window.pwafire = pwafire;
  window.check = check;
  window.__visibilityUnlisten = null;
  window.runTest = runTest;
  window.runAllTests = runAllTests;
  window.clearConsole = clearConsole;
  window.toggleConsole = toggleConsole;
  window.checkAllFeatures = checkAllFeatures;
  window.closeSidebar = closeSidebar;
  window.downloadStream = downloadStream;
  window.showTopLoadingBar = showTopLoadingBar;
  window.hideTopLoadingBar = hideTopLoadingBar;

  logConsole("PWAFire package loaded successfully", "success");
  logConsole("Available exports: " + Object.keys(pwafire).length, "info");
  logConsole(
    "Check API loaded with " + Object.keys(check).length + " feature checks",
    "info"
  );

  generateTests();
  updateStats();
  initMatrixEffect();
  initKeyboardShortcuts();
  checkAllFeatures();

  // Hide loading screen and show content after 2s delay
  const loadingScreen = document.getElementById("loading-screen");
  const container = document.querySelector(".container");

  if (loadingScreen && container) {
    setTimeout(() => {
      // Fade out loading screen
      loadingScreen.classList.add("fade-out");
      container.classList.add("loaded");

      // Remove loading screen from DOM after fade
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 2000);
  }
};

// Initialize the app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
