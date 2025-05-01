import prisma from "../client";

export const createPayment =  ({ data }) => {
  return prisma.payment.create({
    data,
  });

}