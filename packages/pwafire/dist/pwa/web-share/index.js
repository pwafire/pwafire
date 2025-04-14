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

// src/pwa/web-share/index.ts
var web_share_exports = {};
__export(web_share_exports, {
  webShare: () => webShare
});
module.exports = __toCommonJS(web_share_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  webShare
});
