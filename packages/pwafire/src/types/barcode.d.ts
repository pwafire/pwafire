// Barcode Detector API types
declare let BarcodeDetector: {
  new (options?: { formats: string[] }): unknown;
  getSupportedFormats(): Promise<string[]>;
};
