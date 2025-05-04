import prisma from "../../client";
import { PaymentDto } from '../../shared/models/payment.model';

export const getPayment = async (orderId: PaymentDto['id']) => {
  return prisma.payment.findMany({
    where: {
      orderId: Number(orderId),
    }
  });
}