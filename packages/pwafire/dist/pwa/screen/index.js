var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const screenApi = {
    screenSharingControls: (config) => __awaiter(void 0, void 0, void 0, function* () {
        if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
            return navigator.mediaDevices.getDisplayMedia(config);
        }
        else {
            throw new Error("Screen sharing is not supported in this browser.");
        }
    }),
    webPIP: (callback_1, ...args_1) => __awaiter(void 0, [callback_1, ...args_1], void 0, function* (callback, config = {}) {
        try {
            const pipButton = document.getElementById("pipButton");
            const player = document.getElementById("pipPlayer");
            if (!pipButton || !player)
                throw new Error("No player or button found.");
            pipButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b;
                if ("documentPictureInPicture" in window) {
                    const pipWindow = yield window.documentPictureInPicture.requestWindow(Object.assign(Object.assign({}, config), { width: (_a = config === null || config === void 0 ? void 0 : config.width) !== null && _a !== void 0 ? _a : player === null || player === void 0 ? void 0 : player.clientWidth, height: (_b = config === null || config === void 0 ? void 0 : config.height) !== null && _b !== void 0 ? _b : player === null || player === void 0 ? void 0 : player.clientHeight }));
                    pipWindow.document.body.append(player);
                    callback({ ok: true, window: pipWindow, message: "Picture in Picture mode enabled." });
                }
                else {
                    callback({ ok: false, window: null, message: "Picture in Picture is not supported in this browser." });
                }
            }));
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map