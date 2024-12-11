export declare const FilesApi: {
    readFiles: () => Promise<{
        ok: boolean;
        message: string;
        files: File[] | null;
    }>;
    pickTextFile: () => Promise<{
        ok: boolean;
        message: string;
        contents: any;
    } | {
        ok: boolean;
        message: string;
        contents?: undefined;
    }>;
    pickFile: (options?: {
        types: [{
            description: string;
            accept: {
                "image/*"?: string[];
                "audio/*"?: string[];
                "video/*"?: string[];
            };
        }];
        multiple?: boolean;
    }) => Promise<{
        file: any;
        ok: boolean;
        message: string;
    }>;
};
