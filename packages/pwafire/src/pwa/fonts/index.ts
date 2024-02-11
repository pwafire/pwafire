export const FontsApi = {
  accessFonts: async (config?: { postscriptNames?: string[]; sfnt?: boolean }) => {
    try {
      const getSFNT = async (availableFonts: [any]) => {
        try {
          const outlineFormats = [];
          for (const fontData of availableFonts) {
            const sfntBlob = await fontData.blob();
            const sfntVersion = await sfntBlob.slice(0, 4).text();
            let outlineFormat = "";
            switch (sfntVersion) {
              case "\x00\x01\x00\x00":
              case "true":
              case "typ1":
                outlineFormat = "truetype";
                break;
              case "OTTO":
                outlineFormat = "cff";
                break;
            }
            if (outlineFormat !== "") outlineFormats.push(outlineFormat);
          }
          return outlineFormats;
        } catch (error) {
          throw error;
        }
      };
      if ("queryLocalFonts" in window) {
        if (config && config.postscriptNames) {
          const fonts = await window.queryLocalFonts({ postscriptNames: config.postscriptNames });
          return {
            ok: true,
            message: "Fonts access",
            fonts,
            sfnt: config.sfnt ? await getSFNT(fonts) : [],
          };
        } else {
          const fonts = await window.queryLocalFonts();
          return {
            ok: true,
            message: "Fonts access",
            fonts,
            sfnt: config && config.sfnt ? await getSFNT(fonts) : [],
          };
        }
      } else {
        return {
          ok: false,
          message: "Local Fonts Access API not supported",
          fonts: null,
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
