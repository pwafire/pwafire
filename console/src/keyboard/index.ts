import { runAllTests } from "../tests";
import { clearConsole, toggleConsole } from "../log";
import { checkAllFeatures } from "../features";

export const initKeyboardShortcuts = (): void => {
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "r") {
      e.preventDefault();
      runAllTests();
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      clearConsole();
    } else if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      checkAllFeatures();
    } else if (e.ctrlKey && e.key === "t") {
      e.preventDefault();
      toggleConsole();
    }
  });
};
