var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const ShareApi = {
    Share: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (data.files) {
                if (navigator.canShare && navigator.canShare(data)) {
                    yield navigator.share(data);
                    return { ok: true, message: "Shared" };
                }
                else {
                    return { ok: false, message: "Share Files API not supported" };
                }
            }
            else {
                if (navigator.share) {
                    yield navigator.share(data);
                    return { ok: true, message: "Shared" };
                }
                else {
                    return { ok: false, message: "Web Share API not supported" };
                }
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map