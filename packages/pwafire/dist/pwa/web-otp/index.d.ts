export declare const WebOTPApi: {
    webOTP: (callback: (res: {
        code: string | null;
        ok: boolean;
        message: string;
    }) => void) => Promise<void>;
};
