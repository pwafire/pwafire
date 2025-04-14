declare const copyText: (text: string) => Promise<{
    ok: boolean;
    message: string;
}>;
declare const readText: () => Promise<{
    ok: boolean;
    message: string;
    text: string | null;
}>;
declare const copyImage: (imgURL: string) => Promise<{
    ok: boolean;
    message: string;
}>;

export { copyImage, copyText, readText };
