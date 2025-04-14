declare const install: (type: "before" | "install" | "installed" | undefined, callback: (event: string | any) => any) => Promise<{
    ok: boolean;
    message: string;
}>;

export { install };
