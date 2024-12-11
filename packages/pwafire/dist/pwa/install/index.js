var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const InstallApi = {
    Install: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (type = "installed", callback) {
        try {
            if (navigator.serviceWorker) {
                const methods = {
                    checkIfAppInstalled: () => __awaiter(void 0, void 0, void 0, function* () {
                        try {
                            window.addEventListener("appinstalled", () => {
                                callback("installed");
                            });
                            return { ok: true, message: "Check if installed" };
                        }
                        catch (error) {
                            throw error;
                        }
                    }),
                    beforeInstallPromptEvent: () => __awaiter(void 0, void 0, void 0, function* () {
                        try {
                            window.addEventListener("beforeinstallprompt", (event) => {
                                callback(event);
                            });
                            return { ok: true, message: "Before install prompt" };
                        }
                        catch (error) {
                            throw error;
                        }
                    }),
                    installApp: () => __awaiter(void 0, void 0, void 0, function* () {
                        try {
                            callback("install");
                            return { ok: true, message: "Install App" };
                        }
                        catch (error) {
                            throw error;
                        }
                    }),
                };
                switch (type) {
                    case "before":
                        return yield methods.beforeInstallPromptEvent();
                    case "install":
                        return yield methods.installApp();
                    case "installed":
                        return yield methods.checkIfAppInstalled();
                    default:
                        return { ok: false, message: "Type can be 'install', 'installed' or 'before'" };
                }
            }
            else {
                return { ok: false, message: "Service Worker not supported" };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map