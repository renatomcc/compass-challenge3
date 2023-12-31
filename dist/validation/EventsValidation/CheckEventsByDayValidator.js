"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function CheckEventsByDayValidator(dayOfWeek) {
    const validDaysOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];
    const schema = joi_1.default.string()
        .valid(...validDaysOfWeek.map((day) => day.toLowerCase()))
        .required()
        .messages({
        'string.base': '{{#label}} must be a string',
        'any.only': '{{#label}} must be a valid day of the week',
        'any.required': '{{#label}} is required',
    });
    const validationResult = schema.validate(dayOfWeek.toLowerCase());
    if (validationResult.error) {
        const errors = validationResult.error.details.map((err) => ({
            resource: 'dayOfWeek',
            message: err.message,
        }));
        return { type: 'Validation error', errors, statusCode: 422 };
    }
    return { statusCode: 200 };
}
exports.default = CheckEventsByDayValidator;
