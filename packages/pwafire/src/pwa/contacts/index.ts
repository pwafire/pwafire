export const ContactsApi = {
  Contacts: async (
    props: string[],
    options?: {
      multiple: boolean;
    },
  ) => {
    if ("contacts" in navigator && "ContactsManager" in window) {
      const contacts = await (navigator.contacts as any).select(props, options);
      return { ok: true, message: "Selected", contacts };
    } else {
      return { ok: false, message: "Contacts Picker API not supported" };
    }
  },
};
