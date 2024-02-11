export const ClipboardApi = {
  copyText: async (text: string): Promise<{ ok: boolean; message: string }> => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return { ok: true, message: "Copied" };
    } else {
      return {
        ok: false,
        message: "Copy Text API not supported",
      };
    }
  },

  readText: async (): Promise<{ ok: boolean; message: string; text: string | null }> => {
    if (navigator.clipboard) {
      const text = await navigator.clipboard.readText();
      return { ok: true, message: "Read", text };
    } else {
      return { ok: false, message: "Read Text API not supported", text: null };
    }
  },

  copyImage: async (imgURL: string) => {
    if (navigator.clipboard) {
      const data = await fetch(imgURL);
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      return {
        ok: true,
        message: "Image copied",
      };
    } else {
      return { ok: false, message: "Copy Image API not supported" };
    }
  },
};
