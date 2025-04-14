declare const idleDetection: (action?: string) => Promise<{
    ok: boolean;
    message: string;
}>;

export { idleDetection };
