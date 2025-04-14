declare global {
  interface Navigator {
    contacts: {
      select: (props: string[]) => Promise<any>;
    };
  }
}

export const contacts = async (props: string[]) => {
  try {
    if ("contacts" in navigator && "ContactsManager" in window) {
      const contacts = await navigator.contacts.select(props);
      return { ok: true, message: "Contacts", contacts };
    } else {
      return { ok: false, message: "Contacts API not supported", contacts: [] };
    }
  } catch (error) {
    throw error;
  }
};
