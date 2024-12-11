export declare const ConnectivityApi: {
    Connectivity: (online: () => "online", offline: () => "offline") => Promise<{
        ok: boolean;
        message: string;
    }>;
};
