import prisma from "../../client";

export const getPayment = async (id: string) => {
  return prisma.payment.findFirst({
    where: {
      id,
    }
  });
}

export const getPaymentByOrderId = async (orderId: number) => {
  return prisma.payment.findMany({
    where: {
      orderId: Number(orderId),
    }
  });
}