import prisma from "../../client";
import { Payment, PaymentDto } from '../../shared/models/payment.model';

export const updatePayment = async (paymentDto: PaymentDto) => {
  const { orderId } = paymentDto;
  const foundPayment = await prisma.payment.findFirst({
    where: {
      orderId: Number(orderId),
    },
  });

  if (!foundPayment) {
    throw new Error("Not found");
  }

  const payment = new Payment(paymentDto);
  
  return prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: payment,
  });
}