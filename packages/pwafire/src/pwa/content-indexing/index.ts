export const ContentIndexingApi = {
  contentIndexing: async () => {
    const registration = (await navigator.serviceWorker.ready) as any;
    if ("index" in registration) {
      return {
        ok: true,
        message: "Context Indexing ready",
        getAll: async () => {
          return (await registration.index.getAll()) as {
            [key: string]: string | number | boolean | object | any;
          }[];
        },
        addItem: async (item: {
          id: string;
          title: string;
          category?: "homepage" | "article" | "video" | "audio" | "";
          description: string;
          icons: {
            src: string;
            sizes: string;
            type: string;
          }[];
          url: string;
        }) => {
          await registration.index.add({
            ...item,
            category: item.category || "",
          });
          return { ok: true, message: "Added" };
        },
        removeItem: async (id: string) => {
          await registration.index.delete(id);
          return { ok: true, message: "Removed" };
        },
      };
    } else {
      return {
        ok: false,
        message: "Content Indexing API not supported",
      };
    }
  },
};
