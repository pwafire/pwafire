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

// src/pwa/web-otp/index.ts
var web_otp_exports = {};
__export(web_otp_exports, {
  webOtp: () => webOtp
});
module.exports = __toCommonJS(web_otp_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  webOtp
});
