export const notification = async (data: {
  title: string;
  options: {
    body: string;
    icon?: string;
    badge?: string;
    vibrate?: number[];
    sound?: string;
    timestamp: number;
    data?: any;
    dir?: "auto" | "ltr" | "rtl";
    requireInteraction?: boolean;
    renotify?: boolean;
    silent?: boolean;
    actions?: {
      action: string;
      type: "button" | "text";
      title: string;
      icon?: string;
      placeholder?: string;
    }[];
  };
}) => {
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
