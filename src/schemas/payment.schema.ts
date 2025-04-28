import { z } from "zod";

export const createPaymentSchema = z.object({
  orderId: z.number(),
  status: z.enum(["WAITING_PAYMENT", "PAYMENT_APPROVED", "PAYMENT_NOT_APPROVED"]),
  paymentMethod: z.enum(["QR_CODE", "PIX", "CREDIT_CARD"]),
}).strict();

export const updatePaymentSchema = createPaymentSchema.partial();
