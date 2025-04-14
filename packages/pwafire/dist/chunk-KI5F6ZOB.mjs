// src/pwa/payment/index.ts
var payment = async (paydata, validatePayment) => {
  try {
    const paymentRequest = new PaymentRequest(paydata.paymentMethods, paydata.paymentDetails);
    if (paymentRequest) {
      const canPay = await paymentRequest.canMakePayment();
      if (canPay) {
        const paymentResponse = await paymentRequest.show();
        validatePayment(paymentResponse);
        return { ok: true, message: "Payment" };
      } else {
        return { ok: false, message: "Payment method(s) not supported" };
      }
    } else {
      return { ok: false, message: "Payment Request API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  payment
};
