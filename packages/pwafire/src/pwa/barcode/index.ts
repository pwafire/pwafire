import type { ErrorCode } from "../../types/result";

export const barcodeDetector = async (options: {
  image: Blob | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | ImageBitmap;
  format:
    | "aztec"
    | "code_128"
    | "code_39"
    | "code_93"
    | "codabar"
    | "data_matrix"
    | "ean_13"
    | "ean_8"
    | "itf"
    | "pdf417"
    | "qr_code"
    | "upc_a"
    | "upc_e";
}): Promise<{
  ok: boolean;
  message: string;
  barcodes?: unknown[];
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!("BarcodeDetector" in window)) {
      return { ok: false, code: "unsupported", message: "Barcode Detector API not supported" };
    }
    const formatSupported = (await BarcodeDetector.getSupportedFormats()).includes(options.format);
    if (!formatSupported) {
      return {
        ok: false,
        code: "unsupported",
        message: `Sorry, "${options.format.charAt(0).toUpperCase() + options.format.slice(1)}" format not supported`,
      };
    }
    const barcodeDetector = new BarcodeDetector({
      formats: [options.format],
    });
    const barcodes = await (barcodeDetector as any).detect(options.image);
    return {
      ok: barcodes ? true : false,
      message: barcodes ? "Barcode detected" : "No barcode detected",
      barcodes,
    };
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to detect barcode",
      cause: error,
    };
  }
};
