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

// API Test Functions

window.testWebShare = async function() {
  logConsole('Executing Web Share test...', 'info');
  stats.run++;
  try {
    const result = await pwafire.webShare({
      title: 'PWAFire Test',
      text: 'Testing the Web Share API',
      url: window.location.href
    });
    showResult('share-result', result);
    logConsole(`Web Share: ${result.ok ? 'SUCCESS' : 'FAILED'} - ${result.message}`,
      result.ok ? 'success' : 'error');
    if (result.ok) stats.success++; else stats.failed++;
  } catch (err) {
    logConsole(`Web Share: ERROR - ${err.message}`, 'error');
    stats.failed++;
  }
  updateStats();
};

window.testNotification = async function() {
  logConsole('Executing Notification test...', 'info');
  stats.run++;
  try {
    const result = await pwafire.notification({
      title: 'PWAFire Test',
      options: {
        body: 'Test notification from console',
        timestamp: Date.now()
      }
    });
    showResult('notification-result', result);
    logConsole(`Notification: ${result.ok ? 'SUCCESS' : 'FAILED'} - ${result.message}`,
      result.ok ? 'success' : 'error');
    if (result.ok) stats.success++; else stats.failed++;
  } catch (err) {
    logConsole(`Notification: ERROR - ${err.message}`, 'error');
    stats.failed++;
  }
  updateStats();
};

window.testClipboard = async function() {
  const text = document.getElementById('clipboard-input').value ||
    'Hello from PWAFire Console!';
  logConsole(`Executing Clipboard test with: "${text}"`, 'info');
  stats.run++;
  try {
    const result = await pwafire.copyText(text);
    showResult('clipboard-result', result);
    logConsole(`Clipboard: ${result.ok ? 'SUCCESS' : 'FAILED'} - ${result.message}`,
      result.ok ? 'success' : 'error');
    if (result.ok) stats.success++; else stats.failed++;
  } catch (err) {
    logConsole(`Clipboard: ERROR - ${err.message}`, 'error');
    stats.failed++;
  }
  updateStats();
};

window.testWakeLock = async function() {
  logConsole('Executing Wake Lock test...', 'info');
  stats.run++;
  try {
    const result = await pwafire.wakeLock();
    showResult('wakelock-result', result);
    logConsole(`Wake Lock: ${result.ok ? 'SUCCESS' : 'FAILED'} - ${result.message}`,
      result.ok ? 'success' : 'error');
    if (result.ok) stats.success++; else stats.failed++;
  } catch (err) {
    logConsole(`Wake Lock: ERROR - ${err.message}`, 'error');
    stats.failed++;
  }
  updateStats();
};

window.testBadging = async function(count) {
  logConsole(`Executing Badging test with count: ${count}`, 'info');
  stats.run++;
  try {
    const result = await pwafire.setBadge(count);
    showResult('badging-result', result);
    logConsole(`Badging: ${result.ok ? 'SUCCESS' : 'FAILED'} - ${result.message}`,
      result.ok ? 'success' : 'error');
    if (result.ok) stats.success++; else stats.failed++;
  } catch (err) {
    logConsole(`Badging: ERROR - ${err.message}`, 'error');
    stats.failed++;
  }
  updateStats();
};

window.testConnectivity = async function() {
  logConsole('Executing Network Info test...', 'info');
  stats.run++;
  try {
    const result = await pwafire.connectivity(
      () => { logConsole('Network: Online', 'success'); },
      () => { logConsole('Network: Offline', 'info'); }
    );
    showResult('connectivity-result', result);
    logConsole(`Network: ${result.ok ? 'SUCCESS' : 'FAILED'} - ${result.message}`,
      result.ok ? 'success' : 'error');
    if (result.ok) stats.success++; else stats.failed++;
  } catch (err) {
    logConsole(`Network: ERROR - ${err.message}`, 'error');
    stats.failed++;
  }
  updateStats();
};

window.testFullscreen = async function() {
  logConsole('Executing Fullscreen test...', 'info');
  stats.run++;
  try {
    const result = await pwafire.fullscreen();
    showResult('fullscreen-result', result);
    logConsole(`Fullscreen: ${result.ok ? 'SUCCESS' : 'FAILED'} - ${result.message}`,
      result.ok ? 'success' : 'error');
    if (result.ok) stats.success++; else stats.failed++;
  } catch (err) {
    logConsole(`Fullscreen: ERROR - ${err.message}`, 'error');
    stats.failed++;
  }
  updateStats();
};

window.testVisibility = async function() {
  logConsole('Executing Visibility test...', 'info');
  stats.run++;
  try {
    const result = await pwafire.visibility(
      () => { logConsole('Visibility: Page is visible', 'success'); },
      () => { logConsole('Visibility: API not available', 'error'); }
    );
    showResult('visibility-result', result);
    logConsole(`Visibility: ${result.ok ? 'SUCCESS' : 'FAILED'} - ${result.message}`,
      result.ok ? 'success' : 'error');
    if (result.ok) stats.success++; else stats.failed++;
  } catch (err) {
    logConsole(`Visibility: ERROR - ${err.message}`, 'error');
    stats.failed++;
  }
  updateStats();
};

// Feature Detection

window.checkAllFeatures = function() {
  logConsole('Scanning for PWA features...', 'info');

  const features = {
    'Badging API': check.badging(),
    'Barcode Detector': check.barcode(),
    'Clipboard API': check.clipboard(),
    'Compression': check.compression(),
    'Network Info': check.connectivity(),
    'Contacts API': check.contacts(),
    'Content Index': check.contentIndexing(),
    'File System': check.files(),
    'Font Access': check.fonts(),
    'Fullscreen API': check.fullscreen(),
    'Idle Detection': check.idleDetection(),
    'Install API': check.install(),
    'Lazy Loading': check.lazyLoad(),
    'Notification': check.notification(),
    'Payment Request': check.payment(),
    'Screen Details': check.screen(),
    'Visibility API': check.visibility(),
    'Wake Lock': check.wakeLock(),
    'Web OTP': check.webOtp(),
    'Web Share': check.webShare(),
  };

  const listEl = document.getElementById('feature-list');
  listEl.innerHTML = '';
  let supported = 0;

  for (const [name, isSupported] of Object.entries(features)) {
    const item = document.createElement('div');
    item.className = `feature-item ${isSupported ? 'supported' : 'not-supported'}`;
    item.innerHTML = `
      <span class="feature-name">${name}</span>
      <span class="feature-status ${isSupported ? 'yes' : 'no'}">
        ${isSupported ? 'YES' : 'NO'}
      </span>
    `;
    listEl.appendChild(item);
    if (isSupported) supported++;
    logConsole(`${name}: ${isSupported ? 'SUPPORTED' : 'NOT SUPPORTED'}`,
      isSupported ? 'success' : 'error');
  }

  document.getElementById('feature-count').innerHTML =
    `<span style="color: #00ff41;">${supported}/20</span>`;
  logConsole(`Feature scan complete: ${supported}/20 supported`, 'success');
};

// Batch Operations

window.runAllTests = async function() {
  logConsole('='.repeat(50), 'info');
  logConsole('RUNNING ALL TESTS...', 'info');
  logConsole('='.repeat(50), 'info');

  await testWebShare();
  await new Promise(r => setTimeout(r, 500));
  await testNotification();
  await new Promise(r => setTimeout(r, 500));
  await testClipboard();
  await new Promise(r => setTimeout(r, 500));
  await testWakeLock();
  await new Promise(r => setTimeout(r, 500));
  await testConnectivity();
  await new Promise(r => setTimeout(r, 500));
  await testVisibility();

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

  updateStats();
  initMatrixEffect();
  initKeyboardShortcuts();
  checkAllFeatures();
}

// Start the application
init();
