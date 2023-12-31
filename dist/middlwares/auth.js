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
exports.authenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const authenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new CustomError_1.default('AuthenticationError', [{ resource: 'token', message: 'No token provided.' }], http_status_codes_1.default.UNAUTHORIZED);
        return res.status(http_status_codes_1.default.UNAUTHORIZED).json(error);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.decodedToken = decodedToken;
        next();
    }
    catch (error) {
        error = new CustomError_1.default('AuthenticationError', [{ resource: 'token', message: 'Invalid token.' }], http_status_codes_1.default.UNAUTHORIZED);
        return res.status(http_status_codes_1.default.UNAUTHORIZED).json(error);
    }
});
exports.authenticationMiddleware = authenticationMiddleware;
exports.default = {
    authenticationMiddleware: exports.authenticationMiddleware,
};
