var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const WebOTPApi = {
    webOTP: (callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if ("OTPCredential" in window) {
                window.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
                    const input = document.querySelector('input[autocomplete="one-time-code"]');
                    if (input) {
                        const ac = new AbortController();
                        const form = input.closest("form");
                        if (form) {
                            form.addEventListener("submit", () => {
                                ac.abort();
                            });
                        }
                        const otp = (yield navigator.credentials.get({
                            otp: { transport: ["sms"] },
                            signal: ac.signal,
                        }));
                        callback({
                            code: otp.code,
                            ok: true,
                            message: "OTP received",
                        });
                    }
                    else {
                        callback({
                            code: null,
                            ok: false,
                            message: "No input with autocomplete='one-time-code' found",
                        });
                    }
                }));
            }
            else {
                callback({
                    code: null,
                    ok: false,
                    message: "Web OTP API not supported",
                });
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map