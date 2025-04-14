// src/pwa/notification/index.ts
var notification = async (data) => {
  const { title, options } = data;
  try {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        await navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, options);
          return { ok: true, message: "Sent" };
        });
      } else {
        return { ok: true, message: "Denied" };
      }
    } else {
      return { ok: false, message: "Notification API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  notification
};
