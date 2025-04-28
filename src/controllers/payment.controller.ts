import { NextFunction, Request, Response } from "express";
import prisma from "../client";

export async function createPayment(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.body);
    const data = await prisma.payment.create({
      data: req.body,
    });

    res.status(201).json({
      status: true,
      message: "Successfully Created",
      data,
    });
  } catch (error) {
    next(error);
  }
}


export async function updatePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderId } = req.body;

    const payment = await prisma.payment.findFirst({
      where: {
        orderId: Number(orderId),
      },
    });

    if (!payment) {
      return res.status(401).json({
        status: false,
        message: "Not found",
      });
    }

    const data = await prisma.payment.update({
      where: {
        id:  payment.id,
      },
      data: req.body,
    });

    res.json({
      status: true,
      message: "Successfully updated",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderId } = req.params;
    const data = await prisma.payment.findFirst({
      where: {
        orderId: Number(orderId),
      },
    });

    res.json({
      status: true,
      message: "Successfully fetched",
      data,
    });
  } catch (error) {
    next(error);
  }
}