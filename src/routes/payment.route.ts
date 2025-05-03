import { Router } from "express";
import * as paymentRoutes from "../controllers/payment.controller";
import { validateSchema } from "../middlewares/validation.middleware";
import { createPaymentSchema, updatePaymentSchema } from "../schemas/payment.schema";

const paymentRoute = Router();

paymentRoute.post("", validateSchema(createPaymentSchema), paymentRoutes.createPayment);
paymentRoute.put("", validateSchema(updatePaymentSchema), paymentRoutes.updatePayment);
paymentRoute.get("/:orderId", paymentRoutes.getPayment);

export default paymentRoute;
