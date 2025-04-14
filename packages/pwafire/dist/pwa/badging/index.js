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

// src/pwa/badging/index.ts
var badging_exports = {};
__export(badging_exports, {
  clearBadge: () => clearBadge,
  setBadge: () => setBadge
});
module.exports = __toCommonJS(badging_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clearBadge,
  setBadge
});
