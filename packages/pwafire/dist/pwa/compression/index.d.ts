export declare const compressionStreamsApi: {
    compressStream: (readableStream: ReadableStream) => Promise<{
        ok: boolean;
        message: string;
        stream: ReadableStream<Uint8Array<ArrayBufferLike>>;
    } | {
        ok: boolean;
        message: string;
        stream?: undefined;
    }>;
    decompressStream: (compressedReadableStream: ReadableStream) => Promise<{
        ok: boolean;
        message: string;
        stream: ReadableStream<Uint8Array<ArrayBufferLike>>;
    } | {
        ok: boolean;
        message: string;
        stream?: undefined;
    }>;
};
