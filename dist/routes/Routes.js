"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SignUpController_1 = __importDefault(require("../controllers/UserController/SignUpController"));
const SignInController_1 = __importDefault(require("../controllers/UserController/SignInController"));
const EventsController_1 = __importDefault(require("../controllers/EventsController/EventsController"));
const auth_1 = require("../middlwares/auth");
const Routes = express_1.default.Router();
const prefix = '/api/v1';
Routes.post(`${prefix}/users/sign-up`, SignUpController_1.default.handle)
    .post(`${prefix}/users/sign-in`, SignInController_1.default.handle)
    .post(`${prefix}/events`, auth_1.authenticationMiddleware, EventsController_1.default.createEvent)
    .get(`${prefix}/events`, auth_1.authenticationMiddleware, EventsController_1.default.getAllEventsByDay)
    .delete(`${prefix}/events`, auth_1.authenticationMiddleware, EventsController_1.default.deleteEventsByDay)
    .get(`${prefix}/events/:id`, auth_1.authenticationMiddleware, EventsController_1.default.getEventById)
    .delete(`${prefix}/events/:id`, auth_1.authenticationMiddleware, EventsController_1.default.deleteEventsById);
exports.default = Routes;
