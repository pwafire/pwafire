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

// src/pwa/screen/index.ts
var screen_exports = {};
__export(screen_exports, {
  screenSharingControls: () => screenSharingControls,
  webPIP: () => webPIP
});
module.exports = __toCommonJS(screen_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  screenSharingControls,
  webPIP
});
