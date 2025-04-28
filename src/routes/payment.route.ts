import { Router } from "express";
import * as paymentRoutes from "../controllers/payment.controller";
import { validateSchema } from "../middlewares/validation.middleware";
import { createPaymentSchema, updatePaymentSchema } from "../schemas/payment.schema";

const userRoute = Router();

userRoute.post("", validateSchema(createPaymentSchema), paymentRoutes.createPayment);
userRoute.put("", validateSchema(updatePaymentSchema), paymentRoutes.updatePayment);
userRoute.get("/:orderId", paymentRoutes.getPayment);

export default userRoute;
