import prisma from "../../client";
import { PaymentDto } from '../../shared/models/payment.model';

export const getPayment = async (orderId: PaymentDto['id']) => {
  return prisma.payment.findFirst({
    where: {
      orderId: Number(orderId),
    },
  });
}