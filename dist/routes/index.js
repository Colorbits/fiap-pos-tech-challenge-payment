"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_route_1 = __importDefault(require("./payment.route"));
const indexRoute = (0, express_1.Router)();
indexRoute.get("", async (req, res) => {
    res.json({ message: "FIAP Post Tech Challenge: payment service" });
});
indexRoute.use("/payments", payment_route_1.default);
exports.default = indexRoute;
