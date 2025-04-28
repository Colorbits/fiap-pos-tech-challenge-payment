"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use((error, _req, res, _next) => {
    res.status(501).json({
        status: false,
        message: "An error occurred",
        error,
    });
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
