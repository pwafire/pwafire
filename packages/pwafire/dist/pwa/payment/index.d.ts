declare const payment: (paydata: {
    paymentMethods: PaymentMethodData[];
    paymentDetails: PaymentDetailsInit;
    options: any;
}, validatePayment: (arg0: PaymentResponse) => void) => Promise<{
    ok: boolean;
    message: string;
}>;

export { payment };
