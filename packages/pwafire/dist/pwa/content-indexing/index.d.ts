declare const contentIndexing: () => Promise<{
    ok: boolean;
    message: string;
    index: any;
} | {
    ok: boolean;
    message: string;
    index?: undefined;
}>;

export { contentIndexing };
