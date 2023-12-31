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
const mongoose_1 = __importDefault(require("mongoose"));
const Event_1 = __importDefault(require("../../model/Event"));
function CheckEventByIdValidator(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(payload)) {
            const invalidIdError = {
                resource: 'id',
                message: 'Invalid ObjectId',
            };
            return {
                type: 'Validation error',
                errors: [invalidIdError],
                statusCode: 422,
            };
        }
        const event = yield Event_1.default.findById(payload);
        if (!event) {
            const notFoundError = {
                resource: 'id',
                message: 'Event not found',
            };
            return {
                type: 'Validation error',
                errors: [notFoundError],
                statusCode: 404,
            };
        }
        return { statusCode: 200 };
    });
}
exports.default = CheckEventByIdValidator;
