var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/pwa/badging/index.ts
var setBadge = async (unreadCount) => {
  try {
    if (navigator.setAppBadge) {
      await navigator.setAppBadge(unreadCount);
      return { ok: true, message: "Set" };
    } else {
      return {
        ok: false,
        message: "Badging API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var clearBadge = async () => {
  try {
    if (navigator.clearAppBadge) {
      await navigator.clearAppBadge();
      return { ok: true, message: "Cleared" };
    } else {
      return { ok: false, message: "Badging API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/barcode/index.ts
var barcodeDetector = async (options) => {
  try {
    if ("BarcodeDetector" in window) {
      const formatSupported = (await BarcodeDetector.getSupportedFormats()).includes(options.format);
      if (formatSupported) {
        const barcodeDetector2 = new BarcodeDetector({
          formats: [options.format]
        });
        const barcodes = await barcodeDetector2.detect(options.image);
        return {
          ok: barcodes ? true : false,
          message: barcodes ? "Barcode detected" : "No barcode detected",
          barcodes
        };
      } else {
        return {
          ok: false,
          message: `Sorry, "${options.format.charAt(0).toUpperCase() + options.format.slice(1)}" format not supported`
        };
      }
    } else {
      return {
        ok: false,
        message: "Barcode Detector API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/clipboard/index.ts
var copyText = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return { ok: true, message: "Copied" };
    } else {
      return {
        ok: false,
        message: "Copy Text API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var readText = async () => {
  try {
    if (navigator.clipboard) {
      const text = await navigator.clipboard.readText();
      return { ok: true, message: "Read", text };
    } else {
      return { ok: false, message: "Read Text API not supported", text: null };
    }
  } catch (error) {
    throw error;
  }
};
var copyImage = async (imgURL) => {
  try {
    if (navigator.clipboard) {
      const data = await fetch(imgURL);
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      return {
        ok: true,
        message: "Image copied"
      };
    } else {
      return { ok: false, message: "Copy Image API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/compression/index.ts
var compressStream = async (readableStream) => {
  try {
    if ("CompressionStream" in window) {
      return {
        ok: true,
        message: "Compressed",
        stream: readableStream.pipeThrough(new CompressionStream("gzip"))
      };
    } else {
      return {
        ok: false,
        message: "Compression Streams API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var decompressStream = async (compressedReadableStream) => {
  try {
    if ("DecompressionStream" in window) {
      return {
        ok: true,
        message: "Decompressed",
        stream: compressedReadableStream.pipeThrough(new DecompressionStream("gzip"))
      };
    } else {
      return {
        ok: false,
        message: "DeCompression Streams API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/connectivity/index.ts
var connectivity = async (online, offline) => {
  try {
    if (navigator.onLine) {
      online();
      return { ok: true, message: "Online" };
    } else {
      offline();
      return { ok: true, message: "Offline" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/contacts/index.ts
var contacts = async (props) => {
  try {
    if ("contacts" in navigator && "ContactsManager" in window) {
      const contacts2 = await navigator.contacts.select(props);
      return { ok: true, message: "Contacts", contacts: contacts2 };
    } else {
      return { ok: false, message: "Contacts API not supported", contacts: [] };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/content-indexing/index.ts
var contentIndexing = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    if (registration.index) {
      return { ok: true, message: "Indexed", index: registration.index };
    } else {
      return { ok: false, message: "Content Indexing API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/files/index.ts
var readFiles = async () => {
  if (!navigator.clipboard) {
    return { ok: false, message: "Clipboard API not supported", files: [] };
  }
  try {
    const files = [];
    const items = await navigator.clipboard.read();
    for (const item of items) {
      for (const type of item.types) {
        const blob = await item.getType(type);
        const file = new File([blob], "clipboard-file", { type });
        files.push(file);
      }
    }
    return { ok: true, message: "Files read successfully", files };
  } catch (error) {
    return { ok: false, message: `Failed to read files: ${error}`, files: [] };
  }
};
var pickTextFile = async () => {
  if (!("showOpenFilePicker" in self)) {
    return { ok: false, message: "File System Access API not supported" };
  }
  try {
    const [fileHandle] = await self.showOpenFilePicker();
    const file = await fileHandle.getFile();
    if (!file.type.includes("text")) {
      return { ok: false, message: "Selected file is not a text file" };
    }
    const contents = await file.text();
    return {
      ok: true,
      message: "Text file read successfully",
      contents,
      file
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, message: "File selection cancelled" };
    }
    return { ok: false, message: `Failed to read text file: ${error}` };
  }
};
var pickFile = async (options) => {
  if (!("showOpenFilePicker" in self)) {
    return { ok: false, message: "File System Access API not supported" };
  }
  try {
    const [fileHandle] = options ? await self.showOpenFilePicker(options) : await self.showOpenFilePicker();
    const file = await fileHandle.getFile();
    return {
      ok: true,
      message: "File selected successfully",
      file
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, message: "File selection cancelled" };
    }
    return { ok: false, message: `Failed to pick file: ${error}` };
  }
};
var createFile = async (options = {
  types: [
    {
      description: "Text files",
      accept: {
        "text/plain": [".txt"]
      }
    }
  ]
}) => {
  if (!("showSaveFilePicker" in self))
    return { ok: false, message: "File System Access API not supported" };
  try {
    return {
      ok: true,
      message: "File created successfully",
      handle: await self.showSaveFilePicker(options)
    };
  } catch (error) {
    return { ok: false, message: `Failed to create file: ${error}` };
  }
};
var writeFile = async (handle, contents) => {
  if (!("showSaveFilePicker" in self))
    return { ok: false, message: "File System Access API not supported" };
  try {
    const writable = await handle.createWritable();
    await writable.write(contents);
    await writable.close();
    return { ok: true, message: "Written to file successfully" };
  } catch (error) {
    return { ok: false, message: `Failed to write to file: ${error}` };
  }
};
var writeUrlToFile = async (handle, url) => {
  if (!("showSaveFilePicker" in self))
    return { ok: false, message: "File System Access API not supported" };
  try {
    const writable = await handle.createWritable();
    const response = await fetch(url);
    if (!response.body)
      throw new Error("Response body is null");
    await response.body.pipeTo(writable);
    return { ok: true, message: "URL written to file successfully" };
  } catch (error) {
    return { ok: false, message: `Failed to write URL to file: ${error}` };
  }
};

// src/pwa/fonts/index.ts
var accessFonts = async (config) => {
  try {
    if ("queryLocalFonts" in window) {
      const fonts = await window.queryLocalFonts(config);
      return { ok: true, message: "Fonts", fonts };
    } else {
      return { ok: false, message: "Font Access API not supported", fonts: [] };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/fullscreen/index.ts
var fullscreen = async () => {
  try {
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        return { ok: true, message: "Fullscreen" };
      } else {
        await document.exitFullscreen();
        return { ok: true, message: "Exit fullscreen" };
      }
    } else {
      return { ok: false, message: "Fullscreen API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/idle-detection/index.ts
var idleDetection = async (action = "start") => {
  try {
    if ("IdleDetector" in window) {
      const idleDetector = new IdleDetector();
      if (action === "start") {
        await idleDetector.start();
        return { ok: true, message: "Idle detection started" };
      } else {
        await idleDetector.stop();
        return { ok: true, message: "Idle detection stopped" };
      }
    } else {
      return { ok: false, message: "Idle Detection API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/install/index.ts
var install = async (type = "installed", callback) => {
  try {
    if (navigator.serviceWorker) {
      const methods = {
        checkIfAppInstalled: async () => {
          try {
            window.addEventListener("appinstalled", () => {
              callback("installed");
            });
            return { ok: true, message: "Check if installed" };
          } catch (error) {
            throw error;
          }
        },
        beforeInstallPromptEvent: async () => {
          try {
            window.addEventListener("beforeinstallprompt", (event) => {
              callback(event);
            });
            return { ok: true, message: "Before install prompt" };
          } catch (error) {
            throw error;
          }
        },
        installApp: async () => {
          try {
            callback("install");
            return { ok: true, message: "Install App" };
          } catch (error) {
            throw error;
          }
        }
      };
      switch (type) {
        case "before":
          return await methods.beforeInstallPromptEvent();
        case "install":
          return await methods.installApp();
        case "installed":
          return await methods.checkIfAppInstalled();
        default:
          return { ok: false, message: "Type can be 'install', 'installed' or 'before'" };
      }
    } else {
      return { ok: false, message: "Service Worker not supported" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/lazy-load/index.ts
var loadImage = async (element, options = {}) => {
  try {
    if (!("IntersectionObserver" in window)) {
      return {
        ok: false,
        message: "Intersection Observer API not supported"
      };
    }
    const { src = "data-src", placeholder = null } = options;
    const elements = Array.from(document.querySelectorAll(element));
    if (!elements.length) {
      return { ok: false, message: "No elements found" };
    }
    if (placeholder) {
      elements.forEach((el) => {
        if (el instanceof HTMLImageElement) {
          el.src = placeholder;
        }
      });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting)
            return;
          const el = entry.target;
          if (el instanceof HTMLImageElement) {
            const dataSrc = el.getAttribute(src);
            if (dataSrc)
              el.src = dataSrc;
          }
          el.classList.add("loaded");
          el.removeAttribute(src);
          observer.unobserve(el);
        });
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01
      }
    );
    elements.forEach((el) => observer.observe(el));
    return { ok: true, message: "Images set up for lazy loading" };
  } catch (error) {
    throw error;
  }
};
var loadBackground = async (element, options = {}) => {
  try {
    if (!("IntersectionObserver" in window)) {
      return {
        ok: false,
        message: "Intersection Observer API not supported"
      };
    }
    const { background = "data-background", placeholder = null } = options;
    const elements = Array.from(document.querySelectorAll(element));
    if (!elements.length) {
      return { ok: false, message: "No elements found" };
    }
    if (placeholder) {
      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          if (placeholder.startsWith("#") || placeholder.startsWith("rgb")) {
            el.style.backgroundColor = placeholder;
          } else {
            el.style.backgroundImage = `url('${placeholder}')`;
          }
        }
      });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting)
            return;
          const el = entry.target;
          if (el instanceof HTMLElement) {
            const dataBg = el.getAttribute(background);
            if (dataBg)
              el.style.backgroundImage = `url('${dataBg}')`;
          }
          el.classList.add("loaded");
          el.removeAttribute(background);
          observer.unobserve(el);
        });
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01
      }
    );
    elements.forEach((el) => observer.observe(el));
    return { ok: true, message: "Background images set up for lazy loading" };
  } catch (error) {
    throw error;
  }
};
var loadOnScroll = async (element, options = {}) => {
  try {
    if (!("IntersectionObserver" in window)) {
      return {
        ok: false,
        message: "Intersection Observer API not supported"
      };
    }
    const { animation = "visible", delay = 0, style = "fade" } = options;
    const elements = Array.from(document.querySelectorAll(element));
    if (!elements.length) {
      return { ok: false, message: "No elements found" };
    }
    if (style !== "none" && !document.getElementById("pwafire-lazy-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "pwafire-lazy-styles";
      styleEl.textContent = `
          .pwafire-fade { opacity: 0; transition: opacity 0.6s ease-out; }
              .pwafire-fade.visible { opacity: 1; }
                .pwafire-slide {
                      opacity: 0;
                      transform: translateY(20px);
                      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                  }
                  .pwafire-slide.visible { opacity: 1; transform: translateY(0); }

                  .pwafire-zoom {
                      opacity: 0;
                      transform: scale(0.9);
                      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                  }
                  .pwafire-zoom.visible { opacity: 1; transform: scale(1); }
              `;
      document.head.appendChild(styleEl);
    }
    elements.forEach((el) => {
      if (style !== "none")
        el.classList.add(`pwafire-${style}`);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting)
            return;
          const el = entry.target;
          if (delay > 0) {
            setTimeout(() => el.classList.add(animation), index * delay);
          } else {
            el.classList.add(animation);
          }
          observer.unobserve(el);
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.15
      }
    );
    elements.forEach((el) => observer.observe(el));
    return { ok: true, message: "Elements set up for scroll reveal" };
  } catch (error) {
    throw error;
  }
};
var lazyLoad = async (options) => {
  try {
    if (!("IntersectionObserver" in window)) {
      return {
        ok: false,
        message: "Intersection Observer API not supported"
      };
    }
    const {
      images = ".lazy-image",
      backgrounds = ".lazy-background",
      animations = ".reveal-on-scroll",
      style = "fade"
    } = options || {};
    const promises = [];
    if (document.querySelector(images)) {
      promises.push(loadImage(images));
    }
    if (document.querySelector(backgrounds)) {
      promises.push(loadBackground(backgrounds));
    }
    if (document.querySelector(animations)) {
      promises.push(
        loadOnScroll(animations, {
          style: style ?? "fade"
        })
      );
    }
    if (!promises.length) {
      return { ok: false, message: "No elements found to lazy load" };
    }
    await Promise.all(promises);
    return { ok: true, message: "Lazy loading initialized" };
  } catch (error) {
    throw error;
  }
};

// src/pwa/notification/index.ts
var notification = async (data) => {
  const { title, options } = data;
  try {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        await navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, options);
          return { ok: true, message: "Sent" };
        });
      } else {
        return { ok: true, message: "Denied" };
      }
    } else {
      return { ok: false, message: "Notification API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/payment/index.ts
var payment = async (paydata, validatePayment) => {
  try {
    const paymentRequest = new PaymentRequest(paydata.paymentMethods, paydata.paymentDetails);
    if (paymentRequest) {
      const canPay = await paymentRequest.canMakePayment();
      if (canPay) {
        const paymentResponse = await paymentRequest.show();
        validatePayment(paymentResponse);
        return { ok: true, message: "Payment" };
      } else {
        return { ok: false, message: "Payment method(s) not supported" };
      }
    } else {
      return { ok: false, message: "Payment Request API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/screen/index.ts
var screenSharingControls = async (config) => {
  if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
    return navigator.mediaDevices.getDisplayMedia(config);
  } else {
    throw new Error("Screen sharing is not supported in this browser.");
  }
};
var webPIP = async (callback, config = {}) => {
  try {
    const pipButton = document.getElementById("pipButton");
    const player = document.getElementById("pipPlayer");
    if (!pipButton || !player)
      throw new Error("No player or button found.");
    pipButton.addEventListener("click", async () => {
      if ("documentPictureInPicture" in window) {
        const pipWindow = await window.documentPictureInPicture.requestWindow({
          ...config,
          width: config?.width ?? player?.clientWidth,
          height: config?.height ?? player?.clientHeight
        });
        pipWindow.document.body.append(player);
        callback({ ok: true, window: pipWindow, message: "Picture in Picture mode enabled." });
      } else {
        callback({ ok: false, window: null, message: "Picture in Picture is not supported in this browser." });
      }
    });
  } catch (error) {
    throw error;
  }
};

// src/pwa/visibility/index.ts
var visibility = async (isVisible, notAvailable) => {
  try {
    if (document.visibilityState) {
      const state = document.visibilityState;
      if (state === "visible") {
        isVisible();
        return { ok: true, message: "Visible" };
      }
    } else {
      notAvailable();
      return {
        ok: false,
        message: "Visibility API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var displayMode = async (callback) => {
  try {
    window.addEventListener("DOMContentLoaded", () => {
      const displayMode2 = window.matchMedia("(display-mode: standalone)").matches ? "standalone" : window.matchMedia("(display-mode: minimal-ui)").matches ? "minimal-ui" : window.matchMedia("(display-mode: fullscreen)").matches ? "fullscreen" : "broswer-tab";
      callback(displayMode2);
    });
  } catch (error) {
    throw error;
  }
};

// src/pwa/wake-lock/index.ts
var wakeLock = async () => {
  try {
    if ("wakeLock" in navigator) {
      const wakeLock2 = await navigator.wakeLock.request("screen");
      return { ok: true, message: "Wake lock", wakeLock: wakeLock2 };
    } else {
      return { ok: false, message: "Wake Lock API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/web-otp/index.ts
var webOtp = async (callback) => {
  try {
    if ("OTPCredential" in window) {
      window.addEventListener("DOMContentLoaded", async () => {
        const input = document.querySelector('input[autocomplete="one-time-code"]');
        if (input) {
          const ac = new AbortController();
          const form = input.closest("form");
          if (form) {
            form.addEventListener("submit", () => {
              ac.abort();
            });
          }
          const otp = await navigator.credentials.get({
            otp: { transport: ["sms"] },
            signal: ac.signal
          });
          callback({
            code: otp.code,
            ok: true,
            message: "OTP received"
          });
        } else {
          callback({
            code: null,
            ok: false,
            message: "No input with autocomplete='one-time-code' found"
          });
        }
      });
    } else {
      callback({
        code: null,
        ok: false,
        message: "Web OTP API not supported"
      });
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/web-share/index.ts
var webShare = async (data) => {
  try {
    if ("canShare" in navigator && "share" in navigator) {
      if (navigator.canShare(data)) {
        await navigator.share(data);
        return { ok: true, message: "Shared" };
      } else {
        return { ok: false, message: "Cannot share this data" };
      }
    } else {
      return { ok: false, message: "Web Share API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

// src/pwa/index.ts
var pwa_exports = {};
__export(pwa_exports, {
  accessFonts: () => accessFonts,
  barcodeDetector: () => barcodeDetector,
  clearBadge: () => clearBadge,
  connectivity: () => connectivity,
  contacts: () => contacts,
  contentIndexing: () => contentIndexing,
  copyImage: () => copyImage,
  copyText: () => copyText,
  createFile: () => createFile,
  fullscreen: () => fullscreen,
  idleDetection: () => idleDetection,
  install: () => install,
  notification: () => notification,
  payment: () => payment,
  pickFile: () => pickFile,
  pickTextFile: () => pickTextFile,
  readFiles: () => readFiles,
  readText: () => readText,
  screenSharingControls: () => screenSharingControls,
  setBadge: () => setBadge,
  visibility: () => visibility,
  wakeLock: () => wakeLock,
  webOtp: () => webOtp,
  webPIP: () => webPIP,
  webShare: () => webShare,
  writeFile: () => writeFile,
  writeUrlToFile: () => writeUrlToFile
});

// src/check/index.ts
var check = {
  badging: () => "setAppBadge" in navigator,
  barcode: () => "BarcodeDetector" in window,
  clipboard: () => "clipboard" in navigator,
  compression: () => "CompressionStream" in window,
  connectivity: () => "onLine" in navigator,
  contacts: () => "contacts" in navigator && "ContactsManager" in window,
  contentIndexing: async () => "index" in await navigator.serviceWorker.ready,
  files: () => "showOpenFilePicker" in self && "showSaveFilePicker" in self,
  fonts: () => "queryLocalFonts" in window,
  fullscreen: () => document.fullscreenEnabled,
  idleDetection: () => "IdleDetector" in window,
  install: () => "serviceWorker" in navigator,
  lazyLoad: () => "IntersectionObserver" in window,
  notification: () => "Notification" in window,
  payment: () => "PaymentRequest" in window,
  screen: () => "mediaDevices" in navigator && "getDisplayMedia" in navigator.mediaDevices,
  visibility: () => "visibilityState" in document,
  wakeLock: () => "wakeLock" in navigator,
  webOTP: () => "OTPCredential" in window,
  webShare: () => "canShare" in navigator && "share" in navigator
};

// src/index.ts
var pwafire = {
  pwa: pwa_exports,
  check
};
export {
  accessFonts,
  barcodeDetector,
  check,
  clearBadge,
  compressStream,
  connectivity,
  contacts,
  contentIndexing,
  copyImage,
  copyText,
  createFile,
  decompressStream,
  displayMode,
  fullscreen,
  idleDetection,
  install,
  lazyLoad,
  loadBackground,
  loadImage,
  loadOnScroll,
  notification,
  payment,
  pickFile,
  pickTextFile,
  pwa_exports as pwa,
  pwafire,
  readFiles,
  readText,
  screenSharingControls,
  setBadge,
  visibility,
  wakeLock,
  webOtp,
  webPIP,
  webShare,
  writeFile,
  writeUrlToFile
};
