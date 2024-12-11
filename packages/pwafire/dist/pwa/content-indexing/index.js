var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const ContentIndexingApi = {
    contentIndexing: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const registration = (yield navigator.serviceWorker.ready);
            if ("index" in registration) {
                return {
                    ok: true,
                    message: "Context Indexing ready",
                    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
                        try {
                            return (yield registration.index.getAll());
                        }
                        catch (error) {
                            throw error;
                        }
                    }),
                    addItem: (item) => __awaiter(void 0, void 0, void 0, function* () {
                        try {
                            yield registration.index.add(Object.assign(Object.assign({}, item), { category: item.category || "" }));
                            return { ok: true, message: "Added" };
                        }
                        catch (error) {
                            throw error;
                        }
                    }),
                    removeItem: (id) => __awaiter(void 0, void 0, void 0, function* () {
                        try {
                            yield registration.index.delete(id);
                            return { ok: true, message: "Removed" };
                        }
                        catch (error) {
                            throw error;
                        }
                    }),
                };
            }
            else {
                return {
                    ok: false,
                    message: "Content Indexing API not supported",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map