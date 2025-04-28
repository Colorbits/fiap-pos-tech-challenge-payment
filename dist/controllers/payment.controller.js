"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = createPayment;
exports.updatePayment = updatePayment;
exports.getPayment = getPayment;
const client_1 = __importDefault(require("../client"));
async function createPayment(req, res, next) {
    try {
        console.log(req.body);
        const data = await client_1.default.payment.create({
            data: req.body,
        });
        res.status(201).json({
            status: true,
            message: "Successfully Created",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}
async function updatePayment(req, res, next) {
    try {
        const { orderId } = req.body;
        const payment = await client_1.default.payment.findFirst({
            where: {
                orderId: Number(orderId),
            },
        });
        if (!payment) {
            return res.status(401).json({
                status: false,
                message: "Not found",
            });
        }
        const data = await client_1.default.payment.update({
            where: {
                id: payment.id,
            },
            data: req.body,
        });
        res.json({
            status: true,
            message: "Successfully updated",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getPayment(req, res, next) {
    try {
        const { orderId } = req.params;
        const data = await client_1.default.payment.findFirst({
            where: {
                orderId: Number(orderId),
            },
        });
        res.json({
            status: true,
            message: "Successfully fetched",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}
