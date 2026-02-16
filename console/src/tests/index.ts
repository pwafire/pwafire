import * as pwafire from "pwafire";
import { apiConfigs, apiGroups } from "../api-configs";
import { stats, updateStats } from "../stats";
import { logConsole } from "../log";
import { showResult } from "../results";

// AI APIs that use modals for input and results (no sidebar)
const MODAL_APIS = [
  "summarizer",
  "summarizerStream",
  "translator",
  "translatorStream",
  "languageDetector",
] as const;

const setupStreamModalClose = (apiName: string): void => {
  const isLanguageDetector = apiName === "languageDetector";

  const submitBtn = document.getElementById(
    isLanguageDetector ? "language-detector-submit" : "summarizer-submit"
  );
  const cancelBtn = document.getElementById(
    isLanguageDetector ? "language-detector-cancel" : "summarizer-cancel"
  );
  const textarea = document.getElementById(
    isLanguageDetector ? "language-detector-text" : "summarizer-text"
  );

  if (!submitBtn || !cancelBtn || !window.__summarizerCloseModal) return;

  if (textarea) (textarea as HTMLTextAreaElement).disabled = false;
  (submitBtn as HTMLButtonElement).disabled = false;
  (cancelBtn as HTMLButtonElement).disabled = false;

  // Language detector gets both buttons: "Detect Again" and "Close"
  if (isLanguageDetector) {
    (submitBtn as HTMLButtonElement).textContent = "Detect Again";
    (cancelBtn as HTMLButtonElement).textContent = "Close";
    cancelBtn.style.display = "inline-block";
  } else {
    // Other modals get single "Close" button
    (submitBtn as HTMLButtonElement).textContent = "Close";
    cancelBtn.style.display = "none";
  }

  if (!isLanguageDetector) {
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
  }

  const retryHandler = async (): Promise<void> => {
    // For language detector, retry with current text without closing modal
    if (isLanguageDetector) {
      const text = (textarea as HTMLTextAreaElement).value.trim();
      if (!text) {
        logConsole("Please enter some text to detect language", "error");
        return;
      }

      // Clear previous results and show processing state
      const resultsOutput = document.getElementById("language-detector-results");
      const resultsText = document.getElementById("language-detector-results-text");
      if (resultsText) resultsText.textContent = "";

      (submitBtn as HTMLButtonElement).disabled = true;
      (cancelBtn as HTMLButtonElement).disabled = true;
      (submitBtn as HTMLButtonElement).textContent = "Processing...";

      try {
        // Call the API directly
        const apiFn = pwafire[apiName as keyof typeof pwafire];
        const result = await (apiFn as (text: string) => Promise<unknown>)(text);

        // Replace with new results
        if (resultsOutput && resultsText) {
          resultsOutput.style.display = "block";
          resultsText.textContent = JSON.stringify(result, null, 2);
        }

        // Reset to retry state
        (submitBtn as HTMLButtonElement).disabled = false;
        (cancelBtn as HTMLButtonElement).disabled = false;
        (submitBtn as HTMLButtonElement).textContent = "Detect Again";
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        logConsole(`Language Detector: ERROR - ${msg}`, "error");

        // Reset on error
        (submitBtn as HTMLButtonElement).disabled = false;
        (cancelBtn as HTMLButtonElement).disabled = false;
        (submitBtn as HTMLButtonElement).textContent = "Detect Again";
      }
    } else {
      // For others, just close
      window.__summarizerCloseModal?.();
      window.__summarizerCloseModal = null;

      // Reset button text for next use
      let buttonText = "Summarize";
      if (apiName === "translator" || apiName === "translatorStream") {
        buttonText = "Translate";
      }

      (submitBtn as HTMLButtonElement).textContent = buttonText;
      cancelBtn.style.display = "inline-block";
    }
  };

  const closeHandler = (): void => {
    window.__summarizerCloseModal?.();
    window.__summarizerCloseModal = null;

    // Reset button text for next use
    let buttonText = "Summarize";
    if (apiName === "translator" || apiName === "translatorStream") {
      buttonText = "Translate";
    } else if (isLanguageDetector) {
      buttonText = "Detect Language";
    }

    (submitBtn as HTMLButtonElement).textContent = buttonText;
    (cancelBtn as HTMLButtonElement).textContent = "Cancel";
    cancelBtn.style.display = "inline-block";
  };

  submitBtn.onclick = retryHandler;
  cancelBtn.onclick = closeHandler;
};

const setupStreamModalError = (apiName: string): void => {
  const isLanguageDetector = apiName === "languageDetector";

  const submitBtn = document.getElementById(
    isLanguageDetector ? "language-detector-submit" : "summarizer-submit"
  );
  const cancelBtn = document.getElementById(
    isLanguageDetector ? "language-detector-cancel" : "summarizer-cancel"
  );
  const textarea = document.getElementById(
    isLanguageDetector ? "language-detector-text" : "summarizer-text"
  );

  if (!submitBtn || !cancelBtn || !window.__summarizerCloseModal) return;

  (textarea as HTMLTextAreaElement).disabled = false;
  (submitBtn as HTMLButtonElement).disabled = false;
  (cancelBtn as HTMLButtonElement).disabled = false;

  let buttonText = "Summarize Again";
  if (apiName === "translator" || apiName === "translatorStream") {
    buttonText = "Translate Again";
  } else if (isLanguageDetector) {
    buttonText = "Detect Again";
  }

  (submitBtn as HTMLButtonElement).textContent = buttonText;

  if (!isLanguageDetector) {
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
        if (MODAL_APIS.includes(apiName as any)) {
        // Show results in modal for these APIs
        if (apiName === "languageDetector") {
          const resultsOutput = document.getElementById("language-detector-results");
          const resultsText = document.getElementById("language-detector-results-text");
          if (resultsOutput && resultsText) {
            resultsOutput.style.display = "block";
            // Show the complete API response in formatted JSON
            resultsText.textContent = JSON.stringify(result, null, 2);
          }
        } else {
          // For summarizer and translator (both stream and non-stream)
          const streamOutput = document.getElementById("summarizer-stream-output");
          const streamText = document.getElementById("summarizer-stream-text");
          if (streamOutput && streamText) {
            streamOutput.style.display = "block";
            const typedResult = result as { ok?: boolean; message?: string; summary?: string; translation?: string };
            if (typedResult.ok) {
              streamText.textContent = typedResult.summary || typedResult.translation || typedResult.message || "";
            } else {
              streamText.textContent = typedResult.message || "Processing completed";
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

    // Only show sidebar for non-modal APIs
    if (!MODAL_APIS.includes(apiName as any)) {
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
        if (MODAL_APIS.includes(apiName as any)) {
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
