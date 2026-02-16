import { passkey } from "./index";
import * as check from "../../check";

describe("passkey", () => {
  const mockParseCreationOptions = jest.fn();
  const mockParseRequestOptions = jest.fn();
  const mockSignalUnknownCredential = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when PublicKeyCredential is not available", () => {
    beforeEach(() => {
      delete (window as unknown as { PublicKeyCredential?: unknown }).PublicKeyCredential;
    });

    it("check.passkey returns false", () => {
      expect(check.passkey()).toBe(false);
    });

    it("parseCreationOptions returns not supported", () => {
      const result = passkey.parseCreationOptions({ challenge: "test" });
      expect(result.ok).toBe(false);
      expect(result.message).toBe("Passkey API not supported");
      expect(result.options).toBeUndefined();
    });

    it("parseRequestOptions returns not supported", () => {
      const result = passkey.parseRequestOptions({ challenge: "test" });
      expect(result.ok).toBe(false);
      expect(result.message).toBe("Passkey API not supported");
      expect(result.options).toBeUndefined();
    });

    it("create returns not supported", async () => {
      const result = await passkey.create({} as PublicKeyCredentialCreationOptions);
      expect(result.ok).toBe(false);
      expect(result.message).toBe("Passkey API not supported");
    });

    it("signalUnknown returns not supported", async () => {
      const result = await passkey.signalUnknown("example.com", "cred-id");
      expect(result.ok).toBe(false);
      expect(result.message).toBe("Signal API not supported");
    });
  });

  describe("when PublicKeyCredential is available", () => {
    beforeEach(() => {
      (window as unknown as { PublicKeyCredential: unknown }).PublicKeyCredential = {
        parseCreationOptionsFromJSON: mockParseCreationOptions,
        parseRequestOptionsFromJSON: mockParseRequestOptions,
        signalUnknownCredential: mockSignalUnknownCredential,
      };
      Object.defineProperty(navigator, "credentials", {
        configurable: true,
        value: {
          create: jest.fn(),
          get: jest.fn(),
        },
      });
    });

    it("check.passkey returns true", () => {
      expect(check.passkey()).toBe(true);
    });

    it("parseCreationOptions returns parsed options when successful", () => {
      const mockOptions = { challenge: new ArrayBuffer(32) };
      mockParseCreationOptions.mockReturnValue(mockOptions);

      const result = passkey.parseCreationOptions({ challenge: "base64" });

      expect(result.ok).toBe(true);
      expect(result.message).toBe("OK");
      expect(result.options).toBe(mockOptions);
      expect(mockParseCreationOptions).toHaveBeenCalledWith({ challenge: "base64" });
    });

    it("parseCreationOptions returns error when parse throws", () => {
      mockParseCreationOptions.mockImplementation(() => {
        throw new Error("Invalid JSON");
      });

      const result = passkey.parseCreationOptions({});

      expect(result.ok).toBe(false);
      expect(result.message).toBe("Invalid JSON");
      expect(result.options).toBeUndefined();
    });

    it("parseRequestOptions returns parsed options when successful", () => {
      const mockOptions = { challenge: new ArrayBuffer(32) };
      mockParseRequestOptions.mockReturnValue(mockOptions);

      const result = passkey.parseRequestOptions({ challenge: "base64" });

      expect(result.ok).toBe(true);
      expect(result.message).toBe("OK");
      expect(result.options).toBe(mockOptions);
      expect(mockParseRequestOptions).toHaveBeenCalledWith({ challenge: "base64" });
    });

    it("create returns User cancelled on NotAllowedError", async () => {
      (navigator.credentials.create as jest.Mock).mockRejectedValue(
        Object.assign(new Error("User cancelled"), { name: "NotAllowedError" })
      );

      const result = await passkey.create({} as PublicKeyCredentialCreationOptions);

      expect(result.ok).toBe(false);
      expect(result.message).toBe("User cancelled");
    });

    it("create returns success on InvalidStateError (passkey already exists)", async () => {
      (navigator.credentials.create as jest.Mock).mockRejectedValue(
        Object.assign(new Error("Already exists"), { name: "InvalidStateError" })
      );

      const result = await passkey.create({} as PublicKeyCredentialCreationOptions);

      expect(result.ok).toBe(true);
      expect(result.message).toBe("Passkey already exists");
    });

    it("create returns Operation aborted on AbortError", async () => {
      (navigator.credentials.create as jest.Mock).mockRejectedValue(
        Object.assign(new Error("Aborted"), { name: "AbortError" })
      );

      const result = await passkey.create({} as PublicKeyCredentialCreationOptions);

      expect(result.ok).toBe(false);
      expect(result.message).toBe("Operation aborted");
    });

    it("get returns User cancelled on NotAllowedError", async () => {
      (navigator.credentials.get as jest.Mock).mockRejectedValue(
        Object.assign(new Error("User cancelled"), { name: "NotAllowedError" })
      );

      const result = await passkey.get({} as PublicKeyCredentialRequestOptions);

      expect(result.ok).toBe(false);
      expect(result.message).toBe("User cancelled");
    });

    it("signalUnknown succeeds when API is available", async () => {
      mockSignalUnknownCredential.mockResolvedValue(undefined);

      const result = await passkey.signalUnknown("example.com", "cred-123");

      expect(result.ok).toBe(true);
      expect(result.message).toBe("Signal sent");
      expect(mockSignalUnknownCredential).toHaveBeenCalledWith({
        rpId: "example.com",
        credentialId: "cred-123",
      });
    });

    it("signalUnknownCredential getter returns true when API available", () => {
      expect(passkey.signalUnknownCredential).toBe(true);
    });
  });

  describe("signalUnknownCredential getter when signal API not available", () => {
    beforeEach(() => {
      (window as unknown as { PublicKeyCredential: unknown }).PublicKeyCredential = {
        parseCreationOptionsFromJSON: mockParseCreationOptions,
        parseRequestOptionsFromJSON: mockParseRequestOptions,
      };
    });

    it("returns false", () => {
      expect(passkey.signalUnknownCredential).toBe(false);
    });
  });
});
