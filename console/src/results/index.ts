import type { ApiResult } from "../types";
import { logConsole } from "../log";
import {
  PAYMENT_APIS_DOC_HREF,
  paymentHandlerSampleBody,
  PAYMENT_HANDLER_DEMO_URL
} from "../constants/payment-demo";

const escPre = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const showStreamResult = async (
  title: HTMLElement,
  content: HTMLElement,
  data: ApiResult,
  streamType: "compressed" | "decompressed"
): Promise<void> => {
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
      const msg = err instanceof Error ? err.message : String(err);
      content.innerHTML = `
        <div class="result-error">✗ Failed to process stream: ${msg}</div>
      `;
    }
  } else {
    content.innerHTML = `
      <div class="${statusClass}">${data.ok ? "✓" : "✗"} ${data.message}</div>
    `;
  }
};

const showFileResult = (
  title: HTMLElement,
  content: HTMLElement,
  data: ApiResult
): void => {
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

const showJsonResult = (
  title: HTMLElement,
  content: HTMLElement,
  data: ApiResult
): void => {
  title.textContent = data.ok ? "Success" : "Error";
  const statusClass = data.ok ? "result-success" : "result-error";

  content.innerHTML = `
    <div class="${statusClass}">${data.ok ? "✓" : "✗"} ${data.message}</div>
    <pre>${JSON.stringify(data, null, 2)}</pre>
  `;
};

const showPaymentResult = (
  title: HTMLElement,
  content: HTMLElement,
  data: ApiResult
): void => {
  title.textContent = "Payment Request";
  const statusClass = data.ok ? "result-success" : "result-error";
  const payload = escPre(JSON.stringify(data, null, 2));

  const usageHint = `<p class="payment-sidebar-hint">Check <code class="payment-sidebar-code">check.payment()</code>. <code class="payment-sidebar-code">onApprove</code> returns true/false; pwafire calls <code class="payment-sidebar-code">complete()</code>. <a class="payment-sidebar-link" href="${PAYMENT_APIS_DOC_HREF}" target="_blank" rel="noopener noreferrer">docs/apis/payment.md</a></p>`;
  const methodHint = `<p class="payment-sidebar-hint">This run: <code class="payment-sidebar-code">${escPre(
    PAYMENT_HANDLER_DEMO_URL
  )}</code></p>`;

  const refHeading = "Sample PaymentResponse (BobBucks demo)";
  const refBody = escPre(paymentHandlerSampleBody);

  content.innerHTML = `
    ${usageHint}
    ${methodHint}
    <div class="demo-reference demo-reference--sidebar">
      <div class="demo-reference-heading">${refHeading}</div>
      <pre class="demo-reference-pre">${refBody}</pre>
    </div>
    <p class="payment-result-label"><strong>pwafire payment() returned</strong></p>
    <div class="${statusClass}">${data.ok ? "✓" : "✗"} ${data.message}</div>
    <pre>${payload}</pre>
  `;
};

const showBroadcastListenResult = (
  title: HTMLElement,
  content: HTMLElement,
  data: ApiResult
): void => {
  title.textContent = "Broadcast Listen";
  const statusClass = data.ok ? "result-success" : "result-error";

  content.innerHTML = `
    <div class="${statusClass}">${data.ok ? "✓" : "✗"} ${data.message}</div>
    <div class="broadcast-messages-label">Messages received:</div>
    <div id="broadcast-messages" class="broadcast-messages"></div>
  `;
};

export const appendBroadcastMessage = (data: unknown): void => {
  const el = document.getElementById("broadcast-messages");
  if (!el) return;
  const item = document.createElement("div");
  item.className = "broadcast-message-item";
  item.textContent = `${new Date().toLocaleTimeString()} — ${JSON.stringify(
    data
  )}`;
  el.appendChild(item);
  el.scrollTop = el.scrollHeight;
};

export const showResult = async (
  _elementId: string,
  data: ApiResult,
  apiName: string
): Promise<void> => {
  const sidebar = document.getElementById("result-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const title = document.getElementById("sidebar-title");
  const content = document.getElementById("sidebar-content");

  if (!sidebar || !overlay || !title || !content) return;

  content.innerHTML = "";
  title.textContent = "Loading...";

  window.__currentStreamBlob = null;
  window.__currentStreamType = null;

  sidebar.classList.add("active");
  overlay.classList.add("active");

  if (
    data.stream &&
    (apiName === "compressStream" || apiName === "decompressStream")
  ) {
    const streamType =
      apiName === "decompressStream" ? "decompressed" : "compressed";
    await showStreamResult(title, content, data, streamType);
  } else if (apiName === "broadcast.listen") {
    showBroadcastListenResult(title, content, data);
  } else if (data.file) {
    showFileResult(title, content, data);
  } else if (apiName === "payment") {
    showPaymentResult(title, content, data);
  } else {
    showJsonResult(title, content, data);
  }
};

export const closeSidebar = (): void => {
  const sidebar = document.getElementById("result-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  if (sidebar) sidebar.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
};

export const downloadStream = (): void => {
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
    const msg = err instanceof Error ? err.message : String(err);
    logConsole(`Download failed: ${msg}`, "error");
  }
};
