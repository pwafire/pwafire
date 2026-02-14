export const contacts = async (
  props: string[],
  options?: {
    multiple: boolean;
  },
) => {
  try {
    if ("contacts" in navigator && "ContactsManager" in window) {
      const contacts = await (navigator.contacts as any).select(props, options);
      return { ok: true, message: "Selected", contacts };
    } else {
      return { ok: false, message: "Contacts Picker API not supported" };
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to select contacts",
    };
  }
};
