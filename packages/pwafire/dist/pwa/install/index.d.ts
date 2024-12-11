export declare const InstallApi: {
    Install: (type: "before" | "install" | "installed" | undefined, callback: (event: string | any) => any) => Promise<{
        ok: boolean;
        message: string;
    }>;
};
