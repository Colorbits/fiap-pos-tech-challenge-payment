import { PaymentStatusEnum, PaymentMethodEnum } from '../enums';

export type Payment = {
    id: string;
    orderId: number;
    paymentMethod: PaymentMethodEnum;
    status: PaymentStatusEnum;
}
