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

const showSummarizerModal = (isStreaming) => {
  return new Promise((resolve) => {
    const modal = document.getElementById("summarizer-modal");
    const overlay = document.getElementById("summarizer-overlay");
    const textarea = document.getElementById("summarizer-text");
    const typeSelect = document.getElementById("summarizer-type");
    const formatSelect = document.getElementById("summarizer-format");
    const lengthSelect = document.getElementById("summarizer-length");
    const title = document.getElementById("summarizer-modal-title");
    const submitBtn = document.getElementById("summarizer-submit");
    const cancelBtn = document.getElementById("summarizer-cancel");

    // Set default sample text
    const defaultText = isStreaming
      ? `Artificial Intelligence is revolutionizing technology. Machine learning algorithms process vast amounts of data to identify patterns and make predictions. Deep learning uses neural networks to solve complex problems. AI applications include natural language processing, computer vision, and robotics. The field continues to evolve rapidly with breakthroughs in generative AI and large language models.`
      : `Progressive Web Apps (PWAs) deliver app-like experiences using modern web capabilities. Built with HTML, CSS, and JavaScript, PWAs are reliable, fast, and engaging. They work offline, receive push notifications, and access device hardware. PWAs are discoverable via search engines, installable on home screens, and linkable via URLs, providing seamless experiences across devices and platforms.`;

    textarea.value = defaultText;
    title.textContent = isStreaming ? "Summarizer Stream Config" : "Summarizer Config";
    modal.classList.add("active");
    overlay.classList.add("active");
    textarea.focus();
    textarea.disabled = false;
    typeSelect.disabled = false;
    formatSelect.disabled = false;
    lengthSelect.disabled = false;
    submitBtn.disabled = false;
    cancelBtn.disabled = false;
    submitBtn.textContent = "Summarize";

    const closeModal = () => {
      modal.classList.remove("active");
      overlay.classList.remove("active");
      const streamOutput = document.getElementById("summarizer-stream-output");
      streamOutput.style.display = "none";
    };

    const handleSubmit = () => {
      const text = textarea.value.trim();
      if (!text) {
        logConsole("Please enter some text to summarize", "error");
        return;
      }

      textarea.disabled = true;
      typeSelect.disabled = true;
      formatSelect.disabled = true;
      lengthSelect.disabled = true;
      submitBtn.disabled = true;
      cancelBtn.disabled = true;
      submitBtn.textContent = "Processing...";

      resolve({
        text,
        options: {
          type: typeSelect.value,
          format: formatSelect.value,
          length: lengthSelect.value
        },
        closeModal
      });
    };

    const handleCancel = () => {
      closeModal();
      resolve(null);
    };

    submitBtn.onclick = handleSubmit;
    cancelBtn.onclick = handleCancel;
    overlay.onclick = (e) => {
      if (!submitBtn.disabled) {
        handleCancel();
      }
    };
  });
};

const showTranslatorModal = (isStreaming) => {
  return new Promise((resolve) => {
    const modal = document.getElementById("summarizer-modal");
    const overlay = document.getElementById("summarizer-overlay");
    const textarea = document.getElementById("summarizer-text");
    const title = document.getElementById("summarizer-modal-title");
    const submitBtn = document.getElementById("summarizer-submit");
    const cancelBtn = document.getElementById("summarizer-cancel");
    const optionsContainer = document.querySelector(".modal-options");

    const defaultText = "Hello! How are you today? I hope you're having a wonderful day.";

    textarea.value = defaultText;
    title.textContent = isStreaming ? "Translator Stream Config" : "Translator Config";
    modal.classList.add("active");
    overlay.classList.add("active");
    textarea.focus();
    textarea.disabled = false;
    submitBtn.disabled = false;
    cancelBtn.disabled = false;
    submitBtn.textContent = "Translate";

    optionsContainer.innerHTML = `
      <div class="option-group">
        <label>Source Language:</label>
        <select id="translator-source">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="zh">Chinese</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
        </select>
      </div>
      <div class="option-group">
        <label>Target Language:</label>
        <select id="translator-target">
          <option value="en">English</option>
          <option value="es" selected>Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="zh">Chinese</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
        </select>
      </div>
    `;

    const sourceLangSelect = document.getElementById("translator-source");
    const targetLangSelect = document.getElementById("translator-target");

    const closeModal = () => {
      modal.classList.remove("active");
      overlay.classList.remove("active");
      const streamOutput = document.getElementById("summarizer-stream-output");
      streamOutput.style.display = "none";
    };

    const handleSubmit = () => {
      const text = textarea.value.trim();
      if (!text) {
        logConsole("Please enter some text to translate", "error");
        return;
      }

      textarea.disabled = true;
      sourceLangSelect.disabled = true;
      targetLangSelect.disabled = true;
      submitBtn.disabled = true;
      cancelBtn.disabled = true;
      submitBtn.textContent = "Processing...";

      resolve({
        text,
        options: {
          sourceLanguage: sourceLangSelect.value,
          targetLanguage: targetLangSelect.value
        },
        closeModal
      });
    };

    const handleCancel = () => {
      closeModal();
      resolve(null);
    };

    submitBtn.onclick = handleSubmit;
    cancelBtn.onclick = handleCancel;
    overlay.onclick = (e) => {
      if (!submitBtn.disabled) {
        handleCancel();
      }
    };
  });
};

const showResult = async (elementId, data, apiName) => {
  const sidebar = document.getElementById("result-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const title = document.getElementById("sidebar-title");
  const content = document.getElementById("sidebar-content");

  sidebar.classList.add("active");
  overlay.classList.add("active");

  if (data.stream) {
    const streamType =
      apiName === "decompressStream" ? "decompressed" : "compressed";
    await showStreamResult(title, content, data, streamType);
  } else if (data.file) {
    showFileResult(title, content, data);
  } else {
    showJsonResult(title, content, data);
  }
};

const showStreamResult = async (title, content, data, streamType) => {
  title.textContent = data.ok ? "Stream Result" : "Stream Error";

  const statusClass = data.ok ? "result-success" : "result-error";

  if (data.ok && data.stream) {
    try {
      const response = new Response(data.stream);
      const blob = await response.blob();
      window.__currentStreamBlob = blob;
      window.__currentStreamType = streamType;

      content.innerHTML = `
        <div class="${statusClass}">✓ ${data.message}</div>
        <div class="stream-info">
          <p><strong>Stream Status:</strong> Ready</p>
          <p><strong>Type:</strong> ${
            streamType === "decompressed" ? "Decompressed" : "Compressed"
          } ReadableStream</p>
          <p><strong>Size:</strong> ${(blob.size / 1024).toFixed(2)} KB</p>
          <p>Stream can be downloaded or processed further.</p>
        </div>
        <button class="sidebar-button primary" onclick="window.downloadStream()">
          Download Stream
        </button>
      `;
    } catch (err) {
      content.innerHTML = `
        <div class="result-error">✗ Failed to process stream: ${err.message}</div>
      `;
    }
  } else {
    content.innerHTML = `
      <div class="${statusClass}">${data.ok ? "✓" : "✗"} ${data.message}</div>
    `;
  }
};

const showFileResult = (title, content, data) => {
  title.textContent = "File Result";
  const statusClass = data.ok ? "result-success" : "result-error";

  content.innerHTML = `
    <div class="${statusClass}">${data.ok ? "✓" : "✗"} ${data.message}</div>
    ${
      data.file
        ? `
      <div class="stream-info">
        <p><strong>File:</strong> ${data.file.name || "Unknown"}</p>
        <p><strong>Size:</strong> ${(data.file.size / 1024).toFixed(2)} KB</p>
        <p><strong>Type:</strong> ${data.file.type || "Unknown"}</p>
      </div>
    `
        : ""
    }
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

window.closeSidebar = () => {
  const sidebar = document.getElementById("result-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
};

window.downloadStream = () => {
  const blob = window.__currentStreamBlob;
  const streamType = window.__currentStreamType || "compressed";

  if (!blob) {
    logConsole("No stream available", "error");
    return;
  }

  logConsole(`Blob size: ${blob.size} bytes, type: ${blob.type}`, "info");

  if (blob.size === 0) {
    logConsole("Blob is empty - cannot download", "error");
    return;
  }

  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    if (streamType === "compressed") {
      a.download = `compressed-${Date.now()}.gz`;
    } else {
      a.download = `decompressed-${Date.now()}.jpg`;
    }

    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);

    logConsole("Stream downloaded successfully", "success");
  } catch (err) {
    logConsole(`Download failed: ${err.message}`, "error");
    console.error("Download error:", err);
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
        logConsole(`Error: ${err.message}`, "error");
        return null;
      }
    }
  },
  decompressStream: {
    title: "Decompress Stream",
    params: async () => {
      try {
        const [fileHandle] = await window.showOpenFilePicker({
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
        if (err.name === "AbortError") {
          logConsole("File selection cancelled", "info");
        } else {
          logConsole(`Error: ${err.message}`, "error");
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
      streamOutput.style.display = "block";
      streamText.textContent = "";

      return [
        config.text,
        (chunk) => {
          streamText.textContent += chunk;
          streamText.scrollTop = streamText.scrollHeight;
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
      streamOutput.style.display = "block";
      streamText.textContent = "";

      return [
        config.text,
        (chunk) => {
          streamText.textContent = chunk;
          streamText.scrollTop = streamText.scrollHeight;
          logConsole(`Stream: ${chunk.substring(0, 60)}...`, "info");
        },
        config.options
      ];
    }
  }
};

const apiGroups = {
  "🤖 AI": ["summarizer", "summarizerStream", "translator", "translatorStream"],
  "📋 Clipboard": ["copyText", "readText", "copyImage"],
  "📁 File System": ["pickFile", "pickTextFile", "readFiles", "createFile", "writeFile", "writeUrlToFile"],
  "🔔 Notifications": ["notification", "setBadge", "clearBadge"],
  "🔗 Sharing": ["webShare"],
  "🖥️ Screen": ["screenShare", "webPIP", "fullscreen"],
  "⚡ System": ["wakeLock", "idleDetection", "connectivity", "visibility", "displayMode"],
  "🎨 Media": ["barcodeDetector", "compressStream", "decompressStream", "lazyLoad", "accessFonts"],
  "👤 User Data": ["contacts", "payment", "webOtp"],
  "📦 Other": ["contentIndexing", "install"]
};

const generateTests = () => {
  const testGrid = document.getElementById("test-grid");
  testGrid.innerHTML = "";

  Object.entries(apiGroups).forEach(([groupName, apis]) => {
    const groupHeader = document.createElement("div");
    groupHeader.className = "test-group-header";
    groupHeader.textContent = groupName;
    testGrid.appendChild(groupHeader);

    apis.forEach((key) => {
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

    if (window.__summarizerCloseModal) {
      if (apiName === "summarizerStream" || apiName === "translatorStream") {
        const submitBtn = document.getElementById("summarizer-submit");
        const cancelBtn = document.getElementById("summarizer-cancel");
        const textarea = document.getElementById("summarizer-text");

        textarea.disabled = false;
        submitBtn.disabled = false;
        cancelBtn.disabled = false;
        submitBtn.textContent = apiName === "translatorStream" ? "Translate Again" : "Summarize Again";

        if (apiName === "translatorStream") {
          const sourceLangSelect = document.getElementById("translator-source");
          const targetLangSelect = document.getElementById("translator-target");
          if (sourceLangSelect) sourceLangSelect.disabled = false;
          if (targetLangSelect) targetLangSelect.disabled = false;
        } else {
          const typeSelect = document.getElementById("summarizer-type");
          const formatSelect = document.getElementById("summarizer-format");
          const lengthSelect = document.getElementById("summarizer-length");
          if (typeSelect) typeSelect.disabled = false;
          if (formatSelect) formatSelect.disabled = false;
          if (lengthSelect) lengthSelect.disabled = false;
        }

        submitBtn.onclick = () => {
          window.__summarizerCloseModal();
          window.__summarizerCloseModal = null;
          setTimeout(() => runTest(apiName), 100);
        };

        cancelBtn.onclick = () => {
          window.__summarizerCloseModal();
          window.__summarizerCloseModal = null;
        };
      } else {
        window.__summarizerCloseModal();
        window.__summarizerCloseModal = null;
      }
    }

    if (apiName === "createFile" && result.ok && result.handle) {
      window.__lastFileHandle = result.handle;
      logConsole(
        "File handle saved for writeFile/writeUrlToFile tests",
        "info"
      );
    }

    if (apiName !== "summarizerStream" && apiName !== "translatorStream") {
      showResult(`${id}-result`, result, apiName);
    }

    logConsole(
      `${config.title}: ${result.ok ? "SUCCESS" : "FAILED"} - ${
        result.message
      }`,
      result.ok ? "success" : "error"
    );

    if (result.ok) stats.success++;
    else stats.failed++;
  } catch (err) {
    if (window.__summarizerCloseModal) {
      if (apiName === "summarizerStream" || apiName === "translatorStream") {
        const submitBtn = document.getElementById("summarizer-submit");
        const cancelBtn = document.getElementById("summarizer-cancel");
        const textarea = document.getElementById("summarizer-text");

        textarea.disabled = false;
        submitBtn.disabled = false;
        cancelBtn.disabled = false;
        submitBtn.textContent = apiName === "translatorStream" ? "Translate Again" : "Summarize Again";

        if (apiName === "translatorStream") {
          const sourceLangSelect = document.getElementById("translator-source");
          const targetLangSelect = document.getElementById("translator-target");
          if (sourceLangSelect) sourceLangSelect.disabled = false;
          if (targetLangSelect) targetLangSelect.disabled = false;
        } else {
          const typeSelect = document.getElementById("summarizer-type");
          const formatSelect = document.getElementById("summarizer-format");
          const lengthSelect = document.getElementById("summarizer-length");
          if (typeSelect) typeSelect.disabled = false;
          if (formatSelect) formatSelect.disabled = false;
          if (lengthSelect) lengthSelect.disabled = false;
        }

        submitBtn.onclick = () => {
          window.__summarizerCloseModal();
          window.__summarizerCloseModal = null;
          setTimeout(() => runTest(apiName), 100);
        };

        cancelBtn.onclick = () => {
          window.__summarizerCloseModal();
          window.__summarizerCloseModal = null;
        };
      } else {
        window.__summarizerCloseModal();
        window.__summarizerCloseModal = null;
      }
    }
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
  summarizer: "Summarizer",
  translator: "Translator",
  visibility: "Visibility",
  wakeLock: "Wake Lock",
  webOtp: "Web OTP",
  webShare: "Web Share"
};

const aiFeatures = ["summarizer", "translator"];

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
        const aiTag = aiFeatures.includes(key) ? '<span class="ai-tag">AI</span>' : '';
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
