export type PaymentRequestInput = {
  methodData: PaymentMethodData[];
  details: PaymentDetailsInit;
  options?: PaymentOptions;
};

export const payment = async (
  input: PaymentRequestInput,
  onApprove: (response: PaymentResponse) => boolean | Promise<boolean>,
) => {
  try {
    if (typeof window.PaymentRequest === "undefined") {
      return { ok: false, message: "Payment Request API not supported" };
    }
    if (!window.isSecureContext) {
      return {
        ok: false,
        message: "Payment Request API requires a secure context (HTTPS)",
      };
    }
    if (navigator.userActivation && !navigator.userActivation.isActive) {
      return { ok: false, message: "User activation required" };
    }

    const request = new PaymentRequest(input.methodData, input.details, input.options);

    const response = await request.show();
    let approved = false;
    try {
      approved = await Promise.resolve(onApprove(response));
    } catch (err) {
      try {
        await response.complete("fail");
      } catch {
        /* ignore */
      }
      return {
        ok: false,
        message: err instanceof Error ? err.message : "Failed to process payment",
      };
    }

    try {
      await response.complete(approved ? "success" : "fail");
    } catch (err) {
      return {
        ok: false,
        message: err instanceof Error ? err.message : "Failed to complete payment",
        methodName: response.methodName,
      };
    }

    const methodName = response.methodName;
    if (!approved) {
      return {
        ok: false,
        message: "Payment was not completed",
        methodName,
      };
    }

    return {
      ok: true,
      message: "Payment completed",
      methodName,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, message: "Payment cancelled" };
    }
    if (error instanceof DOMException && error.name === "NotSupportedError") {
      return {
        ok: false,
        message:
          "Payment method not supported or no payment app available; install a payment handler or use another method",
      };
    }
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to process payment",
    };
  }
};
