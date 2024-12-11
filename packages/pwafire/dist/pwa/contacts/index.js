var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const ContactsApi = {
    Contacts: (props, options) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if ("contacts" in navigator && "ContactsManager" in window) {
                const contacts = yield navigator.contacts.select(props, options);
                return { ok: true, message: "Selected", contacts };
            }
            else {
                return { ok: false, message: "Contacts Picker API not supported" };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map