"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => {
    const { success, error } = schema.safeParse(req.body);
    if (!success) {
        return res.status(401).json({
            status: false,
            message: error.errors.map(t => { var _a; return `${(_a = t.path[0]) !== null && _a !== void 0 ? _a : ''}: ${t.message}`; }).join(', ')
        });
    }
    next();
};
exports.validateSchema = validateSchema;
