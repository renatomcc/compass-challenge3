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
const Event_1 = __importDefault(require("../../model/Event"));
class EventsRepository {
    static createEvent(event, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEvent = yield Event_1.default.create({
                description: event.description,
                dayOfWeek: event.dayOfWeek,
                userId: userId,
            });
            return newEvent;
        });
    }
    static getAllEventsByDay(dayOfWeek, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield Event_1.default.find({ dayOfWeek, userId });
            return events;
        });
    }
    static deleteEventsByDay(dayOfWeek, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventsToDelete = yield Event_1.default.find({ dayOfWeek, userId });
            yield Event_1.default.deleteMany({ dayOfWeek, userId });
            return eventsToDelete;
        });
    }
    static getEventById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield Event_1.default.findById(eventId);
            return event;
        });
    }
    static deleteEventById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventToDelete = yield Event_1.default.findById(eventId);
            yield Event_1.default.findByIdAndDelete(eventId);
            return eventToDelete;
        });
    }
}
exports.default = EventsRepository;
