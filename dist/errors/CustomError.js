"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(type, errors, statusCode = 500) {
        super(type);
        this.type = type;
        this.errors = errors;
        this.statusCode = statusCode;
    }
}
exports.default = CustomError;
