export const notification = async (data: {
  title: string;
  options: {
    body: string;
    icon?: string;
    badge?: string;
    vibrate?: number[];
    sound?: string;
    timestamp: number;
    data?: unknown;
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
    if (!("Notification" in window)) {
      return {
        ok: false,
        message: "Notification API not supported",
      };
    }

    const permission = await Notification.requestPermission();

    if (permission === "denied") {
      return {
        ok: false,
        message: "Notification permission denied",
      };
    }

    if (permission === "granted") {
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(title, options);
        return {
          ok: true,
          message: "Notification sent via service worker",
        };
      } else {
        new Notification(title, options);
        return {
          ok: true,
          message: "Notification sent",
        };
      }
    }

    return {
      ok: false,
      message: "Notification permission not granted",
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to send notification",
    };
  }
};
