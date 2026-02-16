type ParseCreationResult = {
  ok: boolean;
  message: string;
  options?: PublicKeyCredentialCreationOptions;
};

type ParseRequestResult = {
  ok: boolean;
  message: string;
  options?: PublicKeyCredentialRequestOptions;
};

type PasskeyResult = {
  ok: boolean;
  message: string;
  credential?: PublicKeyCredential;
};

const getPubKey = (): unknown =>
  typeof window !== "undefined" ? (window as unknown as { PublicKeyCredential?: unknown }).PublicKeyCredential : undefined;

const parseCreationOptions = (json: Record<string, unknown>): ParseCreationResult => {
  try {
    const PubKey = getPubKey();
    if (!PubKey || typeof (PubKey as { parseCreationOptionsFromJSON?: (arg: Record<string, unknown>) => PublicKeyCredentialCreationOptions }).parseCreationOptionsFromJSON !== "function") {
      return { ok: false, message: "Passkey API not supported", options: undefined };
    }
    const options = (PubKey as { parseCreationOptionsFromJSON: (arg: Record<string, unknown>) => PublicKeyCredentialCreationOptions }).parseCreationOptionsFromJSON(json);
    return { ok: true, message: "OK", options };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to parse creation options",
      options: undefined,
    };
  }
};

const parseRequestOptions = (json: Record<string, unknown>): ParseRequestResult => {
  try {
    const PubKey = getPubKey();
    if (!PubKey || typeof (PubKey as { parseRequestOptionsFromJSON?: (arg: Record<string, unknown>) => PublicKeyCredentialRequestOptions }).parseRequestOptionsFromJSON !== "function") {
      return { ok: false, message: "Passkey API not supported", options: undefined };
    }
    const options = (PubKey as { parseRequestOptionsFromJSON: (arg: Record<string, unknown>) => PublicKeyCredentialRequestOptions }).parseRequestOptionsFromJSON(json);
    return { ok: true, message: "OK", options };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to parse request options",
      options: undefined,
    };
  }
};

const create = async (options: PublicKeyCredentialCreationOptions, signal?: AbortSignal): Promise<PasskeyResult> => {
  try {
    if (!("PublicKeyCredential" in window) || !("credentials" in navigator)) {
      return { ok: false, message: "Passkey API not supported" };
    }
    const credential = (await navigator.credentials.create({
      publicKey: options,
      signal,
    })) as PublicKeyCredential | null;
    if (!credential) {
      return { ok: false, message: "Failed to create passkey" };
    }
    return { ok: true, message: "Passkey created", credential };
  } catch (error) {
    if (error instanceof Error && error.name === "InvalidStateError") {
      return { ok: true, message: "Passkey already exists" };
    }
    if (error instanceof Error && error.name === "NotAllowedError") {
      return { ok: false, message: "User cancelled" };
    }
    if (error instanceof Error && error.name === "AbortError") {
      return { ok: false, message: "Operation aborted" };
    }
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to create passkey",
    };
  }
};

const get = async (options: PublicKeyCredentialRequestOptions, signal?: AbortSignal): Promise<PasskeyResult> => {
  try {
    if (!("PublicKeyCredential" in window) || !("credentials" in navigator)) {
      return { ok: false, message: "Passkey API not supported" };
    }
    const credential = (await navigator.credentials.get({
      publicKey: options,
      signal,
    })) as PublicKeyCredential | null;
    if (!credential) {
      return { ok: false, message: "Failed to authenticate" };
    }
    return { ok: true, message: "Authenticated", credential };
  } catch (error) {
    if (error instanceof Error && error.name === "NotAllowedError") {
      return { ok: false, message: "User cancelled" };
    }
    if (error instanceof Error && error.name === "AbortError") {
      return { ok: false, message: "Operation aborted" };
    }
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to authenticate",
    };
  }
};

const getConditional = async (options: PublicKeyCredentialRequestOptions, signal?: AbortSignal): Promise<PasskeyResult> => {
  try {
    if (!("PublicKeyCredential" in window) || !("credentials" in navigator)) {
      return { ok: false, message: "Passkey API not supported" };
    }
    const credential = (await navigator.credentials.get({
      publicKey: options,
      mediation: "conditional",
      signal,
    })) as PublicKeyCredential | null;
    if (!credential) {
      return { ok: false, message: "Failed to authenticate" };
    }
    return { ok: true, message: "Authenticated", credential };
  } catch (error) {
    if (error instanceof Error && error.name === "NotAllowedError") {
      return { ok: false, message: "User cancelled" };
    }
    if (error instanceof Error && error.name === "AbortError") {
      return { ok: false, message: "Operation aborted" };
    }
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to authenticate",
    };
  }
};

const signalUnknown = async (rpId: string, credentialId: string): Promise<{ ok: boolean; message: string }> => {
  try {
    const PubKey = getPubKey();
    if (!PubKey || typeof (PubKey as { signalUnknownCredential?: (arg: { rpId: string; credentialId: string }) => Promise<void> }).signalUnknownCredential !== "function") {
      return { ok: false, message: "Signal API not supported" };
    }
    await (PubKey as { signalUnknownCredential: (arg: { rpId: string; credentialId: string }) => Promise<void> }).signalUnknownCredential({ rpId, credentialId });
    return { ok: true, message: "Signal sent" };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to signal unknown credential",
    };
  }
};

export const passkey = {
  parseCreationOptions,
  parseRequestOptions,
  create,
  get,
  getConditional,
  signalUnknown,
  get signalUnknownCredential(): boolean {
    const PubKey = getPubKey();
    return typeof (PubKey as { signalUnknownCredential?: unknown })?.signalUnknownCredential === "function";
  },
};
