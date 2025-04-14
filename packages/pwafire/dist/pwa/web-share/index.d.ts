declare const webShare: (data: ShareData) => Promise<{
    ok: boolean;
    message: string;
}>;

export { webShare };
