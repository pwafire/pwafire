declare const compressStream: (readableStream: ReadableStream) => Promise<{
    ok: boolean;
    message: string;
    stream: ReadableStream<Uint8Array<ArrayBufferLike>>;
} | {
    ok: boolean;
    message: string;
    stream?: undefined;
}>;
declare const decompressStream: (compressedReadableStream: ReadableStream) => Promise<{
    ok: boolean;
    message: string;
    stream: ReadableStream<Uint8Array<ArrayBufferLike>>;
} | {
    ok: boolean;
    message: string;
    stream?: undefined;
}>;

export { compressStream, decompressStream };
