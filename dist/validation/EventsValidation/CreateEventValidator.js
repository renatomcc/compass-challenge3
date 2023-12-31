"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function CreateEventValidator(payload) {
    var _a;
    const validDaysOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];
    const schema = joi_1.default.object({
        description: joi_1.default.string().required().messages({
            'string.base': '{{#label}} must be a string',
            'any.required': '{{#label}} is required',
        }),
        dayOfWeek: joi_1.default.string()
            .valid(...validDaysOfWeek.map((day) => day.toLowerCase()))
            .required()
            .messages({
            'string.base': '{{#label}} must be a string',
            'any.only': '{{#label}} must be a valid day of the week',
            'any.required': '{{#label}} is required',
        }),
    }).options({
        abortEarly: false,
    });
    const validationResult = schema.validate(Object.assign(Object.assign({}, payload), { dayOfWeek: (_a = payload.dayOfWeek) === null || _a === void 0 ? void 0 : _a.toLowerCase() }));
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
    return { statusCode: 200 };
}
exports.default = CreateEventValidator;
