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
  }
}

export const init = (): void => {
  window.pwafire = pwafire;
  window.check = check;
  window.runTest = runTest;
  window.runAllTests = runAllTests;
  window.clearConsole = clearConsole;
  window.toggleConsole = toggleConsole;
  window.checkAllFeatures = checkAllFeatures;
  window.closeSidebar = closeSidebar;
  window.downloadStream = downloadStream;

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
};
