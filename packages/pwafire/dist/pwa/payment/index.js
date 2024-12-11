var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const PaymentApi = {
    Payment: (paydata, validatePayment) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const paymentRequest = new PaymentRequest(paydata.paymentMethods, paydata.paymentDetails);
            if (paymentRequest) {
                const canPay = yield paymentRequest.canMakePayment();
                if (canPay) {
                    const paymentResponse = yield paymentRequest.show();
                    validatePayment(paymentResponse);
                    return { ok: true, message: "Payment" };
                }
                else {
                    return { ok: false, message: "Payment method(s) not supported" };
                }
            }
            else {
                return { ok: false, message: "Payment Request API not supported" };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=index.js.map