import { NextFunction, Request, Response } from "express";
import * as paymentService from '../services/payment';

export async function createPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await paymentService.createPayment(req.body);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updatePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = await paymentService.updatePayment(id, req.body);

    res.json(data);
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (errorMessage === "Not found") {
      return res.status(401).json({
        status: false,
        message: errorMessage,
      });
    }

    next(error);
  }
}

export async function getPaymentByOrderId(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderId } = req.params;
    const data = await paymentService.getPaymentByOrderId(orderId);
    res.json(data);
  } catch (error) {
    next(error);
  }
}