"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/pwa/payment/index.ts
var payment_exports = {};
__export(payment_exports, {
  payment: () => payment
});
module.exports = __toCommonJS(payment_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  payment
});
