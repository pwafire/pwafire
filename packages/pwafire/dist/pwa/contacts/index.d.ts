export declare const ContactsApi: {
    Contacts: (props: string[], options?: {
        multiple: boolean;
    }) => Promise<{
        ok: boolean;
        message: string;
        contacts: any;
    } | {
        ok: boolean;
        message: string;
        contacts?: undefined;
    }>;
};
