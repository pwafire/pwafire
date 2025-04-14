"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/check/index.ts
var check_exports = {};
__export(check_exports, {
  check: () => check
});
module.exports = __toCommonJS(check_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  check
});
