var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const BarcodeDetectorApi = {
    barcodeDetector: (options) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if ("BarcodeDetector" in window) {
                const formatSupported = (yield BarcodeDetector.getSupportedFormats()).includes(options.format);
                if (formatSupported) {
                    const barcodeDetector = new BarcodeDetector({
                        formats: [options.format],
                    });
                    const barcodes = yield barcodeDetector.detect(options.image);
                    return {
                        ok: barcodes ? true : false,
                        message: barcodes ? "Barcode detected" : "No barcode detected",
                        barcodes,
                    };
                }
                else {
                    return {
                        ok: false,
                        message: `Sorry, "${options.format.charAt(0).toUpperCase() + options.format.slice(1)}" format not supported`,
                    };
                }
            }
            else {
                return {
                    ok: false,
                    message: "Barcode Detector API not supported",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map