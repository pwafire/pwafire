export const contentIndexing = async () => {
  try {
    const registration = (await navigator.serviceWorker.ready) as any;
    if (registration.index) {
      return { ok: true, message: "Indexed", index: registration.index };
    } else {
      return { ok: false, message: "Content Indexing API not supported" };
    }
  } catch (error) {
    throw error;
  }
};
