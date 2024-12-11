export declare const ClipboardApi: {
    copyText: (text: string) => Promise<{
        ok: boolean;
        message: string;
    }>;
    readText: () => Promise<{
        ok: boolean;
        message: string;
        text: string | null;
    }>;
    copyImage: (imgURL: string) => Promise<{
        ok: boolean;
        message: string;
    }>;
};
