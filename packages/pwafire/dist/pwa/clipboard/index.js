var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const ClipboardApi = {
    copyText: (text) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (navigator.clipboard) {
                yield navigator.clipboard.writeText(text);
                return { ok: true, message: "Copied" };
            }
            else {
                return {
                    ok: false,
                    message: "Copy Text API not supported",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }),
    readText: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (navigator.clipboard) {
                const text = yield navigator.clipboard.readText();
                return { ok: true, message: "Read", text };
            }
            else {
                return { ok: false, message: "Read Text API not supported", text: null };
            }
        }
        catch (error) {
            throw error;
        }
    }),
    copyImage: (imgURL) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (navigator.clipboard) {
                const data = yield fetch(imgURL);
                const blob = yield data.blob();
                yield navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob,
                    }),
                ]);
                return {
                    ok: true,
                    message: "Image copied",
                };
            }
            else {
                return { ok: false, message: "Copy Image API not supported" };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map