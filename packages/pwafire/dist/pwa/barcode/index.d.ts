declare const barcodeDetector: (options: {
    image: Blob | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | ImageBitmap;
    format: "aztec" | "code_128" | "code_39" | "code_93" | "codabar" | "data_matrix" | "ean_13" | "ean_8" | "itf" | "pdf417" | "qr_code" | "upc_a" | "upc_e";
}) => Promise<{
    ok: boolean;
    message: string;
    barcodes: any;
} | {
    ok: boolean;
    message: string;
    barcodes?: undefined;
}>;

export { barcodeDetector };
