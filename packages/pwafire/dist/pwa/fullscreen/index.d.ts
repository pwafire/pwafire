declare const fullscreen: () => Promise<{
    ok: boolean;
    message: string;
}>;

export { fullscreen };
