var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const VisibilityApi = {
    Visibility: (isVisible, notAvailable) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (document.visibilityState) {
                const state = document.visibilityState;
                if (state === "visible") {
                    isVisible();
                    return { ok: true, message: "Visible" };
                }
            }
            else {
                notAvailable();
                return {
                    ok: false,
                    message: "Visibility API not supported",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }),
    displayMode: (callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            window.addEventListener("DOMContentLoaded", () => {
                const displayMode = window.matchMedia("(display-mode: standalone)").matches
                    ? "standalone"
                    : window.matchMedia("(display-mode: minimal-ui)").matches
                        ? "minimal-ui"
                        : window.matchMedia("(display-mode: fullscreen)").matches
                            ? "fullscreen"
                            : "broswer-tab";
                callback(displayMode);
            });
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map