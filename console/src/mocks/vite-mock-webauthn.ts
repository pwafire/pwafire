import type { Plugin } from "vite";

const base64urlEncode = (buffer: Uint8Array): string => {
  let binary = "";
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return Buffer.from(binary, "binary").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const mockWebAuthnPlugin = (): Plugin => ({
  name: "mock-webauthn",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === "/mock/webauthn/register" && req.method === "GET") {
        const challenge = new Uint8Array(32);
        const userId = new Uint8Array(16);
        for (let i = 0; i < 32; i++) challenge[i] = Math.floor(Math.random() * 256);
        for (let i = 0; i < 16; i++) userId[i] = Math.floor(Math.random() * 256);

        const json = {
          challenge: base64urlEncode(challenge),
          rp: { name: "PWAFire Demo", id: "localhost" },
          user: {
            id: base64urlEncode(userId),
            name: "demo@pwafire.local",
            displayName: "PWAFire Demo User",
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" },
            { alg: -257, type: "public-key" },
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            requireResidentKey: true,
            residentKey: "required",
          },
        };
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(json));
        return;
      }
      if (req.url === "/mock/webauthn/signin" && req.method === "GET") {
        const challenge = new Uint8Array(32);
        for (let i = 0; i < 32; i++) challenge[i] = Math.floor(Math.random() * 256);

        const json = {
          challenge: base64urlEncode(challenge),
          rpId: "localhost",
          userVerification: "preferred",
        };
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(json));
        return;
      }
      next();
    });
  },
});
