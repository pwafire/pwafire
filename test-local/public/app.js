import * as pwafire from './lib/index.mjs';
import * as check from './lib/check/index.mjs';

window.pwafire = pwafire;
window.check = check;

let stats = { run: 0, success: 0, failed: 0 };

function initMatrixEffect() {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = '01';
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 35);
}

// Console Logging

function logConsole(message, type = 'info') {
  const consoleEl = document.getElementById('console');
  const line = document.createElement('div');
  line.className = `console-line ${type}`;
  const time = new Date().toLocaleTimeString();
  line.textContent = `[${time}] ${message}`;
  consoleEl.appendChild(line);
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

window.clearConsole = function() {
  document.getElementById('console').innerHTML =
    '<div class="console-line info">> Console cleared <span class="blink">_</span></div>';
  logConsole('Console cleared', 'info');
};

function showResult(elementId, data) {
  const el = document.getElementById(elementId);
  el.style.display = 'block';
  el.textContent = JSON.stringify(data, null, 2);
}

function updateStats() {
  document.getElementById('test-count').textContent = stats.run;
  document.getElementById('tests-run').textContent = stats.run;
  document.getElementById('tests-success').textContent = stats.success;
  document.getElementById('tests-failed').textContent = stats.failed;
}

const apiConfigs = {
  webShare: {
    title: 'Web Share',
    params: () => [{
      title: 'PWAFire Test',
      text: 'Testing the Web Share API',
      url: window.location.href
    }]
  },
  notification: {
    title: 'Notification',
    params: () => [{
      title: 'PWAFire Test',
      options: { body: 'Test notification from console', timestamp: Date.now() }
    }]
  },
  copyText: {
    title: 'Clipboard',
    params: () => ['Hello from PWAFire Console!']
  },
  wakeLock: {
    title: 'Wake Lock'
  },
  setBadge: {
    title: 'Badging',
    params: () => [5]
  },
  connectivity: {
    title: 'Network',
    params: () => [
      () => { logConsole('Network: Online', 'success'); },
      () => { logConsole('Network: Offline', 'info'); }
    ]
  },
  fullscreen: {
    title: 'Fullscreen'
  },
  visibility: {
    title: 'Visibility',
    params: () => [
      () => { logConsole('Visibility: Page is visible', 'success'); },
      () => { logConsole('Visibility: API not available', 'error'); }
    ]
  },
  contacts: {
    title: 'Contacts',
    params: () => [["name", "email", "tel"], { multiple: true }]
  },
  pickFile: {
    title: 'Files'
  },
  accessFonts: {
    title: 'Fonts'
  },
  contentIndexing: {
    title: 'Content Index'
  },
  install: {
    title: 'Install',
    params: () => ["before", (e) => { logConsole('Install event triggered', 'info'); }]
  },
  idleDetection: {
    title: 'Idle Detection',
    params: () => ["start", () => { logConsole('User is idle', 'info'); }, 60000]
  },
  webOtp: {
    title: 'Web OTP',
    params: () => [(result) => { logConsole(`OTP: ${JSON.stringify(result)}`, 'info'); }]
  },
  payment: {
    title: 'Payment',
    params: () => [{
      paymentMethods: [{
        supportedMethods: "basic-card",
        data: { supportedNetworks: ["visa", "mastercard"] }
      }],
      paymentDetails: {
        total: { label: "Total", amount: { currency: "USD", value: "10.00" } }
      }
    }, (response) => { logConsole(`Payment: ${JSON.stringify(response)}`, 'info'); }]
  },
  screenShare: {
    title: 'Screen Share',
    params: () => [{
      video: { displaySurface: "monitor" },
      audio: true,
      systemAudio: "include"
    }]
  },
  barcodeDetector: {
    title: 'Barcode'
  },
  compressStream: {
    title: 'Compression'
  },
  lazyLoad: {
    title: 'Lazy Load',
    params: () => [{ images: ".lazy-image", style: "fade" }]
  }
};

function generateTests() {
  const testGrid = document.getElementById('test-grid');
  testGrid.innerHTML = '';

  Object.keys(pwafire).forEach((key) => {
    if (typeof pwafire[key] === 'function' && apiConfigs[key]) {
      const config = apiConfigs[key];
      const id = key.toLowerCase().replace(/[A-Z]/g, m => '-' + m.toLowerCase());

      const card = document.createElement('div');
      card.className = 'test-card';
      card.innerHTML = `
        <h3>${config.title}</h3>
        <button onclick="runTest('${key}')">Execute</button>
        <div id="${id}-result" class="result" style="display:none;"></div>
      `;
      testGrid.appendChild(card);
    }
  });
}

window.runTest = async function(apiName) {
  const config = apiConfigs[apiName];
  const id = apiName.toLowerCase().replace(/[A-Z]/g, m => '-' + m.toLowerCase());

  logConsole(`Executing ${config.title} test...`, 'info');
  stats.run++;

  try {
    const params = config.params ? config.params() : [];
    const result = await pwafire[apiName](...params);

    showResult(`${id}-result`, result);
    logConsole(`${config.title}: ${result.ok ? 'SUCCESS' : 'FAILED'} - ${result.message}`,
      result.ok ? 'success' : 'error');

    if (result.ok) stats.success++; else stats.failed++;
  } catch (err) {
    logConsole(`${config.title}: ERROR - ${err.message}`, 'error');
    stats.failed++;
  }

  updateStats();
};

// Feature Detection

const featureDisplayNames = {
  badging: 'Badging API',
  barcode: 'Barcode Detector',
  clipboard: 'Clipboard API',
  compression: 'Compression',
  connectivity: 'Network Info',
  contacts: 'Contacts API',
  contentIndexing: 'Content Index',
  files: 'File System',
  fonts: 'Font Access',
  fullscreen: 'Fullscreen API',
  idleDetection: 'Idle Detection',
  install: 'Install API',
  lazyLoad: 'Lazy Loading',
  notification: 'Notification',
  payment: 'Payment Request',
  screen: 'Screen Details',
  visibility: 'Visibility API',
  wakeLock: 'Wake Lock',
  webOtp: 'Web OTP',
  webShare: 'Web Share'
};

window.checkAllFeatures = function() {
  logConsole('Scanning for PWA features...', 'info');

  const listEl = document.getElementById('feature-list');
  listEl.innerHTML = '';
  let supported = 0;
  let total = 0;

  Object.keys(check).forEach((key) => {
    if (typeof check[key] === 'function') {
      total++;
      const isSupported = check[key]();
      const displayName = featureDisplayNames[key] || key;

      const item = document.createElement('div');
      item.className = `feature-item ${isSupported ? 'supported' : 'not-supported'}`;
      item.innerHTML = `
        <span class="feature-name">${displayName}</span>
        <span class="feature-status ${isSupported ? 'yes' : 'no'}">
          ${isSupported ? 'YES' : 'NO'}
        </span>
      `;
      listEl.appendChild(item);
      if (isSupported) supported++;
      logConsole(`${displayName}: ${isSupported ? 'SUPPORTED' : 'NOT SUPPORTED'}`,
        isSupported ? 'success' : 'error');
    }
  });

  document.getElementById('feature-count').innerHTML =
    `<span style="color: #00ff41;">${supported}/${total}</span>`;
  logConsole(`Feature scan complete: ${supported}/${total} supported`, 'success');
};

// Batch Operations

window.runAllTests = async function() {
  logConsole('='.repeat(50), 'info');
  logConsole('RUNNING ALL TESTS...', 'info');
  logConsole('='.repeat(50), 'info');

  for (const apiName of Object.keys(apiConfigs)) {
    if (typeof pwafire[apiName] === 'function') {
      await runTest(apiName);
      await new Promise(r => setTimeout(r, 500));
    }
  }

  logConsole('='.repeat(50), 'info');
  logConsole(`ALL TESTS COMPLETE: ${stats.success} passed, ${stats.failed} failed`,
    'success');
  logConsole('='.repeat(50), 'info');
};

// Keyboard Shortcuts

function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'r') {
      e.preventDefault();
      runAllTests();
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      clearConsole();
    } else if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      checkAllFeatures();
    }
  });
}

// Initialization

function init() {
  logConsole('PWAFire package loaded successfully', 'success');
  logConsole('Available exports: ' + Object.keys(pwafire).length, 'info');
  logConsole('Check API loaded with ' + Object.keys(check).length +
    ' feature checks', 'info');

  generateTests();
  updateStats();
  initMatrixEffect();
  initKeyboardShortcuts();
  checkAllFeatures();
}

// Start the application
init();
