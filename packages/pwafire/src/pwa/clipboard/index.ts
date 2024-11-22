export const ClipboardApi = {
  copyText: async (text: string): Promise<{ ok: boolean; message: string }> => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return { ok: true, message: "Copied" };
      } else {
        throw "Clipboard API not supported";
      }
    } catch (error) {
      throw error;
    }
  },

  readText: async (): Promise<{ ok: boolean; message: string; text: string | null }> => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        return { ok: true, message: "Read", text };
      } else {
        throw "Clipboard API not supported";
      }
    } catch (error) {
      throw error;
    }
  },

  copyImage: async (imgURL: string) => {
    try {
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
        throw "Clipboard API not supported for images";
      }
    } catch (error) {
      throw error;
    }
  },
};
