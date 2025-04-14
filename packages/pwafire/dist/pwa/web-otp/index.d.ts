declare const webOtp: (callback: (res: {
    code: string | null;
    ok: boolean;
    message: string;
}) => void) => Promise<void>;

export { webOtp };
