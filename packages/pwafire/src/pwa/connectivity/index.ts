export const ConnectivityApi = {
  Connectivity: async (online: () => "online", offline: () => "offline") => {
    try {
      if (navigator.onLine) {
        online();
        return { message: "Online" };
      } else {
        offline();
        return { message: "Offline" };
      }
    } catch (error) {
      throw error;
    }
  },
};
