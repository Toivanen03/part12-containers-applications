"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        const errorMsg = [];
        error.errors.forEach((err) => {
            errorMsg.push(`• ${err.message}`);
        });
        res.status(400).send(errorMsg);
    }
    else {
        res.status(500).json({ error: 'Internal server error' });
    }
    next();
};
exports.errorMiddleware = errorMiddleware;
