export const contacts = async (
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
      return { ok: true, message: "Selected", contacts };
    } else {
      return { ok: false, message: "Contacts Picker API not supported" };
    }
  } catch (error) {
    throw error;
  }
};
