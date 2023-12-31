"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function SignInValidator(payload) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email({ minDomainSegments: 2 }).required(),
        password: joi_1.default.string().min(6).required(),
    })
        .options({
        abortEarly: false,
    })
        .messages({
        'string.minDomainSegments': '{{#label}} must have at least two domain segments',
        'any.only': '{{#label}} must match the password',
    });
    const validationResult = schema.validate(payload);
    if (validationResult.error) {
        const errors = validationResult.error.details.map((err) => {
            var _a;
            return ({
                resource: ((_a = err.path) === null || _a === void 0 ? void 0 : _a.join('.')) || 'unknown',
                message: err.message,
            });
        });
        return { type: 'Validation Error', errors, statusCode: 400 };
    }
    const { email } = payload;
    return { statusCode: 200, data: { email } };
}
exports.default = SignInValidator;
