import { Router } from "express";
import paymentRoute from "./payment.route";

const indexRoute = Router();

indexRoute.get("", async (req, res) => {
  res.json({ message: "FIAP Post Tech Challenge: payment service" });
});

indexRoute.use("/payment", paymentRoute);

export default indexRoute;
