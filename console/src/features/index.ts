import * as check from "pwafire/check";
import { logConsole } from "../log";

export const featureDisplayNames: Record<string, string> = {
  badging: "Badging",
  barcode: "Barcode Detector",
  clipboard: "Clipboard",
  compression: "Compression",
  connectivity: "Network Info",
  contacts: "Contacts",
  contentIndexing: "Content Index",
  files: "File System",
  fonts: "Font Access",
  fullscreen: "Fullscreen",
  idleDetection: "Idle Detection",
  install: "Install",
  lazyLoad: "Lazy Loading",
  notification: "Notification",
  passkey: "Passkey",
  payment: "Payment Request",
  screenShare: "Screen Share",
  summarizer: "Summarizer",
  translator: "Translator",
  languageDetector: "Language Detector",
  visibility: "Visibility",
  wakeLock: "Wake Lock",
  webOtp: "Web OTP",
  webShare: "Web Share",
};

export const aiFeatures = ["summarizer", "translator", "languageDetector"];

export const checkAllFeatures = (): void => {
  logConsole("Scanning for PWA features...", "info");

  const listEl = document.getElementById("feature-list");
  if (!listEl) return;

  listEl.innerHTML = "";
  let supported = 0;
  let total = 0;

  (Object.keys(check) as Array<keyof typeof check>)
    .sort()
    .forEach((key) => {
      if (typeof check[key] === "function") {
        total++;
        const isSupported = (check[key] as () => boolean)();
        const displayName = featureDisplayNames[key] ?? key;

        const item = document.createElement("div");
        item.className = `feature-item ${
          isSupported ? "supported" : "not-supported"
        }`;
        const aiTag = aiFeatures.includes(key)
          ? '<span class="ai-tag">AI</span>'
          : "";
        item.innerHTML = `
        <span class="feature-name">${displayName}${aiTag}</span>
        <span class="feature-status ${isSupported ? "yes" : "no"}">
          ${isSupported ? "YES" : "NO"}
        </span>
      `;
        listEl.appendChild(item);
        if (isSupported) supported++;
        logConsole(
          `${displayName}: ${isSupported ? "SUPPORTED" : "NOT SUPPORTED"}`,
          isSupported ? "success" : "error"
        );
      }
    });

  const featureCount = document.getElementById("feature-count");
  if (featureCount) {
    featureCount.innerHTML = `<span style="color: #00ff41;">${supported}/${total}</span>`;
  }
  logConsole(
    `Feature scan complete: ${supported}/${total} supported`,
    "success"
  );
};
