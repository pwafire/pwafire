var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const FilesApi = {
    readFiles: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (navigator.clipboard) {
                const files = [];
                const items = yield navigator.clipboard.read();
                for (const item of items) {
                    for (const type of item.types) {
                        const blob = yield item.getType(type);
                        const file = new File([blob], "clipboard-file", { type });
                        files.push(file);
                    }
                }
                return { ok: true, message: "Read", files };
            }
            else {
                return { ok: false, message: "Read Files API not supported", files: null };
            }
        }
        catch (error) {
            throw error;
        }
    }),
    pickTextFile: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let fileHandle;
            [fileHandle] = yield window.showOpenFilePicker();
            const file = yield fileHandle.getFile();
            if (file) {
                const typeList = file.type.split("/");
                if (typeList.includes("text")) {
                    const contents = yield file.text();
                    return { ok: true, message: "File picked", contents };
                }
                else {
                    return { ok: false, message: "File Picker API not supported" };
                }
            }
            else {
                return { ok: false, message: "Please pick text type file" };
            }
        }
        catch (error) {
            throw error;
        }
    }),
    pickFile: (options) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let fileHandle;
            [fileHandle] = options ? yield window.showOpenFilePicker(options) : yield window.showOpenFilePicker();
            const file = yield fileHandle.getFile();
            if (file) {
                return {
                    file,
                    ok: true,
                    message: "File picked",
                };
            }
            else {
                return {
                    file: null,
                    ok: false,
                    message: "File Picker API not supported",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map