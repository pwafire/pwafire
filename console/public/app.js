import * as pwafire from "./lib/index.mjs";
import * as check from "./lib/check/index.mjs";

window.pwafire = pwafire;
window.check = check;

let stats = { run: 0, success: 0, failed: 0 };

const initMatrixEffect = () => {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "01";
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  const drawMatrix = () => {
    ctx.fillStyle = "rgba(10, 14, 39, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };

  setInterval(drawMatrix, 35);
};

// Console Logging

const logConsole = (message, type = "info") => {
  const consoleEl = document.getElementById("console");
  const line = document.createElement("div");
  line.className = `console-line ${type}`;
  const time = new Date().toLocaleTimeString();
  line.textContent = `[${time}] ${message}`;
  consoleEl.appendChild(line);
  consoleEl.scrollTop = consoleEl.scrollHeight;
};

window.clearConsole = () => {
  document.getElementById("console").innerHTML =
    '<div class="console-line info">> Console cleared <span class="blink">_</span></div>';
  logConsole("Console cleared", "info");
};

window.toggleConsole = () => {
  const consoleEl = document.getElementById("console");
  const toggleText = document.getElementById("console-toggle-text");

  if (consoleEl.classList.contains("hidden")) {
    consoleEl.classList.remove("hidden");
    toggleText.textContent = "Hide Terminal";
  } else {
    consoleEl.classList.add("hidden");
    toggleText.textContent = "Show Terminal";
  }
};

const showResult = (elementId, data) => {
  const modal = document.getElementById("result-modal");
  const title = document.getElementById("modal-title");
  const content = document.getElementById("modal-content");

  if (data.stream) {
    showStreamResult(title, content, data);
  } else if (data.file) {
    showFileResult(title, content, data);
  } else {
    showJsonResult(title, content, data);
  }

  modal.showModal();
};

const showStreamResult = (title, content, data) => {
  title.textContent = data.ok ? "Stream Result" : "Stream Error";

  const statusClass = data.ok ? "result-success" : "result-error";
  content.innerHTML = `
    <div class="${statusClass}">${data.ok ? "✓" : "✗"} ${data.message}</div>
    ${data.ok ? `
      <div class="stream-info">
        <p><strong>Stream Status:</strong> Ready</p>
        <p><strong>Type:</strong> ReadableStream</p>
        <p>Stream can be downloaded or processed further.</p>
      </div>
      <button class="modal-button primary" onclick="window.downloadStream()">
        Download Stream
      </button>
    ` : ""}
  `;

  if (data.ok && data.stream) {
    window.__currentStream = data.stream;
  }
};

const showFileResult = (title, content, data) => {
  title.textContent = "File Result";
  const statusClass = data.ok ? "result-success" : "result-error";

  content.innerHTML = `
    <div class="${statusClass}">${data.ok ? "✓" : "✗"} ${data.message}</div>
    ${data.file ? `
      <div class="stream-info">
        <p><strong>File:</strong> ${data.file.name || "Unknown"}</p>
        <p><strong>Size:</strong> ${(data.file.size / 1024).toFixed(2)} KB</p>
        <p><strong>Type:</strong> ${data.file.type || "Unknown"}</p>
      </div>
    ` : ""}
  `;
};

const showJsonResult = (title, content, data) => {
  title.textContent = data.ok ? "Success" : "Error";
  const statusClass = data.ok ? "result-success" : "result-error";

  content.innerHTML = `
    <div class="${statusClass}">${data.ok ? "✓" : "✗"} ${data.message}</div>
    <pre>${JSON.stringify(data, null, 2)}</pre>
  `;
};

window.closeResultModal = () => {
  document.getElementById("result-modal").close();
};

window.downloadStream = async () => {
  const stream = window.__currentStream;
  if (!stream) {
    logConsole("No stream available", "error");
    return;
  }

  try {
    const response = new Response(stream);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${Date.now()}.gz`;
    a.click();
    URL.revokeObjectURL(url);
    logConsole("Stream downloaded successfully", "success");
  } catch (err) {
    logConsole(`Download failed: ${err.message}`, "error");
  }
};

const updateStats = () => {
  document.getElementById("test-count").textContent = stats.run;
  document.getElementById("tests-run").textContent = stats.run;
  document.getElementById("tests-success").textContent = stats.success;
  document.getElementById("tests-failed").textContent = stats.failed;
};

const apiConfigs = {
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
  readText: {
    title: "Read Text"
  },
  copyImage: {
    title: "Copy Image",
    params: () => [window.location.origin + "/favicon.ico"]
  },
  wakeLock: {
    title: "Wake Lock"
  },
  setBadge: {
    title: "Set Badge",
    params: () => [5]
  },
  clearBadge: {
    title: "Clear Badge"
  },
  connectivity: {
    title: "Network"
  },
  fullscreen: {
    title: "Fullscreen"
  },
  visibility: {
    title: "Visibility"
  },
  displayMode: {
    title: "Display Mode"
  },
  contacts: {
    title: "Contacts",
    params: () => [["name", "email", "tel"], { multiple: true }]
  },
  pickFile: {
    title: "Pick File"
  },
  pickTextFile: {
    title: "Pick Text File"
  },
  readFiles: {
    title: "Read Files"
  },
  createFile: {
    title: "Create File"
  },
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
  accessFonts: {
    title: "Fonts"
  },
  contentIndexing: {
    title: "Content Index"
  },
  install: {
    title: "Install",
    params: () => [
      "before",
      (e) => logConsole("Install event triggered", "info")
    ]
  },
  idleDetection: {
    title: "Idle Detection",
    params: () => ["start", () => logConsole("User is idle", "info"), 60000]
  },
  webOtp: {
    title: "Web OTP"
  },
  payment: {
    title: "Payment",
    params: () => [
      {
        paymentMethods: [
          {
            supportedMethods: "basic-card",
            data: { supportedNetworks: ["visa", "mastercard"] }
          }
        ],
        paymentDetails: {
          total: { label: "Total", amount: { currency: "USD", value: "10.00" } }
        }
      },
      (response) => {
        logConsole(`Payment: ${JSON.stringify(response)}`, "info");
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
      (data) => {
        logConsole(`PiP: ${data.message}`, data.ok ? "success" : "error");
      },
      { width: 400, height: 300 }
    ]
  },
  barcodeDetector: {
    title: "Barcode"
  },
  compressStream: {
    title: "Compress Stream",
    params: async () => {
      const url = "https://res.cloudinary.com/dejzqkmfw/image/upload/v1763466883/cld-sample-5.jpg";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          logConsole(`Fetch failed: ${response.status}`, 'error');
          return null;
        }
        const blob = await response.blob();
        return [blob.stream()];
      } catch (err) {
        logConsole(`Error: ${err.message}`, 'error');
        return null;
      }
    }
  },
  decompressStream: {
    title: "Decompress Stream",
    params: async () => {
      const compressedUrl = ""; // TODO: Add compressed file URL after compress test
      if (!compressedUrl) {
        logConsole('Run Compress Stream first to get compressed data', 'error');
        return null;
      }
      try {
        const response = await fetch(compressedUrl);
        const blob = await response.blob();
        return [blob.stream()];
      } catch (err) {
        logConsole(`Error: ${err.message}`, 'error');
        return null;
      }
    }
  },
  lazyLoad: {
    title: "Lazy Load",
    params: () => [{ images: ".lazy-image", style: "fade" }]
  }
};

const generateTests = () => {
  const testGrid = document.getElementById("test-grid");
  testGrid.innerHTML = "";

  Object.keys(pwafire)
    .sort()
    .forEach((key) => {
      if (typeof pwafire[key] === "function" && apiConfigs[key]) {
        const config = apiConfigs[key];
        const id = key
          .toLowerCase()
          .replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

        const card = document.createElement("div");
        card.className = "test-card";
        card.innerHTML = `
        <h3>${config.title}</h3>
        <button onclick="runTest('${key}')">Execute</button>
        <div id="${id}-result" class="result" style="display:none;"></div>
      `;
        testGrid.appendChild(card);
      }
    });
};

window.runTest = async (apiName) => {
  const config = apiConfigs[apiName];
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
    const result = await pwafire[apiName](...params);

    if (apiName === "createFile" && result.ok && result.handle) {
      window.__lastFileHandle = result.handle;
      logConsole(
        "File handle saved for writeFile/writeUrlToFile tests",
        "info"
      );
    }

    showResult(`${id}-result`, result);
    logConsole(
      `${config.title}: ${result.ok ? "SUCCESS" : "FAILED"} - ${
        result.message
      }`,
      result.ok ? "success" : "error"
    );

    if (result.ok) stats.success++;
    else stats.failed++;
  } catch (err) {
    logConsole(`${config.title}: ERROR - ${err.message}`, "error");
    stats.failed++;
  }

  updateStats();
};

// Feature Detection
const featureDisplayNames = {
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
  payment: "Payment Request",
  screenShare: "Screen Share",
  visibility: "Visibility",
  wakeLock: "Wake Lock",
  webOtp: "Web OTP",
  webShare: "Web Share"
};

window.checkAllFeatures = () => {
  logConsole("Scanning for PWA features...", "info");

  const listEl = document.getElementById("feature-list");
  listEl.innerHTML = "";
  let supported = 0;
  let total = 0;

  Object.keys(check)
    .sort()
    .forEach((key) => {
      if (typeof check[key] === "function") {
        total++;
        const isSupported = check[key]();
        const displayName = featureDisplayNames[key] || key;

        const item = document.createElement("div");
        item.className = `feature-item ${
          isSupported ? "supported" : "not-supported"
        }`;
        item.innerHTML = `
        <span class="feature-name">${displayName}</span>
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

  document.getElementById(
    "feature-count"
  ).innerHTML = `<span style="color: #00ff41;">${supported}/${total}</span>`;
  logConsole(
    `Feature scan complete: ${supported}/${total} supported`,
    "success"
  );
};

// Batch Operations

window.runAllTests = async () => {
  logConsole("=".repeat(50), "info");
  logConsole("RUNNING ALL TESTS...", "info");
  logConsole("=".repeat(50), "info");

  for (const apiName of Object.keys(apiConfigs)) {
    if (typeof pwafire[apiName] === "function") {
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

// Keyboard Shortcuts

const initKeyboardShortcuts = () => {
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

// Initialization

const init = () => {
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

// Start the application
init();
