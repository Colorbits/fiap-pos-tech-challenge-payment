"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentSchema = exports.createPaymentSchema = void 0;
const zod_1 = require("zod");
exports.createPaymentSchema = zod_1.z.object({
    orderId: zod_1.z.number(),
    status: zod_1.z.enum(["WAITING_PAYMENT", "PAYMENT_APPROVED", "PAYMENT_NOT_APPROVED"]),
    paymentMethod: zod_1.z.enum(["QR_CODE", "PIX", "CREDIT_CARD"]),
}).strict();
exports.updatePaymentSchema = exports.createPaymentSchema.partial();
