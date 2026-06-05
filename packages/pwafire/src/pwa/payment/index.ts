import type { ErrorCode } from "../../types/result";

export type PaymentRequestInput = {
  methodData: PaymentMethodData[];
  details: PaymentDetailsInit;
  options?: PaymentOptions;
};

export const payment = async (
  input: PaymentRequestInput,
  onApprove: (response: PaymentResponse) => boolean | Promise<boolean>,
): Promise<{
  ok: boolean;
  message: string;
  methodName?: string;
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (typeof window.PaymentRequest === "undefined") {
      return { ok: false, code: "unsupported", message: "Payment Request API not supported" };
    }
    if (!window.isSecureContext) {
      return {
        ok: false,
        code: "insecure-context",
        message: "Payment Request API requires a secure context (HTTPS)",
      };
    }
    if (navigator.userActivation && !navigator.userActivation.isActive) {
      return { ok: false, code: "gesture-required", message: "User activation required" };
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
        void 0;
      }
      return {
        ok: false,
        code: "runtime-error",
        message: err instanceof Error ? err.message : "Failed to process payment",
        cause: err,
      };
    }

    try {
      await response.complete(approved ? "success" : "fail");
    } catch (err) {
      return {
        ok: false,
        code: "runtime-error",
        message: err instanceof Error ? err.message : "Failed to complete payment",
        methodName: response.methodName,
        cause: err,
      };
    }

    const methodName = response.methodName;
    if (!approved) {
      return {
        ok: false,
        code: "cancelled",
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
      return { ok: false, code: "cancelled", message: "Payment cancelled", cause: error };
    }
    if (error instanceof DOMException && error.name === "NotSupportedError") {
      return {
        ok: false,
        code: "unsupported",
        message:
          "Payment method not supported or no payment app available; install a payment handler or use another method",
        cause: error,
      };
    }
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to process payment",
      cause: error,
    };
  }
};
