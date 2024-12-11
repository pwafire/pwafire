var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const compressionStreamsApi = {
    compressStream: (readableStream) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if ("CompressionStream" in window) {
                return {
                    ok: true,
                    message: "Compressed",
                    stream: readableStream.pipeThrough(new CompressionStream("gzip")),
                };
            }
            else {
                return {
                    ok: false,
                    message: "Compression Streams API not supported",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }),
    decompressStream: (compressedReadableStream) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if ("DecompressionStream" in window) {
                return {
                    ok: true,
                    message: "Decompressed",
                    stream: compressedReadableStream.pipeThrough(new DecompressionStream("gzip")),
                };
            }
            else {
                return {
                    ok: false,
                    message: "DeCompression Streams API not supported",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map