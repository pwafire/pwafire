// src/pwa/connectivity/index.ts
var connectivity = async (online, offline) => {
  try {
    if (navigator.onLine) {
      online();
      return { ok: true, message: "Online" };
    } else {
      offline();
      return { ok: true, message: "Offline" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  connectivity
};
