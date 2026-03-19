export const PAYMENT_HANDLER_DEMO_URL = "https://bobbucks.dev/pay";

export const PAYMENT_APIS_DOC_HREF =
  "https://github.com/pwafire/pwafire/blob/main/docs/apis/payment.md";

export const paymentHandlerSampleBody = `${JSON.stringify(
  {
    methodName: PAYMENT_HANDLER_DEMO_URL,
    details: { token: "1234567890" }
  },
  null,
  2
)}\n\nIllustrative PaymentResponse shape for https://bobbucks.dev/pay (Chrome Payment Handler sample). Token is demo data.`;
