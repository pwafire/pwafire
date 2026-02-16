import * as pwafire from "pwafire";
import { apiConfigs, apiGroups } from "../api-configs";
import { stats, updateStats } from "../stats";
import { logConsole } from "../log";
import { showResult } from "../results";

const setupStreamModalClose = (apiName: string): void => {
  const submitBtn = document.getElementById("summarizer-submit");
  const cancelBtn = document.getElementById("summarizer-cancel");
  const textarea = document.getElementById("summarizer-text");

  if (!submitBtn || !cancelBtn || !window.__summarizerCloseModal) return;

  if (textarea) (textarea as HTMLTextAreaElement).disabled = false;
  (submitBtn as HTMLButtonElement).disabled = false;
  (cancelBtn as HTMLButtonElement).disabled = false;

  let buttonText = "Summarize";
  if (apiName === "translatorStream") buttonText = "Translate";
  else if (apiName === "languageDetector" || apiName === "languageDetectorTopLanguage")
    buttonText = "Detect Language";

  (submitBtn as HTMLButtonElement).textContent = buttonText;
  cancelBtn.style.display = "none";

  const typeSelect = document.getElementById("summarizer-type");
  const formatSelect = document.getElementById("summarizer-format");
  const lengthSelect = document.getElementById("summarizer-length");
  const sourceLangSelect = document.getElementById("translator-source");
  const targetLangSelect = document.getElementById("translator-target");

  if (apiName === "translatorStream") {
    if (sourceLangSelect)
      (sourceLangSelect as HTMLSelectElement).disabled = false;
    if (targetLangSelect)
      (targetLangSelect as HTMLSelectElement).disabled = false;
  } else {
    if (typeSelect) (typeSelect as HTMLSelectElement).disabled = false;
    if (formatSelect) (formatSelect as HTMLSelectElement).disabled = false;
    if (lengthSelect) (lengthSelect as HTMLSelectElement).disabled = false;
  }

  const closeHandler = (): void => {
    window.__summarizerCloseModal?.();
    window.__summarizerCloseModal = null;

    let buttonText = "Summarize";
    if (apiName === "translatorStream") buttonText = "Translate";
    else if (apiName === "languageDetector" || apiName === "languageDetectorTopLanguage")
      buttonText = "Detect Language";

    (submitBtn as HTMLButtonElement).textContent = buttonText;
    cancelBtn.style.display = "inline-block";
  };

  submitBtn.onclick = closeHandler;
  cancelBtn.onclick = closeHandler;
};

const setupStreamModalError = (apiName: string): void => {
  const submitBtn = document.getElementById("summarizer-submit");
  const cancelBtn = document.getElementById("summarizer-cancel");
  const textarea = document.getElementById("summarizer-text");

  if (!submitBtn || !cancelBtn || !window.__summarizerCloseModal) return;

  (textarea as HTMLTextAreaElement).disabled = false;
  (submitBtn as HTMLButtonElement).disabled = false;
  (cancelBtn as HTMLButtonElement).disabled = false;

  let buttonText = "Summarize Again";
  if (apiName === "translatorStream") buttonText = "Translate Again";
  else if (apiName === "languageDetector" || apiName === "languageDetectorTopLanguage")
    buttonText = "Detect Again";

  (submitBtn as HTMLButtonElement).textContent = buttonText;

  const typeSelect = document.getElementById("summarizer-type");
  const formatSelect = document.getElementById("summarizer-format");
  const lengthSelect = document.getElementById("summarizer-length");
  const sourceLangSelect = document.getElementById("translator-source");
  const targetLangSelect = document.getElementById("translator-target");

  if (apiName === "translatorStream") {
    if (sourceLangSelect)
      (sourceLangSelect as HTMLSelectElement).disabled = false;
    if (targetLangSelect)
      (targetLangSelect as HTMLSelectElement).disabled = false;
  } else {
    if (typeSelect) (typeSelect as HTMLSelectElement).disabled = false;
    if (formatSelect) (formatSelect as HTMLSelectElement).disabled = false;
    if (lengthSelect) (lengthSelect as HTMLSelectElement).disabled = false;
  }

  submitBtn.onclick = () => {
    window.__summarizerCloseModal?.();
    window.__summarizerCloseModal = null;
    setTimeout(() => runTest(apiName), 100);
  };

  cancelBtn.onclick = () => {
    window.__summarizerCloseModal?.();
    window.__summarizerCloseModal = null;
  };
};

export const generateTests = (): void => {
  const testGrid = document.getElementById("test-grid");
  if (!testGrid) return;

  testGrid.innerHTML = "";

  Object.entries(apiGroups).forEach(([groupName, apis]) => {
    const groupHeader = document.createElement("div");
    groupHeader.className = "test-group-header";
    groupHeader.textContent = groupName;
    testGrid.appendChild(groupHeader);

    apis.forEach((key) => {
      const pwafireApi = pwafire[key as keyof typeof pwafire];
      const config = apiConfigs[key];

      if (typeof pwafireApi === "function" && config) {
        const id = key
          .toLowerCase()
          .replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

        const card = document.createElement("div");
        card.className = "test-card";
        card.innerHTML = `
        <h3>${config.title}</h3>
        <button onclick="window.runTest('${key}')">Execute</button>
        <div id="${id}-result" class="result" style="display:none;"></div>
      `;
        testGrid.appendChild(card);
      }
    });
  });
};

export const runTest = async (apiName: string): Promise<void> => {
  const config = apiConfigs[apiName];
  if (!config) return;

  const id = apiName
    .toLowerCase()
    .replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

  logConsole(`Executing ${config.title} test...`, "info");
  stats.run++;

  try {
    const params = config.params ? await config.params() : [];
    if (params === null) {
      stats.failed++;
      updateStats();
      return;
    }

    const apiFn = pwafire[apiName as keyof typeof pwafire];
    if (typeof apiFn !== "function") {
      stats.failed++;
      updateStats();
      return;
    }

    const result = await (apiFn as (...args: unknown[]) => Promise<unknown>)(
      ...(Array.isArray(params) ? params : [])
    );

    if (window.__summarizerCloseModal) {
      if (
        apiName === "summarizerStream" ||
        apiName === "translatorStream" ||
        apiName === "languageDetector" ||
        apiName === "languageDetectorTopLanguage"
      ) {
        // Show results in modal for these APIs
        if (apiName === "languageDetector" || apiName === "languageDetectorTopLanguage") {
          const streamOutput = document.getElementById("summarizer-stream-output");
          const streamText = document.getElementById("summarizer-stream-text");
          if (streamOutput && streamText) {
            streamOutput.style.display = "block";
            const typedResult = result as { ok?: boolean; message?: string; data?: unknown };
            if (typedResult.ok && typedResult.data) {
              streamText.textContent = JSON.stringify(typedResult.data, null, 2);
            } else {
              streamText.textContent = typedResult.message || "Detection completed";
            }
          }
        }
        setupStreamModalClose(apiName);
      } else {
        window.__summarizerCloseModal();
        window.__summarizerCloseModal = null;
      }
    }

    const typedResult = result as { ok?: boolean; handle?: FileSystemFileHandle; message?: string };

    if (apiName === "createFile" && typedResult.ok && typedResult.handle) {
      window.__lastFileHandle = typedResult.handle;
      logConsole(
        "File handle saved for writeFile/writeUrlToFile tests",
        "info"
      );
    }

    if (
      apiName !== "summarizerStream" &&
      apiName !== "translatorStream" &&
      apiName !== "languageDetector" &&
      apiName !== "languageDetectorTopLanguage"
    ) {
      await showResult(`${id}-result`, typedResult as Parameters<typeof showResult>[1], apiName);
    }

    logConsole(
      `${config.title}: ${typedResult.ok ? "SUCCESS" : "FAILED"} - ${
        typedResult.message ?? ""
      }`,
      typedResult.ok ? "success" : "error"
    );

    if (typedResult.ok) stats.success++;
    else stats.failed++;
  } catch (err) {
    if (window.__summarizerCloseModal) {
      if (
        apiName === "summarizerStream" ||
        apiName === "translatorStream" ||
        apiName === "languageDetector" ||
        apiName === "languageDetectorTopLanguage"
      ) {
        setupStreamModalError(apiName);
      } else {
        window.__summarizerCloseModal();
        window.__summarizerCloseModal = null;
      }
    }
    const msg = err instanceof Error ? err.message : String(err);
    logConsole(`${config.title}: ERROR - ${msg}`, "error");
    stats.failed++;
  }

  updateStats();
};

export const runAllTests = async (): Promise<void> => {
  logConsole("=".repeat(50), "info");
  logConsole("RUNNING ALL TESTS...", "info");
  logConsole("=".repeat(50), "info");

  for (const apiName of Object.keys(apiConfigs)) {
    if (typeof pwafire[apiName as keyof typeof pwafire] === "function") {
      await runTest(apiName);
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  logConsole("=".repeat(50), "info");
  logConsole(
    `ALL TESTS COMPLETE: ${stats.success} passed, ${stats.failed} failed`,
    "success"
  );
  logConsole("=".repeat(50), "info");
};
