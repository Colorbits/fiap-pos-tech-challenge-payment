import { createPayment, updatePayment, getPayment } from './index';
import { mockReset } from 'jest-mock-extended';
import prismaMock from '../../client';
import { PaymentDto } from '../../shared/models/payment.model';
import { PaymentMethodEnum, PaymentStatusEnum } from '../../shared/enums';

jest.mock('../../client', () => {
  const { mockDeep } = require('jest-mock-extended');
  return {
    __esModule: true,
    default: mockDeep(),
  };
});

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.requireActual('jest-mock-extended').mockDeep,
}));

beforeEach(() => {
  mockReset(prismaMock);
});

describe('createPayment', () => {
  it('should create a payment', async () => {
    const paymentDto: PaymentDto = {
      orderId: 1,
      status: PaymentStatusEnum.WAITING_PAYMENT,
      paymentMethod: PaymentMethodEnum.QR_CODE,
    };

    prismaMock.payment.create = jest.fn().mockResolvedValue({
      id: '1',
      orderId: 1,
      status: PaymentStatusEnum.WAITING_PAYMENT,
      paymentUrl: 'https://example.com/payment',
      paymentMethod: PaymentMethodEnum.QR_CODE,
    });

    const result = await createPayment(paymentDto);

    expect(prismaMock.payment.create).toHaveBeenCalledWith({
      data: expect.any(Object),
    });
    expect(result).toEqual(expect.objectContaining({
      id: '1',
      orderId: 1,
      status: PaymentStatusEnum.WAITING_PAYMENT,
      paymentUrl: expect.any(String),
      paymentMethod: PaymentMethodEnum.QR_CODE,
    }));
  });
});

describe('getPayment', () => {
  it('should return a payment by id', async () => {
    const id = '1';
    const payment = { 
      id: '1', 
      orderId: 1, 
      status: PaymentStatusEnum.WAITING_PAYMENT, 
      paymentUrl: 'https://example.com/payment', 
      paymentMethod: PaymentMethodEnum.QR_CODE 
    };

    prismaMock.payment.findFirst = jest.fn().mockResolvedValue(payment);

    const result = await getPayment(id);

    expect(prismaMock.payment.findFirst).toHaveBeenCalledWith({
      where: { id },
    });
    expect(result).toEqual(payment);
  });
});

describe('updatePayment', () => {
  it('should update a payment', async () => {
    const id = '1';
    const paymentDto: Partial<PaymentDto> = {
      status: PaymentStatusEnum.PAYMENT_APPROVED,
    };
    
    const existingPayment = {
      id: '1', 
      orderId: 1, 
      status: PaymentStatusEnum.WAITING_PAYMENT, 
      paymentUrl: 'https://example.com/payment', 
      paymentMethod: PaymentMethodEnum.QR_CODE,
      message: ''
    };
    
    const updatedPayment = { 
      id: '1', 
      orderId: 1, 
      status: PaymentStatusEnum.PAYMENT_APPROVED, 
      paymentUrl: 'https://example.com/payment', 
      paymentMethod: PaymentMethodEnum.QR_CODE,
      message: ''
    };

    // Mock findFirst para retornar um pagamento existente
    prismaMock.payment.findFirst = jest.fn().mockResolvedValue(existingPayment);
    
    // Mock update para retornar o pagamento atualizado
    prismaMock.payment.update = jest.fn().mockResolvedValue(updatedPayment);

    const result = await updatePayment(id, paymentDto as PaymentDto);

    expect(prismaMock.payment.findFirst).toHaveBeenCalledWith({
      where: { id },
    });
    
    expect(prismaMock.payment.update).toHaveBeenCalledWith({
      where: { id },
      data: expect.any(Object),
    });
    
    expect(result).toEqual(updatedPayment);
  });
});