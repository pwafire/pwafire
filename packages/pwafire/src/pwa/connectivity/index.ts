export const ConnectivityApi = {
  Connectivity: async (online: () => "online", offline: () => "offline") => {
    if (navigator.onLine) {
      online();
      return { ok: true, message: "Online" };
    } else {
      offline();
      return { ok: true, message: "Offline" };
    }
  },
};
