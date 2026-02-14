export const contentIndexing = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const index = (registration as any).index;
    if (index) {
      return { ok: true, message: "Indexed", index };
    } else {
      return { ok: false, message: "Content Indexing API not supported" };
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to access content index",
    };
  }
};
