var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const NotificationApi = {
    Notification: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, options } = data;
        try {
            if ("Notification" in window) {
                const permission = yield Notification.requestPermission();
                if (permission === "granted") {
                    yield navigator.serviceWorker.ready.then((registration) => {
                        registration.showNotification(title, options);
                        return { ok: true, message: "Sent" };
                    });
                }
                else {
                    return { ok: true, message: "Denied" };
                }
            }
            else {
                return { ok: false, message: "Notification API not supported" };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map