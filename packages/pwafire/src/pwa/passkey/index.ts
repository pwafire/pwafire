import type { ErrorCode } from "../../types/result";

type ParseCreationResult = {
  ok: boolean;
  message: string;
  options?: PublicKeyCredentialCreationOptions;
  code?: ErrorCode;
  cause?: unknown;
};

type ParseRequestResult = {
  ok: boolean;
  message: string;
  options?: PublicKeyCredentialRequestOptions;
  code?: ErrorCode;
  cause?: unknown;
};

type PasskeyResult = {
  ok: boolean;
  message: string;
  credential?: PublicKeyCredential;
  code?: ErrorCode;
  cause?: unknown;
};

const getPubKey = (): unknown =>
  typeof window !== "undefined" ? (window as unknown as { PublicKeyCredential?: unknown }).PublicKeyCredential : undefined;

let passkeyAbortController: AbortController | null = null;

const getOrCreateSignal = (): AbortSignal => {
  if (passkeyAbortController) passkeyAbortController.abort();
  passkeyAbortController = new AbortController();
  return passkeyAbortController.signal;
};

type PasskeyError = { code: ErrorCode; message: string };

const passkeyError = (error: unknown, fallbackMessage: string): PasskeyError => {
  if (error instanceof Error) {
    if (error.name === "NotAllowedError") return { code: "cancelled", message: "User cancelled" };
    if (error.name === "AbortError") return { code: "cancelled", message: "Operation aborted" };
    if (error.name === "InvalidStateError") return { code: "invalid-argument", message: error.message };
  }
  return { code: "runtime-error", message: error instanceof Error ? error.message : fallbackMessage };
};

const parseCreationOptions = (json: Record<string, unknown>): ParseCreationResult => {
  try {
    const PubKey = getPubKey();
    if (!PubKey || typeof (PubKey as { parseCreationOptionsFromJSON?: (arg: Record<string, unknown>) => PublicKeyCredentialCreationOptions }).parseCreationOptionsFromJSON !== "function") {
      return { ok: false, code: "unsupported", message: "Passkey API not supported", options: undefined };
    }
    const options = (PubKey as { parseCreationOptionsFromJSON: (arg: Record<string, unknown>) => PublicKeyCredentialCreationOptions }).parseCreationOptionsFromJSON(json);
    return { ok: true, message: "OK", options };
  } catch (error) {
    return {
      ok: false,
      code: "invalid-argument",
      message: error instanceof Error ? error.message : "Failed to parse creation options",
      options: undefined,
      cause: error,
    };
  }
};

const parseRequestOptions = (json: Record<string, unknown>): ParseRequestResult => {
  try {
    const PubKey = getPubKey();
    if (!PubKey || typeof (PubKey as { parseRequestOptionsFromJSON?: (arg: Record<string, unknown>) => PublicKeyCredentialRequestOptions }).parseRequestOptionsFromJSON !== "function") {
      return { ok: false, code: "unsupported", message: "Passkey API not supported", options: undefined };
    }
    const options = (PubKey as { parseRequestOptionsFromJSON: (arg: Record<string, unknown>) => PublicKeyCredentialRequestOptions }).parseRequestOptionsFromJSON(json);
    return { ok: true, message: "OK", options };
  } catch (error) {
    return {
      ok: false,
      code: "invalid-argument",
      message: error instanceof Error ? error.message : "Failed to parse request options",
      options: undefined,
      cause: error,
    };
  }
};

const create = async (options: PublicKeyCredentialCreationOptions): Promise<PasskeyResult> => {
  try {
    if (!("PublicKeyCredential" in window) || !("credentials" in navigator)) {
      return { ok: false, code: "unsupported", message: "Passkey API not supported" };
    }
    const credential = (await navigator.credentials.create({
      publicKey: options,
      signal: getOrCreateSignal(),
    })) as PublicKeyCredential | null;
    if (!credential) {
      return { ok: false, code: "runtime-error", message: "Failed to create passkey" };
    }
    return { ok: true, message: "Passkey created", credential };
  } catch (error) {
    // InvalidStateError on create() means "this credential already exists" —
    // treated as success since the desired end state is reached.
    if (error instanceof Error && error.name === "InvalidStateError") {
      return { ok: true, message: "Passkey already exists" };
    }
    const { code, message } = passkeyError(error, "Failed to create passkey");
    return { ok: false, code, message, cause: error };
  }
};

const get = async (options: PublicKeyCredentialRequestOptions): Promise<PasskeyResult> => {
  try {
    if (!("PublicKeyCredential" in window) || !("credentials" in navigator)) {
      return { ok: false, code: "unsupported", message: "Passkey API not supported" };
    }
    const credential = (await navigator.credentials.get({
      publicKey: options,
      signal: getOrCreateSignal(),
    })) as PublicKeyCredential | null;
    if (!credential) {
      return { ok: false, code: "runtime-error", message: "Failed to authenticate" };
    }
    return { ok: true, message: "Authenticated", credential };
  } catch (error) {
    const { code, message } = passkeyError(error, "Failed to authenticate");
    return { ok: false, code, message, cause: error };
  }
};

const getConditional = async (options: PublicKeyCredentialRequestOptions): Promise<PasskeyResult> => {
  try {
    if (!("PublicKeyCredential" in window) || !("credentials" in navigator)) {
      return { ok: false, code: "unsupported", message: "Passkey API not supported" };
    }
    const credential = (await navigator.credentials.get({
      publicKey: options,
      mediation: "conditional",
      signal: getOrCreateSignal(),
    })) as PublicKeyCredential | null;
    if (!credential) {
      return { ok: false, code: "runtime-error", message: "Failed to authenticate" };
    }
    return { ok: true, message: "Authenticated", credential };
  } catch (error) {
    const { code, message } = passkeyError(error, "Failed to authenticate");
    return { ok: false, code, message, cause: error };
  }
};

const signalUnknown = async (
  rpId: string,
  credentialId: string,
): Promise<{ ok: boolean; message: string; code?: ErrorCode; cause?: unknown }> => {
  try {
    const PubKey = getPubKey();
    if (!PubKey || typeof (PubKey as { signalUnknownCredential?: (arg: { rpId: string; credentialId: string }) => Promise<void> }).signalUnknownCredential !== "function") {
      return { ok: false, code: "unsupported", message: "Signal API not supported" };
    }
    await (PubKey as { signalUnknownCredential: (arg: { rpId: string; credentialId: string }) => Promise<void> }).signalUnknownCredential({ rpId, credentialId });
    return { ok: true, message: "Signal sent" };
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to signal unknown credential",
      cause: error,
    };
  }
};

const abort = (): void => {
  if (passkeyAbortController) {
    passkeyAbortController.abort();
    passkeyAbortController = null;
  }
};

export const passkey = {
  parseCreationOptions,
  parseRequestOptions,
  create,
  get,
  getConditional,
  abort,
  signalUnknown,
  get signalUnknownCredential(): boolean {
    const PubKey = getPubKey();
    return typeof (PubKey as { signalUnknownCredential?: unknown })?.signalUnknownCredential === "function";
  },
};
