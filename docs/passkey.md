# Passkey API

Implementation notes for the passkey module.

## API Surface

```typescript
passkey = {
  parseCreationOptions(json): { ok, message, options?: PublicKeyCredentialCreationOptions }
  parseRequestOptions(json): { ok, message, options?: PublicKeyCredentialRequestOptions }
  create(options: PublicKeyCredentialCreationOptions): Promise<PasskeyResult>
  get(options: PublicKeyCredentialRequestOptions): Promise<PasskeyResult>
  getConditional(options: PublicKeyCredentialRequestOptions): Promise<PasskeyResult>
  abort(): void
  signalUnknown(rpId, credentialId): Promise<{ ok, message }>
  signalUnknownCredential: boolean
}
```

Abort handling is internal: each create/get/getConditional aborts any pending request before starting. Use `passkey.abort()` to cancel manually (e.g. on form submit).

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

WebAuthn allows only one credential operation at a time. The passkey API handles this internally: each `create`, `get`, or `getConditional` aborts any pending request before starting.

To cancel manually (e.g. when the user submits a form with a password instead of passkey):

```typescript
form.addEventListener("submit", () => passkey.abort());
```
