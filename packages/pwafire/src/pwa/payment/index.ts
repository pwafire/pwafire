export const PaymentApi = {
  Payment: async (
    paydata: {
      paymentMethods: PaymentMethodData[];
      paymentDetails: PaymentDetailsInit;
      options: any;
    },
    validatePayment: (arg0: PaymentResponse) => void,
  ) => {
    try {
      const paymentRequest = new PaymentRequest(paydata.paymentMethods, paydata.paymentDetails);
      if (paymentRequest) {
        const canPay = await paymentRequest.canMakePayment();
        if (canPay) {
          const paymentResponse = await paymentRequest.show();
          validatePayment(paymentResponse);
          return { message: "Payment" };
        } else {
          throw new Error("Cannot make payment, check payment methods");
        }
      } else {
        throw new Error("Payment Request API not supported");
      }
    } catch (error) {
      throw error;
    }
  },
};
