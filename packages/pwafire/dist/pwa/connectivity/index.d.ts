declare const connectivity: (online: () => void, offline: () => void) => Promise<{
    ok: boolean;
    message: string;
}>;

export { connectivity };
