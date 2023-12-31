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
const CustomError_1 = __importDefault(require("../../errors/CustomError"));
const EventsRepository_1 = __importDefault(require("../../respositories/EventsRepositories/EventsRepository"));
const CreateEventValidator_1 = __importDefault(require("../../validation/EventsValidation/CreateEventValidator"));
const CheckEventsByDayValidator_1 = __importDefault(require("../../validation/EventsValidation/CheckEventsByDayValidator"));
const CheckEventByIdValidator_1 = __importDefault(require("../../validation/EventsValidation/CheckEventByIdValidator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class EventsServices {
    static createEvent(payload, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResponse = (0, CreateEventValidator_1.default)(payload);
            if (validationResponse.statusCode !== 200) {
                throw new CustomError_1.default(validationResponse.type || 'ValidationError', validationResponse.errors, validationResponse.statusCode);
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            const newEvent = yield EventsRepository_1.default.createEvent(payload, decodedToken.userId);
            const formattedResult = {
                _id: newEvent._id,
                description: newEvent.description,
                dayOfWeek: newEvent.dayOfWeek,
                userId: newEvent.userId,
            };
            return formattedResult;
        });
    }
    static getAllEventsByDay(payload, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResponse = (0, CheckEventsByDayValidator_1.default)(payload);
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            const userId = decodedToken.userId;
            if (validationResponse.statusCode !== 200) {
                throw new CustomError_1.default(validationResponse.type || 'ValidationError', validationResponse.errors, validationResponse.statusCode);
            }
            const events = yield EventsRepository_1.default.getAllEventsByDay(payload, userId);
            if (!events.length) {
                throw new CustomError_1.default('Not Found', [
                    {
                        resource: 'dayOfWeek',
                        message: 'No events found on this day',
                    },
                ], 404);
            }
            return events;
        });
    }
    static deleteEventsByDay(payload, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResponse = (0, CheckEventsByDayValidator_1.default)(payload);
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            const userId = decodedToken.userId;
            if (validationResponse.statusCode !== 200) {
                throw new CustomError_1.default(validationResponse.type || 'ValidationError', validationResponse.errors, validationResponse.statusCode);
            }
            const deletedEvents = yield EventsRepository_1.default.deleteEventsByDay(payload, userId);
            return deletedEvents;
        });
    }
    static getEventById(payload, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResponse = yield (0, CheckEventByIdValidator_1.default)(payload);
            if (validationResponse.statusCode !== 200) {
                throw new CustomError_1.default(validationResponse.type || 'ValidationError', validationResponse.errors, validationResponse.statusCode);
            }
            return yield EventsRepository_1.default.getEventById(payload);
        });
    }
    static deleteEventById(payload, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResponse = yield (0, CheckEventByIdValidator_1.default)(payload);
            if (validationResponse.statusCode !== 200) {
                throw new CustomError_1.default(validationResponse.type || 'ValidationError', validationResponse.errors, validationResponse.statusCode);
            }
            return yield EventsRepository_1.default.deleteEventById(payload);
        });
    }
}
exports.default = EventsServices;
