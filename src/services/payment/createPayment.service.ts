import prisma from "../../client";
import { PaymentMethodEnum } from '../../shared/enums';
import { Payment, PaymentDto } from '../../shared/models/payment.model';
import * as mercadoPagoService from '../mercadoPago/mercadoPago.service';

export const createPayment = (paymentDto: PaymentDto) => {
  if (paymentDto.paymentMethod === PaymentMethodEnum.CREDIT_CARD) {
    throw new Error('Method not implemented');
  }

  if (paymentDto.paymentMethod === PaymentMethodEnum.PIX) {
    throw new Error('Method not implemented');
  }

  if (paymentDto.paymentMethod === PaymentMethodEnum.QR_CODE) {
    try {
      const paymentUrl = mercadoPagoService.generateQrCodePaymentUrl(paymentDto);
      const {id, ...payment} = new Payment(paymentDto, paymentUrl)

      return prisma.payment.create({
        data: payment,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      throw new Error(
        `An error occurred while creating qr code and saving the order ${JSON.stringify(paymentDto)}: ${errorMessage}`
      );
    }
  }
}
