export const BarcodeDetectorApi = {
  barcodeDetector: async (options: {
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
  }) => {
    try {
      if ("BarcodeDetector" in window) {
        const formatSupported = (await BarcodeDetector.getSupportedFormats()).includes(options.format);
        if (formatSupported) {
          const barcodeDetector = new BarcodeDetector({
            formats: [options.format],
          });
          const barcodes = await barcodeDetector.detect(options.image);
          if (!barcodes) throw new Error("No barcode detected");
          return {
            message: barcodes ? "Barcode detected" : "No barcode detected",
            barcodes,
          };
        } else {
          throw `Sorry, "${options.format.charAt(0).toUpperCase() + options.format.slice(1)}" format not supported`;
        }
      } else {
        throw new Error("Barcode Detector API not supported");
      }
    } catch (error) {
      throw error;
    }
  },
};
