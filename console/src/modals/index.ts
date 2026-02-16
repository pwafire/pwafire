import type {
  SummarizerConfig,
  TranslatorConfig,
  LanguageDetectorConfig,
} from "../types";
import { logConsole } from "../log";

export const showSummarizerModal = (
  isStreaming: boolean
): Promise<SummarizerConfig | null> => {
  return new Promise((resolve) => {
    const modal = document.getElementById("summarizer-modal");
    const overlay = document.getElementById("summarizer-overlay");
    const textarea = document.getElementById("summarizer-text");
    const title = document.getElementById("summarizer-modal-title");
    const submitBtn = document.getElementById("summarizer-submit");
    const cancelBtn = document.getElementById("summarizer-cancel");
    const optionsContainer = document.querySelector(".modal-options");
    const streamOutput = document.getElementById("summarizer-stream-output");
    const streamText = document.getElementById("summarizer-stream-text");

    if (
      !modal ||
      !overlay ||
      !textarea ||
      !title ||
      !submitBtn ||
      !cancelBtn ||
      !optionsContainer ||
      !streamOutput ||
      !streamText
    ) {
      resolve(null);
      return;
    }

    streamOutput.style.display = "none";
    streamText.textContent = "";

    optionsContainer.innerHTML = `
      <div class="option-group">
        <label>Type:</label>
        <select id="summarizer-type">
          <option value="key-points">Key Points</option>
          <option value="tldr">TL;DR</option>
          <option value="teaser">Teaser</option>
          <option value="headline">Headline</option>
        </select>
      </div>
      <div class="option-group">
        <label>Format:</label>
        <select id="summarizer-format">
          <option value="markdown">Markdown</option>
          <option value="plain-text">Plain Text</option>
        </select>
      </div>
      <div class="option-group">
        <label>Length:</label>
        <select id="summarizer-length">
          <option value="short">Short</option>
          <option value="medium" selected>Medium</option>
          <option value="long">Long</option>
        </select>
      </div>
    `;

    const typeSelect = document.getElementById("summarizer-type");
    const formatSelect = document.getElementById("summarizer-format");
    const lengthSelect = document.getElementById("summarizer-length");

    const defaultText = `Maye Edwin is a Software Engineer and Google Developer Expert in Web Technologies, passionate about building amazing web experiences and contributing to the developer community.

He is the creator and maintainer of PWAFire, an open-source library that simplifies Progressive Web App development. Through PWAFire, he has helped developers around the world build fast, reliable, and engaging web applications.

As a Google Developer Expert in Web Technologies, Maye is recognized by Google for his expertise and contributions to the web development ecosystem. He actively speaks at conferences, writes technical content, and contributes to open-source projects.

He is particularly interested in Progressive Web Apps, Web Performance, JavaScript/TypeScript, and building tools that make developers' lives easier.`;

    (textarea as HTMLTextAreaElement).value = defaultText;
    title.textContent = isStreaming
      ? "Summarizer Stream Config"
      : "Summarizer Config";
    modal.classList.add("active");
    overlay.classList.add("active");
    textarea.focus();
    (textarea as HTMLTextAreaElement).disabled = false;
    if (typeSelect) (typeSelect as HTMLSelectElement).disabled = false;
    if (formatSelect) (formatSelect as HTMLSelectElement).disabled = false;
    if (lengthSelect) (lengthSelect as HTMLSelectElement).disabled = false;
    (submitBtn as HTMLButtonElement).disabled = false;
    (cancelBtn as HTMLButtonElement).disabled = false;
    (submitBtn as HTMLButtonElement).textContent = "Summarize";

    const closeModal = (): void => {
      modal.classList.remove("active");
      overlay.classList.remove("active");
      const so = document.getElementById("summarizer-stream-output");
      if (so) so.style.display = "none";
    };

    const handleSubmit = (): void => {
      const text = (textarea as HTMLTextAreaElement).value.trim();
      if (!text) {
        logConsole("Please enter some text to summarize", "error");
        return;
      }

      (textarea as HTMLTextAreaElement).disabled = true;
      if (typeSelect) (typeSelect as HTMLSelectElement).disabled = true;
      if (formatSelect) (formatSelect as HTMLSelectElement).disabled = true;
      if (lengthSelect) (lengthSelect as HTMLSelectElement).disabled = true;
      (submitBtn as HTMLButtonElement).disabled = true;
      (cancelBtn as HTMLButtonElement).disabled = true;
      (submitBtn as HTMLButtonElement).textContent = "Processing...";

      resolve({
        text,
        options: {
          type: (typeSelect as HTMLSelectElement)?.value ?? "key-points",
          format: (formatSelect as HTMLSelectElement)?.value ?? "markdown",
          length: (lengthSelect as HTMLSelectElement)?.value ?? "medium",
        },
        closeModal,
      });
    };

    const handleCancel = (): void => {
      closeModal();
      resolve(null);
    };

    submitBtn.onclick = handleSubmit;
    cancelBtn.onclick = handleCancel;
    overlay.onclick = () => {
      if (!(submitBtn as HTMLButtonElement).disabled) handleCancel();
    };
  });
};

export const showTranslatorModal = (
  isStreaming: boolean
): Promise<TranslatorConfig | null> => {
  return new Promise((resolve) => {
    const modal = document.getElementById("summarizer-modal");
    const overlay = document.getElementById("summarizer-overlay");
    const textarea = document.getElementById("summarizer-text");
    const title = document.getElementById("summarizer-modal-title");
    const submitBtn = document.getElementById("summarizer-submit");
    const cancelBtn = document.getElementById("summarizer-cancel");
    const optionsContainer = document.querySelector(".modal-options");
    const streamOutput = document.getElementById("summarizer-stream-output");
    const streamText = document.getElementById("summarizer-stream-text");

    if (
      !modal ||
      !overlay ||
      !textarea ||
      !title ||
      !submitBtn ||
      !cancelBtn ||
      !optionsContainer ||
      !streamOutput ||
      !streamText
    ) {
      resolve(null);
      return;
    }

    streamOutput.style.display = "none";
    streamText.textContent = "";

    const defaultText =
      "Hello! How are you today? I hope you're having a wonderful day.";

    (textarea as HTMLTextAreaElement).value = defaultText;
    title.textContent = isStreaming
      ? "Translator Stream Config"
      : "Translator Config";
    modal.classList.add("active");
    overlay.classList.add("active");
    textarea.focus();
    (textarea as HTMLTextAreaElement).disabled = false;
    (submitBtn as HTMLButtonElement).disabled = false;
    (cancelBtn as HTMLButtonElement).disabled = false;
    (submitBtn as HTMLButtonElement).textContent = "Translate";

    optionsContainer.innerHTML = `
      <div class="option-group">
        <label>Source Language:</label>
        <select id="translator-source">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
      <div class="option-group">
        <label>Target Language:</label>
        <select id="translator-target">
          <option value="en">English</option>
          <option value="es" selected>Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
    `;

    const sourceLangSelect = document.getElementById("translator-source");
    const targetLangSelect = document.getElementById("translator-target");

    const closeModal = (): void => {
      modal.classList.remove("active");
      overlay.classList.remove("active");
      const so = document.getElementById("summarizer-stream-output");
      if (so) so.style.display = "none";
    };

    const handleSubmit = (): void => {
      const text = (textarea as HTMLTextAreaElement).value.trim();
      if (!text) {
        logConsole("Please enter some text to translate", "error");
        return;
      }

      (textarea as HTMLTextAreaElement).disabled = true;
      if (sourceLangSelect)
        (sourceLangSelect as HTMLSelectElement).disabled = true;
      if (targetLangSelect)
        (targetLangSelect as HTMLSelectElement).disabled = true;
      (submitBtn as HTMLButtonElement).disabled = true;
      (cancelBtn as HTMLButtonElement).disabled = true;
      (submitBtn as HTMLButtonElement).textContent = "Processing...";

      resolve({
        text,
        options: {
          sourceLanguage:
            (sourceLangSelect as HTMLSelectElement)?.value ?? "en",
          targetLanguage:
            (targetLangSelect as HTMLSelectElement)?.value ?? "es",
        },
        closeModal,
      });
    };

    const handleCancel = (): void => {
      closeModal();
      resolve(null);
    };

    submitBtn.onclick = handleSubmit;
    cancelBtn.onclick = handleCancel;
    overlay.onclick = () => {
      if (!(submitBtn as HTMLButtonElement).disabled) handleCancel();
    };
  });
};

export const showLanguageDetectorModal =
  (): Promise<LanguageDetectorConfig | null> => {
    return new Promise((resolve) => {
      const modal = document.getElementById("language-detector-modal");
      const overlay = document.getElementById("language-detector-overlay");
      const textarea = document.getElementById("language-detector-text");
      const title = document.getElementById("language-detector-modal-title");
      const submitBtn = document.getElementById("language-detector-submit");
      const cancelBtn = document.getElementById("language-detector-cancel");
      const resultsOutput = document.getElementById("language-detector-results");
      const resultsText = document.getElementById(
        "language-detector-results-text"
      );

      if (
        !modal ||
        !overlay ||
        !textarea ||
        !title ||
        !submitBtn ||
        !cancelBtn ||
        !resultsOutput ||
        !resultsText
      ) {
        resolve(null);
        return;
      }

      resultsOutput.style.display = "none";
      resultsText.textContent = "";

      const defaultText =
        "Bonjour! Comment allez-vous? Je suis très content de vous voir aujourd'hui.";

      (textarea as HTMLTextAreaElement).value = defaultText;
      modal.classList.add("active");
      overlay.classList.add("active");
      textarea.focus();
      (textarea as HTMLTextAreaElement).disabled = false;
      (submitBtn as HTMLButtonElement).disabled = false;
      (cancelBtn as HTMLButtonElement).disabled = false;

      const closeModal = (): void => {
        modal.classList.remove("active");
        overlay.classList.remove("active");
        if (resultsOutput) resultsOutput.style.display = "none";
      };

      const handleSubmit = (): void => {
        const text = (textarea as HTMLTextAreaElement).value.trim();
        if (!text) {
          logConsole("Please enter some text to detect language", "error");
          return;
        }

        (textarea as HTMLTextAreaElement).disabled = true;
        (submitBtn as HTMLButtonElement).disabled = true;
        (cancelBtn as HTMLButtonElement).disabled = true;
        (submitBtn as HTMLButtonElement).textContent = "Processing...";

        resolve({
          text,
          closeModal,
        });
      };

      const handleCancel = (): void => {
        closeModal();
        resolve(null);
      };

      submitBtn.onclick = handleSubmit;
      cancelBtn.onclick = handleCancel;
      overlay.onclick = () => {
        if (!(submitBtn as HTMLButtonElement).disabled) handleCancel();
      };
    });
  };
