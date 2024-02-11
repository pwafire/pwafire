export const ContentIndexingApi = {
  contentIndexing: async () => {
    try {
      const registration = (await navigator.serviceWorker.ready) as any;
      if ("index" in registration) {
        return {
          ok: true,
          message: "Context Indexing ready",
          getAll: async () => {
            try {
              return (await registration.index.getAll()) as {
                [key: string]: string | number | boolean | object | any;
              }[];
            } catch (error) {
              throw error;
            }
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
            try {
              await registration.index.add({
                ...item,
                category: item.category || "",
              });
              return { ok: true, message: "Added" };
            } catch (error) {
              throw error;
            }
          },
          removeItem: async (id: string) => {
            try {
              await registration.index.delete(id);
              return { ok: true, message: "Removed" };
            } catch (error) {
              throw error;
            }
          },
        };
      } else {
        return {
          ok: false,
          message: "Content Indexing API not supported",
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
