"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const User_1 = __importDefault(require("../../model/User"));
function SignUpValidator(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const birthDateLimit = new Date();
        birthDateLimit.setFullYear(birthDateLimit.getFullYear() - 150);
        const schema = joi_1.default.object({
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            birthDate: joi_1.default.date().max('now').min(birthDateLimit).required(),
            city: joi_1.default.string().required(),
            country: joi_1.default.string().required(),
            email: joi_1.default.string().email({ minDomainSegments: 2 }).required(),
            password: joi_1.default.string().min(6).required(),
            confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required(),
        })
            .options({
            abortEarly: false,
        })
            .messages({
            'date.base': '{{#label}} invalid date',
            'date.max': '{{#label}} date cannot be in the future',
            'date.min': '{{#label}} date is too old',
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
            return { type: 'Validation error', errors, statusCode: 422 };
        }
        const existingEmail = yield User_1.default.findOne({ email: payload.email });
        if (existingEmail) {
            const errors = [
                {
                    resource: 'email',
                    message: 'Email is already in use',
                },
            ];
            return { type: 'Validation error', errors, statusCode: 422 };
        }
        return { statusCode: 200 };
    });
}
exports.default = SignUpValidator;
