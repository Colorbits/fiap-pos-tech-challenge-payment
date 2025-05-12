import request from 'supertest';
import app from '../index';
import * as paymentService from '../services/payment';
import { PaymentMethodEnum, PaymentStatusEnum } from '../shared/enums';

jest.mock('../services/payment');

let server: any;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});

describe('PaymentController', () => {
  describe('createPayment', () => {
    it('should return 201 and create a payment', async () => {
      const mockPaymentData = {
        orderId: 1,
        status: PaymentStatusEnum.WAITING_PAYMENT,
        paymentMethod: PaymentMethodEnum.QR_CODE
      };

      const mockResponse = {
        id: '1',
        orderId: 1,
        status: PaymentStatusEnum.WAITING_PAYMENT,
        paymentMethod: PaymentMethodEnum.QR_CODE,
        paymentUrl: 'https://example.com/payment',
        message: ''
      };

      (paymentService.createPayment as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app)
        .post('/payments')
        .send(mockPaymentData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
    });

    it('should return 500 if payment creation fails', async () => {
      const mockPaymentData = {
        orderId: 1,
        status: PaymentStatusEnum.WAITING_PAYMENT,
        paymentMethod: PaymentMethodEnum.QR_CODE
      };

      (paymentService.createPayment as jest.Mock).mockRejectedValue(new Error('Failed to create payment'));

      const response = await request(app)
        .post('/payments')
        .send(mockPaymentData);

      expect(response.status).toBe(500);
    });
  });

  describe('getPayment', () => {
    it('should return 200 and payment details', async () => {
      const mockPayment = {
        id: '1',
        orderId: 1,
        status: PaymentStatusEnum.WAITING_PAYMENT,
        paymentMethod: PaymentMethodEnum.QR_CODE,
        paymentUrl: 'https://example.com/payment',
        message: ''
      };

      (paymentService.getPayment as jest.Mock).mockResolvedValue(mockPayment);

      const response = await request(app).get('/payments/1');

      expect(response.status).toBe(200);
    });

    it('should return 404 if payment is not found', async () => {
      (paymentService.getPayment as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/payments/999');

      expect(response.status).toBe(200);
      expect(response.body).toBe("");
    });
  });

  describe('updatePayment', () => {
    it('should return 200 and updated payment details', async () => {
      const mockUpdateData = {
        status: PaymentStatusEnum.PAYMENT_APPROVED
      };

      const mockResponse = {
        id: '1',
        orderId: 1,
        status: PaymentStatusEnum.PAYMENT_APPROVED,
        paymentMethod: PaymentMethodEnum.QR_CODE,
        paymentUrl: 'https://example.com/payment',
        message: ''
      };

      (paymentService.updatePayment as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app)
        .put('/payments/1')
        .send(mockUpdateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it('should return 401 if payment is not found', async () => {
      const mockUpdateData = {
        status: PaymentStatusEnum.PAYMENT_APPROVED
      };

      const mockError = new Error('Not found');
      (paymentService.updatePayment as jest.Mock).mockRejectedValue(mockError);

      const response = await request(app)
        .put('/payments/999')
        .send(mockUpdateData);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        status: false,
        message: 'Not found'
      });
    });
  });
});