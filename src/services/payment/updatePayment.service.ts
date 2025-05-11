import prisma from "../../client";
import { Payment, PaymentDto } from '../../shared/models/payment.model';

export const updatePayment = async (id: string, paymentDto: PaymentDto) => {
  const foundPayment = await prisma.payment.findFirst({
    where: {
      id,
    },
  });

  if (!foundPayment) {
    throw new Error("Not found");
  }

  const { id: foundPaymentId, ...foundPaymentData } = foundPayment;
  const { id: paymentId, ...payment } = new Payment(paymentDto);
  const data = { ...foundPaymentData, ...payment }

  return prisma.payment.update({
    where: {
      id,
    },
    data,
  });
}