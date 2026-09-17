import * as pwafire from "pwafire";
import { apiConfigs, apiGroups } from "../api-configs";
import { stats, updateStats } from "../stats";
import { logConsole } from "../log";
import { showResult } from "../results";

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const getApiFn = (apiName: string): unknown => {
  if (apiName.includes(".")) {
    const [obj, method] = apiName.split(".");
    const parent = (pwafire as Record<string, unknown>)[obj];
    return parent && typeof parent === "object" && method in parent
      ? (parent as Record<string, unknown>)[method]
      : undefined;
  }
  return (pwafire as Record<string, unknown>)[apiName];
};

const SYNC_APIS = [
  "connectivity",
  "visibility",
  "displayMode",
  "broadcast.send",
  "broadcast.listen"
] as const;

// AI APIs that use modals for input and results (no sidebar)
const MODAL_APIS = [
  "summarizer",
  "summarizerStream",
  "translator",
  "translatorStream",
  "languageDetector"
] as const;

const setupStreamModalClose = (apiName: string): void => {
  const isLanguageDetector = apiName === "languageDetector";
  const isTranslator =
    apiName === "translator" || apiName === "translatorStream";

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

  // Enable select dropdowns for editing
  if (!isLanguageDetector) {
    const typeSelect = document.getElementById("summarizer-type");
    const formatSelect = document.getElementById("summarizer-format");
    const lengthSelect = document.getElementById("summarizer-length");
    const sourceLangSelect = document.getElementById("translator-source");
    const targetLangSelect = document.getElementById("translator-target");

    if (isTranslator) {
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

  // All AI modals get retry button based on their action
  let retryText = "Summarize Again";
  if (isTranslator) {
    retryText = "Translate Again";
  } else if (isLanguageDetector) {
    retryText = "Detect Again";
  }

  (submitBtn as HTMLButtonElement).textContent = retryText;
  (cancelBtn as HTMLButtonElement).textContent = "Close";
  cancelBtn.style.display = "inline-block";

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
    const isTranslator =
      apiName === "translator" || apiName === "translatorStream";
    const isSummarizer =
      apiName === "summarizer" || apiName === "summarizerStream";

    // For all AI modals, retry with current values without closing modal
    if (isLanguageDetector || isTranslator || isSummarizer) {
      const text = (textarea as HTMLTextAreaElement).value.trim();
      if (!text) {
        const apiType = isLanguageDetector
          ? "language detection"
          : isTranslator
          ? "translation"
          : "summarization";
        logConsole(`Please enter some text for ${apiType}`, "error");
        return;
      }

      // Clear previous results and show processing state
      if (isLanguageDetector) {
        const resultsText = document.getElementById(
          "language-detector-results-text"
        );
        if (resultsText) resultsText.textContent = "";
      } else {
        const streamOutput = document.getElementById(
          "summarizer-stream-output"
        );
        const streamText = document.getElementById("summarizer-stream-text");
        if (streamText) streamText.textContent = "";
        if (streamOutput) streamOutput.style.display = "block";
      }

      (submitBtn as HTMLButtonElement).disabled = true;
      (cancelBtn as HTMLButtonElement).disabled = true;
      (submitBtn as HTMLButtonElement).textContent = "Processing...";

      // Disable select dropdowns during processing
      if (isSummarizer) {
        const typeSelect = document.getElementById(
          "summarizer-type"
        ) as HTMLSelectElement;
        const formatSelect = document.getElementById(
          "summarizer-format"
        ) as HTMLSelectElement;
        const lengthSelect = document.getElementById(
          "summarizer-length"
        ) as HTMLSelectElement;
        if (typeSelect) typeSelect.disabled = true;
        if (formatSelect) formatSelect.disabled = true;
        if (lengthSelect) lengthSelect.disabled = true;
      } else if (isTranslator) {
        const sourceLangSelect = document.getElementById(
          "translator-source"
        ) as HTMLSelectElement;
        const targetLangSelect = document.getElementById(
          "translator-target"
        ) as HTMLSelectElement;
        if (sourceLangSelect) sourceLangSelect.disabled = true;
        if (targetLangSelect) targetLangSelect.disabled = true;
      }

      try {
        // Show loading bar
        window.showTopLoadingBar();

        // Get current options for summarizer/translator
        let params: unknown[] = [text];

        if (isSummarizer && !apiName.includes("Stream")) {
          const typeSelect = document.getElementById(
            "summarizer-type"
          ) as HTMLSelectElement;
          const formatSelect = document.getElementById(
            "summarizer-format"
          ) as HTMLSelectElement;
          const lengthSelect = document.getElementById(
            "summarizer-length"
          ) as HTMLSelectElement;
          params = [
            text,
            {
              type: typeSelect?.value || "key-points",
              format: formatSelect?.value || "markdown",
              length: lengthSelect?.value || "medium"
            }
          ];
        } else if (isTranslator && !apiName.includes("Stream")) {
          const sourceLangSelect = document.getElementById(
            "translator-source"
          ) as HTMLSelectElement;
          const targetLangSelect = document.getElementById(
            "translator-target"
          ) as HTMLSelectElement;
          params = [
            text,
            {
              sourceLanguage: sourceLangSelect?.value || "en",
              targetLanguage: targetLangSelect?.value || "es"
            }
          ];
        }

        // Call the API directly
        const apiFn = getApiFn(apiName);
        const result = await (
          apiFn as (...args: unknown[]) => Promise<unknown>
        )(...params);

        // Hide loading bar
        window.hideTopLoadingBar();

        // Show results
        if (isLanguageDetector) {
          const resultsOutput = document.getElementById(
            "language-detector-results"
          );
          const resultsText = document.getElementById(
            "language-detector-results-text"
          );
          if (resultsOutput && resultsText) {
            resultsOutput.style.display = "block";
            resultsText.textContent = JSON.stringify(result, null, 2);
          }
        } else {
          const streamText = document.getElementById("summarizer-stream-text");
          if (streamText) {
            const typedResult = result as {
              ok?: boolean;
              summary?: string;
              translation?: string;
              message?: string;
            };
            streamText.textContent =
              typedResult.summary ||
              typedResult.translation ||
              typedResult.message ||
              JSON.stringify(result, null, 2);
          }
        }

        // Reset to retry state
        (submitBtn as HTMLButtonElement).disabled = false;
        (cancelBtn as HTMLButtonElement).disabled = false;

        // Re-enable select dropdowns
        if (isSummarizer) {
          const typeSelect = document.getElementById(
            "summarizer-type"
          ) as HTMLSelectElement;
          const formatSelect = document.getElementById(
            "summarizer-format"
          ) as HTMLSelectElement;
          const lengthSelect = document.getElementById(
            "summarizer-length"
          ) as HTMLSelectElement;
          if (typeSelect) typeSelect.disabled = false;
          if (formatSelect) formatSelect.disabled = false;
          if (lengthSelect) lengthSelect.disabled = false;
        } else if (isTranslator) {
          const sourceLangSelect = document.getElementById(
            "translator-source"
          ) as HTMLSelectElement;
          const targetLangSelect = document.getElementById(
            "translator-target"
          ) as HTMLSelectElement;
          if (sourceLangSelect) sourceLangSelect.disabled = false;
          if (targetLangSelect) targetLangSelect.disabled = false;
        }

        let retryText = "Summarize Again";
        if (isTranslator) retryText = "Translate Again";
        else if (isLanguageDetector) retryText = "Detect Again";

        (submitBtn as HTMLButtonElement).textContent = retryText;
      } catch (err) {
        // Hide loading bar on error
        window.hideTopLoadingBar();

        const msg = err instanceof Error ? err.message : String(err);
        const apiType = isLanguageDetector
          ? "Language Detector"
          : isTranslator
          ? "Translator"
          : "Summarizer";
        logConsole(`${apiType}: ERROR - ${msg}`, "error");

        // Reset on error
        (submitBtn as HTMLButtonElement).disabled = false;
        (cancelBtn as HTMLButtonElement).disabled = false;

        // Re-enable select dropdowns
        if (isSummarizer) {
          const typeSelect = document.getElementById(
            "summarizer-type"
          ) as HTMLSelectElement;
          const formatSelect = document.getElementById(
            "summarizer-format"
          ) as HTMLSelectElement;
          const lengthSelect = document.getElementById(
            "summarizer-length"
          ) as HTMLSelectElement;
          if (typeSelect) typeSelect.disabled = false;
          if (formatSelect) formatSelect.disabled = false;
          if (lengthSelect) lengthSelect.disabled = false;
        } else if (isTranslator) {
          const sourceLangSelect = document.getElementById(
            "translator-source"
          ) as HTMLSelectElement;
          const targetLangSelect = document.getElementById(
            "translator-target"
          ) as HTMLSelectElement;
          if (sourceLangSelect) sourceLangSelect.disabled = false;
          if (targetLangSelect) targetLangSelect.disabled = false;
        }

        let retryText = "Summarize Again";
        if (isTranslator) retryText = "Translate Again";
        else if (isLanguageDetector) retryText = "Detect Again";

        (submitBtn as HTMLButtonElement).textContent = retryText;
      }
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

const GROUP_ICONS: Record<string, string> = {
  AI: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
  Clipboard: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>',
  "File System": '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  Notifications: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  Sharing: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  Screen: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  System: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  Media: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',
  Payment: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  "User Data": '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  Passkey: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  Broadcast: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.93 4.93a10 10 0 0 1 14.14 0"/><path d="M7.76 7.76a6 6 0 0 1 8.48 0"/><circle cx="12" cy="12" r="2"/></svg>',
  Other: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>'
};

export const generateTests = (): void => {
  const testGrid = document.getElementById("test-grid");
  if (!testGrid) return;

  testGrid.innerHTML = "";

  Object.entries(apiGroups).forEach(([groupName, apis]) => {
    const groupHeader = document.createElement("div");
    groupHeader.className = "test-group-header";
    const iconSvg = GROUP_ICONS[groupName] ?? "";
    groupHeader.innerHTML = `
      ${iconSvg ? `<span class="test-group-icon">${iconSvg}</span>` : ""}
      <span class="test-group-title">${escapeHtml(groupName)}</span>
    `;
    testGrid.appendChild(groupHeader);

    apis.forEach((key) => {
      const pwafireApi = getApiFn(key);
      const config = apiConfigs[key];

      if (typeof pwafireApi === "function" && config) {
        const id = key
          .toLowerCase()
          .replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

        const card = document.createElement("div");
        card.className = "test-card";
        const hint =
          config.cardHint != null && config.cardHint !== ""
            ? `<p class="test-card-hint">${escapeHtml(config.cardHint)}</p>`
            : "";
        const btnLabel = escapeHtml(config.executeLabel ?? "Execute");
        card.innerHTML = `
        <h3>${config.title}</h3>
        ${hint}
        <button onclick="window.runTest('${key}')">${btnLabel}</button>
        <div id="${id}-result" class="result" style="display:none;"></div>
      `;
        testGrid.appendChild(card);
      }
    });
  });
};

const cleanupVisibilityListener = (): void => {
  if (window.__visibilityUnlisten) {
    window.__visibilityUnlisten();
    window.__visibilityUnlisten = null;
  }
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
    if (apiName === "payment") {
      logConsole(
        "Sheet uses https://bobbucks.dev/pay (install Chromium Payment Handler demo app). onApprove logs PaymentResponse and completes success.",
        "info"
      );
    }
    const params = config.params ? await config.params() : [];
    if (params === null) {
      stats.failed++;
      updateStats();
      return;
    }

    const apiFn = getApiFn(apiName);
    if (typeof apiFn !== "function") {
      stats.failed++;
      updateStats();
      return;
    }

    if (apiName !== "visibility" && window.__visibilityUnlisten) {
      cleanupVisibilityListener();
    }

    if (!SYNC_APIS.includes(apiName as (typeof SYNC_APIS)[number])) {
      window.showTopLoadingBar();
    }

    const result = await Promise.resolve(
      (apiFn as (...args: unknown[]) => unknown)(
        ...(Array.isArray(params) ? params : [])
      )
    );

    if (!SYNC_APIS.includes(apiName as (typeof SYNC_APIS)[number])) {
      window.hideTopLoadingBar();
    }

    if (window.__summarizerCloseModal) {
      if (MODAL_APIS.includes(apiName as any)) {
        // Show results in modal for these APIs
        if (apiName === "languageDetector") {
          const resultsOutput = document.getElementById(
            "language-detector-results"
          );
          const resultsText = document.getElementById(
            "language-detector-results-text"
          );
          if (resultsOutput && resultsText) {
            resultsOutput.style.display = "block";
            // Show the complete API response in formatted JSON
            resultsText.textContent = JSON.stringify(result, null, 2);
          }
        } else {
          // For summarizer and translator (both stream and non-stream)
          const streamOutput = document.getElementById(
            "summarizer-stream-output"
          );
          const streamText = document.getElementById("summarizer-stream-text");
          if (streamOutput && streamText) {
            streamOutput.style.display = "block";
            const typedResult = result as {
              ok?: boolean;
              message?: string;
              summary?: string;
              translation?: string;
            };
            if (typedResult.ok) {
              streamText.textContent =
                typedResult.summary ||
                typedResult.translation ||
                typedResult.message ||
                "";
            } else {
              streamText.textContent =
                typedResult.message || "Processing completed";
            }
          }
        }
        setupStreamModalClose(apiName);
      } else {
        window.__summarizerCloseModal();
        window.__summarizerCloseModal = null;
      }
    }

    const typedResult = result as {
      ok?: boolean;
      handle?: FileSystemFileHandle;
      message?: string;
    };

    if (apiName === "createFile" && typedResult.ok && typedResult.handle) {
      window.__lastFileHandle = typedResult.handle;
      logConsole(
        "File handle saved for writeFile/writeUrlToFile tests",
        "info"
      );
    }

    if (apiName === "visibility") {
      window.__visibilityUnlisten?.();
      const visResult = result as {
        ok: boolean;
        onlisten?: (cb: (state: DocumentVisibilityState) => void) => {
          unlisten: () => void;
        };
      };
      if (visResult.ok && visResult.onlisten) {
        const { unlisten } = visResult.onlisten((state) => {
          logConsole(
            `Visibility changed: ${state}`,
            state === "visible" ? "success" : "info"
          );
        });
        window.__visibilityUnlisten = unlisten;
        logConsole(
          "Visibility listener attached — switch tabs to test",
          "info"
        );
      }
    }

    // Only show sidebar for non-modal APIs
    if (!MODAL_APIS.includes(apiName as any)) {
      await showResult(
        `${id}-result`,
        typedResult as Parameters<typeof showResult>[1],
        apiName
      );
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
    // Hide loading bar on error
    window.hideTopLoadingBar();

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
    if (typeof getApiFn(apiName) === "function") {
      await runTest(apiName);
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  cleanupVisibilityListener();

  logConsole("=".repeat(50), "info");
  logConsole(
    `ALL TESTS COMPLETE: ${stats.success} passed, ${stats.failed} failed`,
    "success"
  );
  logConsole("=".repeat(50), "info");
};
