// src/pwa/content-indexing/index.ts
var contentIndexing = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    if (registration.index) {
      return { ok: true, message: "Indexed", index: registration.index };
    } else {
      return { ok: false, message: "Content Indexing API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  contentIndexing
};
