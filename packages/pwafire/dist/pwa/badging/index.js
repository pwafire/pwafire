var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const BadgingApi = {
    setBadge: (unreadCount) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (navigator.setAppBadge) {
                yield navigator.setAppBadge(unreadCount);
                return { ok: true, message: "Set" };
            }
            else {
                return {
                    ok: false,
                    message: "Badging API not supported",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }),
    clearBadge: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (navigator.clearAppBadge) {
                yield navigator.clearAppBadge();
                return { ok: true, message: "Cleared" };
            }
            else {
                return { ok: false, message: "Badging API not supported" };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map