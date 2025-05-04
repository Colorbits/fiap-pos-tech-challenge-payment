import { PaymentStatusEnum, PaymentMethodEnum } from '../enums';

export interface PaymentDto {
    id?: string;
    orderId: number;
    paymentMethod: PaymentMethodEnum;
    status: PaymentStatusEnum;
    message?: string;
}

export interface PaymentResponseDto {
    id?: string;
    orderId: number;
    paymentMethod: PaymentMethodEnum;
    status: PaymentStatusEnum;
    paymentUrl?: string;
    message?: string;
}

export class Payment {
    id?: string;
    orderId: number;
    paymentUrl: string;
    status: PaymentStatusEnum;
    message: string;
    paymentMethod: PaymentMethodEnum;

    constructor(paymentDto: PaymentDto, paymentUrl?: string) {
        this.id = paymentDto?.id;
        this.orderId = paymentDto.orderId;
        this.paymentMethod = paymentDto.paymentMethod;
        this.status = paymentDto.status;
        this.paymentUrl = paymentUrl || "";
        this.message = paymentDto.message || "";
    }
}