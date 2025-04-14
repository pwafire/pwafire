// src/pwa/web-otp/index.ts
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

export {
  webOtp
};
