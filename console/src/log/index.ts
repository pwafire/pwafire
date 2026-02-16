import type { LogType } from "../types";

export const logConsole = (message: string, type: LogType = "info"): void => {
  const consoleEl = document.getElementById("console");
  if (!consoleEl) return;

  const line = document.createElement("div");
  line.className = `console-line ${type}`;
  const time = new Date().toLocaleTimeString();
  line.textContent = `[${time}] ${message}`;
  consoleEl.appendChild(line);
  consoleEl.scrollTop = consoleEl.scrollHeight;
};

export const clearConsole = (): void => {
  const consoleEl = document.getElementById("console");
  if (!consoleEl) return;

  consoleEl.innerHTML =
    '<div class="console-line info">> Console cleared <span class="blink">_</span></div>';
  logConsole("Console cleared", "info");
};

export const toggleConsole = (): void => {
  const consoleEl = document.getElementById("console");
  const toggleText = document.getElementById("console-toggle-text");

  if (!consoleEl || !toggleText) return;

  if (consoleEl.classList.contains("hidden")) {
    consoleEl.classList.remove("hidden");
    toggleText.textContent = "Hide Terminal";
  } else {
    consoleEl.classList.add("hidden");
    toggleText.textContent = "Show Terminal";
  }
};
