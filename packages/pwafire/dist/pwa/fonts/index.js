var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const FontsApi = {
    accessFonts: (config) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getSFNT = (availableFonts) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const outlineFormats = [];
                    for (const fontData of availableFonts) {
                        const sfntBlob = yield fontData.blob();
                        const sfntVersion = yield sfntBlob.slice(0, 4).text();
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
                        if (outlineFormat !== "")
                            outlineFormats.push(outlineFormat);
                    }
                    return outlineFormats;
                }
                catch (error) {
                    throw error;
                }
            });
            if ("queryLocalFonts" in window) {
                if (config && config.postscriptNames) {
                    const fonts = yield window.queryLocalFonts({ postscriptNames: config.postscriptNames });
                    return {
                        ok: true,
                        message: "Fonts access",
                        fonts,
                        sfnt: config.sfnt ? yield getSFNT(fonts) : [],
                    };
                }
                else {
                    const fonts = yield window.queryLocalFonts();
                    return {
                        ok: true,
                        message: "Fonts access",
                        fonts,
                        sfnt: config && config.sfnt ? yield getSFNT(fonts) : [],
                    };
                }
            }
            else {
                return {
                    ok: false,
                    message: "Local Fonts Access API not supported",
                    fonts: null,
                };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map