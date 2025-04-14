// src/pwa/clipboard/index.ts
var copyText = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return { ok: true, message: "Copied" };
    } else {
      return {
        ok: false,
        message: "Copy Text API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var readText = async () => {
  try {
    if (navigator.clipboard) {
      const text = await navigator.clipboard.readText();
      return { ok: true, message: "Read", text };
    } else {
      return { ok: false, message: "Read Text API not supported", text: null };
    }
  } catch (error) {
    throw error;
  }
};
var copyImage = async (imgURL) => {
  try {
    if (navigator.clipboard) {
      const data = await fetch(imgURL);
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      return {
        ok: true,
        message: "Image copied"
      };
    } else {
      return { ok: false, message: "Copy Image API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  copyText,
  readText,
  copyImage
};
