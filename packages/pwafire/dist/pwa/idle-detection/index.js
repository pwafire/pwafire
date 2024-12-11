var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const IdleDetectionApi = {
    idleDetection: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (action = "start", callback = () => {
        // do something
    }, threshold = 60000) {
        try {
            if ("IdleDetector" in window) {
                const state = yield IdleDetector.requestPermission();
                if (state === "granted") {
                    const controller = new AbortController();
                    const signal = controller.signal;
                    const idleDetector = new IdleDetector();
                    idleDetector.addEventListener("change", () => {
                        const userState = idleDetector.userState;
                        if (userState === "idle")
                            callback();
                    });
                    if (action === "start") {
                        yield idleDetector.start({
                            threshold: threshold > 60000 ? threshold : 60000,
                            signal,
                        });
                        return { ok: true, message: "Started" };
                    }
                    else {
                        controller.abort();
                        return { ok: true, message: "Aborted" };
                    }
                }
                else {
                    return { ok: false, message: "Need to request permission first" };
                }
            }
            else {
                return { ok: false, message: "Idle Detection API not supported" };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map