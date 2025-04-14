// src/pwa/fonts/index.ts
var accessFonts = async (config) => {
  try {
    if ("queryLocalFonts" in window) {
      const fonts = await window.queryLocalFonts(config);
      return { ok: true, message: "Fonts", fonts };
    } else {
      return { ok: false, message: "Font Access API not supported", fonts: [] };
    }
  } catch (error) {
    throw error;
  }
};

export {
  accessFonts
};
