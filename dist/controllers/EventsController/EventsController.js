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
const EventsServices_1 = __importDefault(require("../../services/EventsServices/EventsServices"));
const CustomError_1 = __importDefault(require("../../errors/CustomError"));
class EventsController {
    static createEvent(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newEvent = req.body;
                const token = String((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
                const result = yield EventsServices_1.default.createEvent(newEvent, token);
                return res.status(200).json(result);
            }
            catch (err) {
                if (err instanceof CustomError_1.default) {
                    return res
                        .status(err.statusCode)
                        .json({ type: err.type, errors: err.errors });
                }
                else {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    static getAllEventsByDay(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dayOfWeek = String(req.query.dayOfWeek);
                const token = String((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
                const events = yield EventsServices_1.default.getAllEventsByDay(dayOfWeek, token);
                return res.status(200).json(events);
            }
            catch (err) {
                if (err instanceof CustomError_1.default) {
                    return res
                        .status(err.statusCode)
                        .json({ type: err.type, errors: err.errors });
                }
                else {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    static deleteEventsByDay(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dayOfWeek = String(req.query.dayOfWeek);
                const token = String((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
                const events = yield EventsServices_1.default.deleteEventsByDay(dayOfWeek, token);
                return res.status(200).json({ deletedEvents: events });
            }
            catch (err) {
                if (err instanceof CustomError_1.default) {
                    return res
                        .status(err.statusCode)
                        .json({ type: err.type, errors: err.errors });
                }
                else {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    static getEventById(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = req.params.id;
                const token = String((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
                const event = yield EventsServices_1.default.getEventById(eventId, token);
                return res.status(200).json(event);
            }
            catch (err) {
                if (err instanceof CustomError_1.default) {
                    return res
                        .status(err.statusCode)
                        .json({ type: err.type, errors: err.errors });
                }
                else {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
    static deleteEventsById(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = req.params.id;
                const token = String((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
                const event = yield EventsServices_1.default.deleteEventById(eventId, token);
                return res.status(204).json(event);
            }
            catch (err) {
                if (err instanceof CustomError_1.default) {
                    return res
                        .status(err.statusCode)
                        .json({ type: err.type, errors: err.errors });
                }
                else {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    }
}
exports.default = EventsController;
