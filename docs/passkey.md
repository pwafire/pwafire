# Passkey API

Implementation notes for the passkey module.

## API Surface

```typescript
passkey = {
  parseCreationOptions(json): { ok, message, options?: PublicKeyCredentialCreationOptions }
  parseRequestOptions(json): { ok, message, options?: PublicKeyCredentialRequestOptions }
  create(options: PublicKeyCredentialCreationOptions, signal?): Promise<PasskeyResult>
  get(options: PublicKeyCredentialRequestOptions, signal?): Promise<PasskeyResult>
  getConditional(options: PublicKeyCredentialRequestOptions, signal?): Promise<PasskeyResult>
  signalUnknown(rpId, credentialId): Promise<{ ok, message }>
  signalUnknownCredential: boolean
}
```

Types follow [PublicKeyCredentialCreationOptions](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialCreationOptions) and [PublicKeyCredentialRequestOptions](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialRequestOptions).

## User Verification Caution

When `userVerification` is set to `"preferred"` in your backend options, authenticators may skip the user verification check. This can happen when:

- The device lacks biometric sensors
- The user has not set up biometrics (no enrolled fingerprints)
- The sensor is temporarily unavailable (e.g. laptop with lid closed)

The **UV bit** in the authenticator data of the response indicates whether user verification was performed.

- If the UV bit is OFF and you require additional verification, prompt the user for a second factor (e.g. password)
- Alternatively, set `userVerification` to `"required"`, but be aware this may lead to a confusing user experience depending on the platform

For more details, see [userVerification deep dive](https://web.dev/articles/webauthn-user-verification).

## Request Already Pending

WebAuthn allows only one credential operation at a time. If you see "A request is already pending with passkeys", a previous `create`, `get`, or `getConditional` call is still in progress.

**Solution:** Use `AbortController` to cancel the previous request before starting a new one:

```typescript
let passkeyAbortController: AbortController | null = null;

const runCreate = async () => {
  if (passkeyAbortController) passkeyAbortController.abort();
  passkeyAbortController = new AbortController();
  const { ok, credential } = await passkey.create(options, passkeyAbortController.signal);
  // ...
};
```

When switching between passkey operations (e.g. from `getConditional` to `create`), abort the previous controller first. See [Create a passkey for passwordless logins](https://web.dev/articles/passkey-registration) for the full flow.
