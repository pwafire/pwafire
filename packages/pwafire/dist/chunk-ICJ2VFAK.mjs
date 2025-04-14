// src/pwa/barcode/index.ts
var barcodeDetector = async (options) => {
  try {
    if ("BarcodeDetector" in window) {
      const formatSupported = (await BarcodeDetector.getSupportedFormats()).includes(options.format);
      if (formatSupported) {
        const barcodeDetector2 = new BarcodeDetector({
          formats: [options.format]
        });
        const barcodes = await barcodeDetector2.detect(options.image);
        return {
          ok: barcodes ? true : false,
          message: barcodes ? "Barcode detected" : "No barcode detected",
          barcodes
        };
      } else {
        return {
          ok: false,
          message: `Sorry, "${options.format.charAt(0).toUpperCase() + options.format.slice(1)}" format not supported`
        };
      }
    } else {
      return {
        ok: false,
        message: "Barcode Detector API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};

export {
  barcodeDetector
};
