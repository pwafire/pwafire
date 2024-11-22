export const ContactsApi = {
  Contacts: async (
    props: string[],
    options?: {
      multiple: boolean;
    },
  ) => {
    try {
      if ("contacts" in navigator && "ContactsManager" in window) {
        const contacts = await (
          navigator.contacts as {
            select: (props: string[], options?: { multiple: boolean }) => Promise<any>;
          }
        ).select(props, options);
        return { message: "Selected", contacts };
      } else {
        throw new Error("Contacts API not supported");
      }
    } catch (error) {
      throw error;
    }
  },
};
