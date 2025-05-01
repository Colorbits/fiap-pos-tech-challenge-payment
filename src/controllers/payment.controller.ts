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
    const data = await paymentService.updatePayment(req.body);

    res.json(data);
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (errorMessage === "Not found") {
      res.status(401).json({
        status: false,
        message: "Not found",
      });
    }

    next(error);
  }
}

export async function getPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderId } = req.params;
    const data = await paymentService.getPayment(orderId);

    res.json(data);
  } catch (error) {
    next(error);
  }
}