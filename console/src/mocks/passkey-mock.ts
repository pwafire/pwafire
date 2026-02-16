const base64urlEncode = (bytes: Uint8Array): string => {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const getMockCreationOptions = (): Record<string, unknown> => {
  const rpId = typeof window !== "undefined" ? window.location.hostname || "localhost" : "localhost";
  const challenge = crypto.getRandomValues(new Uint8Array(32));
  const userId = crypto.getRandomValues(new Uint8Array(16));

  return {
    challenge: base64urlEncode(challenge),
    rp: {
      name: "PWAFire Demo",
      id: rpId,
    },
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
};

export const getMockRequestOptions = (): Record<string, unknown> => {
  const rpId = typeof window !== "undefined" ? window.location.hostname || "localhost" : "localhost";
  const challenge = crypto.getRandomValues(new Uint8Array(32));

  return {
    challenge: base64urlEncode(challenge),
    rpId,
    userVerification: "preferred",
  };
};
