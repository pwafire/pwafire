var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const WakeLockApi = {
    wakeLock: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if ("wakeLock" in navigator) {
                const wakeLock = yield ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.wakeLock) === null || _a === void 0 ? void 0 : _a.request("screen"));
                if (wakeLock) {
                    return { ok: true, message: "WakeLock Active" };
                }
                else {
                    return { ok: false, message: "WakeLock Failed" };
                }
            }
            else {
                return { ok: false, message: "WakeLock API not supported" };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map