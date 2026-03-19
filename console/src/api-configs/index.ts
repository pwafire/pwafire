import type { ApiConfig } from "../types";
import { logConsole } from "../log";
import { appendBroadcastMessage } from "../results";
import {
  showSummarizerModal,
  showTranslatorModal,
  showLanguageDetectorModal
} from "../modals";
import { passkey } from "pwafire";
import {
  getMockCreationOptions,
  getMockRequestOptions
} from "../mocks/passkey-mock";

export const apiConfigs: Record<string, ApiConfig> = {
  webShare: {
    title: "Web Share",
    params: () => [
      {
        title: "PWAFire Test",
        text: "Testing the Web Share API",
        url: window.location.href
      }
    ]
  },
  notification: {
    title: "Notification",
    params: () => [
      {
        title: "PWAFire Test",
        options: {
          body: "Test notification from console",
          timestamp: Date.now()
        }
      }
    ]
  },
  copyText: {
    title: "Copy Text",
    params: () => ["Hello from PWAFire Console!"]
  },
  readText: { title: "Read Text" },
  copyImage: {
    title: "Copy Image",
    params: () => [window.location.origin + "/favicon.ico"]
  },
  wakeLock: { title: "Wake Lock" },
  setBadge: { title: "Set Badge", params: () => [5] },
  clearBadge: { title: "Clear Badge" },
  connectivity: { title: "Network" },
  fullscreen: { title: "Fullscreen" },
  visibility: { title: "Visibility" },
  displayMode: { title: "Display Mode" },
  contacts: {
    title: "Contacts",
    params: () => [["name", "email", "tel"], { multiple: true }]
  },
  pickFile: { title: "Pick File" },
  pickTextFile: { title: "Pick Text File" },
  readFiles: { title: "Read Files" },
  createFile: { title: "Create File" },
  writeFile: {
    title: "Write File",
    params: () => {
      const handle = window.__lastFileHandle;
      if (!handle) {
        logConsole("Create a file first using Create File test", "error");
        return null;
      }
      return [handle, "Hello from PWAFire Console!"];
    }
  },
  writeUrlToFile: {
    title: "Write URL to File",
    params: () => {
      const handle = window.__lastFileHandle;
      if (!handle) {
        logConsole("Create a file first using Create File test", "error");
        return null;
      }
      return [handle, window.location.origin + "/favicon.ico"];
    }
  },
  accessFonts: { title: "Fonts" },
  contentIndexing: { title: "Content Index" },
  install: {
    title: "Install",
    params: () => [
      "before",
      () => logConsole("Install event triggered", "info")
    ]
  },
  idleDetection: {
    title: "Idle Detection",
    params: () => ["start", () => logConsole("User is idle", "info"), 60000]
  },
  webOtp: { title: "Web OTP" },
  "passkey.create": {
    title: "Passkey Create",
    params: async () => {
      let json: Record<string, unknown>;
      try {
        const res = await fetch("/mock/webauthn/register");
        json = res.ok ? await res.json() : getMockCreationOptions();
      } catch {
        json = getMockCreationOptions();
      }
      const parsed = passkey.parseCreationOptions(json);
      if (!parsed.ok || !parsed.options) {
        logConsole(parsed.message, "error");
        return null;
      }
      return [parsed.options];
    }
  },
  "passkey.get": {
    title: "Passkey Get",
    params: async () => {
      let json: Record<string, unknown>;
      try {
        const res = await fetch("/mock/webauthn/signin");
        json = res.ok ? await res.json() : getMockRequestOptions();
      } catch {
        json = getMockRequestOptions();
      }
      const parsed = passkey.parseRequestOptions(json);
      if (!parsed.ok || !parsed.options) {
        logConsole(parsed.message, "error");
        return null;
      }
      return [parsed.options];
    }
  },
  "passkey.getConditional": {
    title: "Passkey Get (Conditional)",
    params: async () => {
      let json: Record<string, unknown>;
      try {
        const res = await fetch("/mock/webauthn/signin");
        json = res.ok ? await res.json() : getMockRequestOptions();
      } catch {
        json = getMockRequestOptions();
      }
      const parsed = passkey.parseRequestOptions(json);
      if (!parsed.ok || !parsed.options) {
        logConsole(parsed.message, "error");
        return null;
      }
      return [parsed.options];
    }
  },
  payment: {
    title: "Payment Request (BobBucks)",
    params: () => [
      {
        methodData: [{ supportedMethods: "https://bobbucks.dev/pay" }],
        details: {
          id: "pwafire-console-donation",
          displayItems: [
            {
              label: "Original donation amount",
              amount: { currency: "USD", value: "65.00" }
            },
            {
              label: "Friends and family discount",
              amount: { currency: "USD", value: "-10.00" }
            }
          ],
          total: {
            label: "Donation",
            amount: { currency: "USD", value: "55.00" }
          }
        },
        options: {
          requestPayerName: true,
          requestPayerEmail: true
        }
      },
      async (paymentResponse: PaymentResponse) => {
        logConsole(
          `Payment sheet closed — method: ${paymentResponse.methodName}`,
          "info"
        );
        const raw = paymentResponse.details as unknown;
        logConsole(
          `PaymentResponse.details: ${JSON.stringify(raw, null, 2)}`,
          "info"
        );
        await new Promise((r) => setTimeout(r, 800));
        logConsole(
          'Simulated server OK — pwafire will call complete("success")',
          "success"
        );
        return true;
      }
    ]
  },
  screenShare: {
    title: "Screen Share",
    params: () => [
      {
        video: { displaySurface: "monitor" },
        audio: true,
        systemAudio: "include"
      }
    ]
  },
  webPIP: {
    title: "Picture in Picture",
    params: () => [
      (data: { message: string; ok: boolean }) => {
        logConsole(`PiP: ${data.message}`, data.ok ? "success" : "error");
      },
      { width: 400, height: 300 }
    ]
  },
  barcodeDetector: { title: "Barcode" },
  compressStream: {
    title: "Compress Stream",
    params: async () => {
      const url =
        "https://res.cloudinary.com/dejzqkmfw/image/upload/v1763466883/cld-sample-5.jpg";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          logConsole(`Fetch failed: ${response.status}`, "error");
          return null;
        }
        const blob = await response.blob();
        return [blob.stream()];
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        logConsole(`Error: ${msg}`, "error");
        return null;
      }
    }
  },
  decompressStream: {
    title: "Decompress Stream",
    params: async () => {
      try {
        if (!("showOpenFilePicker" in window)) {
          logConsole("File System Access API not supported", "error");
          return null;
        }
        const [fileHandle] = await (
          window as Window & {
            showOpenFilePicker: (opts?: {
              types: Array<{
                description: string;
                accept: Record<string, string[]>;
              }>;
            }) => Promise<FileSystemFileHandle[]>;
          }
        ).showOpenFilePicker({
          types: [
            {
              description: "Compressed files",
              accept: { "application/gzip": [".gz"] }
            }
          ]
        });
        const file = await fileHandle.getFile();
        return [file.stream()];
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          logConsole("File selection cancelled", "info");
        } else {
          const msg = err instanceof Error ? err.message : String(err);
          logConsole(`Error: ${msg}`, "error");
        }
        return null;
      }
    }
  },
  lazyLoad: {
    title: "Lazy Load",
    params: () => [{ images: ".lazy-image", style: "fade" }]
  },
  summarizer: {
    title: "Summarizer",
    params: async () => {
      const config = await showSummarizerModal(false);
      if (!config) return null;
      window.__summarizerCloseModal = config.closeModal;
      return [config.text, config.options];
    }
  },
  summarizerStream: {
    title: "Summarizer Stream",
    params: async () => {
      const config = await showSummarizerModal(true);
      if (!config) return null;
      window.__summarizerCloseModal = config.closeModal;

      const streamOutput = document.getElementById("summarizer-stream-output");
      const streamText = document.getElementById("summarizer-stream-text");
      if (streamOutput) streamOutput.style.display = "block";
      if (streamText) streamText.textContent = "";

      return [
        config.text,
        (chunk: string) => {
          if (streamText) {
            streamText.textContent += chunk;
            streamText.scrollTop = streamText.scrollHeight;
          }
          logConsole(`Stream: ${chunk.substring(0, 60)}...`, "info");
        },
        config.options
      ];
    }
  },
  translator: {
    title: "Translator",
    params: async () => {
      const config = await showTranslatorModal(false);
      if (!config) return null;
      window.__summarizerCloseModal = config.closeModal;
      return [config.text, config.options];
    }
  },
  translatorStream: {
    title: "Translator Stream",
    params: async () => {
      const config = await showTranslatorModal(true);
      if (!config) return null;
      window.__summarizerCloseModal = config.closeModal;

      const streamOutput = document.getElementById("summarizer-stream-output");
      const streamText = document.getElementById("summarizer-stream-text");
      if (streamOutput) streamOutput.style.display = "block";
      if (streamText) streamText.textContent = "";

      return [
        config.text,
        (chunk: string) => {
          if (streamText) {
            streamText.textContent = chunk;
            streamText.scrollTop = streamText.scrollHeight;
          }
          logConsole(`Stream: ${chunk.substring(0, 60)}...`, "info");
        },
        config.options
      ];
    }
  },
  languageDetector: {
    title: "Language Detector",
    params: async () => {
      const config = await showLanguageDetectorModal();
      if (!config) return null;
      window.__summarizerCloseModal = config.closeModal;
      return [config.text];
    }
  },
  "broadcast.send": { title: "Broadcast Send" },
  "broadcast.listen": {
    title: "Broadcast Listen",
    params: () => [
      undefined,
      (data: unknown) => {
        logConsole(`Broadcast received: ${JSON.stringify(data)}`, "success");
        appendBroadcastMessage(data);
      }
    ]
  }
};

export const apiGroups: Record<string, string[]> = {
  "🤖 AI": [
    "summarizer",
    "summarizerStream",
    "translator",
    "translatorStream",
    "languageDetector"
  ],
  "📋 Clipboard": ["copyText", "readText", "copyImage"],
  "📁 File System": [
    "pickFile",
    "pickTextFile",
    "readFiles",
    "createFile",
    "writeFile",
    "writeUrlToFile"
  ],
  "🔔 Notifications": ["notification", "setBadge", "clearBadge"],
  "🔗 Sharing": ["webShare"],
  "🖥️ Screen": ["screenShare", "webPIP", "fullscreen"],
  "⚡ System": [
    "wakeLock",
    "idleDetection",
    "connectivity",
    "visibility",
    "displayMode"
  ],
  "🎨 Media": [
    "barcodeDetector",
    "compressStream",
    "decompressStream",
    "lazyLoad",
    "accessFonts"
  ],
  "👤 User Data": ["contacts", "payment", "webOtp"],
  "🔐 Passkey": ["passkey.create", "passkey.get", "passkey.getConditional"],
  "📡 Broadcast": ["broadcast.send", "broadcast.listen"],
  "📦 Other": ["contentIndexing", "install"]
};
