// src/pwa/contacts/index.ts
var contacts = async (props) => {
  try {
    if ("contacts" in navigator && "ContactsManager" in window) {
      const contacts2 = await navigator.contacts.select(props);
      return { ok: true, message: "Contacts", contacts: contacts2 };
    } else {
      return { ok: false, message: "Contacts API not supported", contacts: [] };
    }
  } catch (error) {
    throw error;
  }
};

export {
  contacts
};
