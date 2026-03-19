# Payment Request (`payment`)

Wraps the [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API). Takes an `input` object whose `methodData`, `details`, and `options` fields correspond to the arguments of `new PaymentRequest(methodData, details, options)`, plus an `onApprove` callback.

## API Surface

```typescript
payment(
  input: {
    methodData: PaymentMethodData[];
    details: PaymentDetailsInit;
    options?: PaymentOptions;
  },
  onApprove: (response: PaymentResponse) => boolean | Promise<boolean>
): Promise<{ ok: boolean; message: string; methodName?: string }>;
```

## Usage

**Check:** `check.payment()` — `true` if `PaymentRequest` exists (not whether a given method works).

Needs **HTTPS** and usually a **user gesture** (e.g. click) before `show()`.

After `show()`, **`onApprove`** runs with the `PaymentResponse`. Post to your server there; return **`true`** or **`false`**. PWAFire calls **`complete("success")`** or **`complete("fail")`** — do not call `complete()` yourself.

Use **one `payment()` per checkout**. For **`canMakePayment()`**, use your own `PaymentRequest` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API/Using_the_Payment_Request_API)).

## `methodData`

Each entry needs **`supportedMethods`**: a [payment method identifier](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API/Concepts#payment_method_identifiers) (often an `https://` URL for a handler or wallet). Anything else for that method goes in **`data`** per the provider spec.

## Example

```html
<button id="pay" type="button">Pay</button>
<p id="status" aria-live="polite"></p>
```

```ts
import { payment } from "pwafire";
import * as check from "pwafire/check";

const methodUrl = "https://your-payment-handler.example/pay";

async function postPaymentToServer(
  paymentResponse: PaymentResponse
): Promise<boolean> {
  const res = await fetch("/api/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      methodName: paymentResponse.methodName,
      details: paymentResponse.details,
      payerName: paymentResponse.payerName,
      payerEmail: paymentResponse.payerEmail
    })
  });
  return res.ok;
}

document.getElementById("pay")?.addEventListener("click", async () => {
  const status = document.getElementById("status");
  if (!status) return;

  if (!check.payment()) {
    status.textContent = "Payment Request not supported";
    return;
  }

  status.textContent = "Opening payment sheet…";

  const { ok, message, methodName } = await payment(
    {
      methodData: [{ supportedMethods: methodUrl }],
      details: {
        id: "cart-1",
        displayItems: [
          { label: "Subtotal", amount: { currency: "USD", value: "60.00" } },
          { label: "Shipping", amount: { currency: "USD", value: "5.00" } }
        ],
        total: { label: "Total", amount: { currency: "USD", value: "65.00" } }
      },
      options: {
        requestPayerName: true,
        requestPayerEmail: true
      }
    },
    postPaymentToServer
  );

  status.textContent = ok
    ? `${message}${methodName ? ` — ${methodName}` : ""}`
    : message;
});
```

## Notes

- User dismisses the sheet or no payment app matches → `{ ok: false, message }`
- [Google Payment Handler sample](https://googlechrome.github.io/samples/paymentrequest/payment-handler/) — install the demo payment app so **`https://bobbucks.dev/pay`** works; demo `details` only, not production
- Live tryout: [console.pwafire.org](https://console.pwafire.org) → **💳 Payment** — same handler URL; `onApprove` logs the response and returns success (no backend)

## See also

- [MDN: Using the Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API/Using_the_Payment_Request_API)
