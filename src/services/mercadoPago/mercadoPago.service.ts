import { PaymentDto } from '../../shared/models/payment.model';

export const generateQrCodePaymentUrl = (paymentDto: PaymentDto) => {
  const qrCodeUrl = `https://example.com/qr-code/${paymentDto.id}`;
  return qrCodeUrl;
}