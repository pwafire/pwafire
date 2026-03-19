# Payment Request (`payment`)

PWAFire wraps the [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API) using the same flow described in [Using the Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API/Using_the_Payment_Request_API): construct `PaymentRequest`, call `show()`, process the `PaymentResponse`, then call `complete()`.

## What `payment()` does

1. Checks `PaymentRequest`, secure context, and (when available) user activation.
2. Creates `new PaymentRequest(methodData, details, options)`.
3. Awaits `show()` → `paymentResponse`.
4. Awaits `onApprove(paymentResponse)`; expects `true` (charge OK) or `false` (decline).
5. Calls `paymentResponse.complete("success")` or `complete("fail")` accordingly. Do **not** call `complete()` inside `onApprove`.

## Feature detection

MDN recommends checking `window.PaymentRequest`. PWAFire exposes the same via `check.payment` in `pwafire/check` (`typeof window.PaymentRequest !== "undefined"`).

## Secure context and user gesture

- The API requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (typically HTTPS). If `window.isSecureContext` is false, `payment()` returns `{ ok: false }`.
- `show()` should run from a user gesture. If [`navigator.userActivation`](https://developer.mozilla.org/en-US/docs/Web/API/UserActivation) exists and `isActive` is false, `payment()` returns `{ ok: false }`.

## One `PaymentRequest` per checkout

MDN states that **`show()` may be called only once per `PaymentRequest` instance**. Call `payment()` again for a new checkout so a fresh `PaymentRequest` is created each time.

## `canMakePayment()`

The MDN guide uses [`canMakePayment()`](https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest/canMakePayment) to customize UI (e.g. “fast checkout” vs “set up checkout”), to probe before prices are final, or to recover when the promise rejects (e.g. privacy settings). PWAFire does **not** call it inside `payment()` so you keep full control: run your own stub `PaymentRequest` + `canMakePayment()` when you need that, then call `payment()` with real `details` when the user checks out.

## Signature

```ts
import { payment } from "pwafire";

await payment(
  {
    methodData: [{ supportedMethods: "https://bobbucks.dev/pay" }],
    details: {
      id: "order-123",
      displayItems: [
        {
          label: "Original donation amount",
          amount: { currency: "USD", value: "65.00" }
        },
        {
          label: "Friends and family discount",
          amount: { currency: "USD", value: "-10.00" }
        }
      ],
      total: {
        label: "Donation",
        amount: { currency: "USD", value: "55.00" }
      }
    },
    options: {
      requestPayerName: true,
      requestPayerEmail: true
    }
  },
  async (paymentResponse) => {
    const charged = await postPaymentToServer(paymentResponse);
    return charged;
  }
);
```

The second argument is `onApprove`: return `true` after a successful charge so PWAFire calls `paymentResponse.complete("success")`; return `false` for `complete("fail")`. If `onApprove` throws, PWAFire completes with `"fail"` and returns `{ ok: false, message }`.

## Errors

- **`AbortError`** — user dismissed the sheet → `{ ok: false, message: "Payment cancelled" }`.
- **`NotSupportedError`** — no suitable payment handler (MDN suggests redirecting users to install an app) → a dedicated `{ ok: false, message }` explains that case.

## Payment method identifiers

Use valid [payment method identifiers](https://w3c.github.io/payment-method-id/) (often HTTPS URLs for payment handlers). For a **working demo** in Chromium, use `https://bobbucks.dev/pay` after installing [BobBucks](https://bobbucks.dev/) — the same shape as [Google’s Payment Handler sample](https://googlechrome.github.io/samples/paymentrequest/payment-handler/). Production apps use their own provider URLs.

## PWAFire test console

On [console.pwafire.org](https://console.pwafire.org) (HTTPS), run **Payment Request (BobBucks)** after installing BobBucks to exercise the full flow with the library.
