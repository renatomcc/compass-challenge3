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
const SignInRepository_1 = __importDefault(require("../../respositories/UserRespositories/SignInRepository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const CustomError_1 = __importDefault(require("../../errors/CustomError"));
const SignInValidator_1 = __importDefault(require("../../validation/UserValidation/SignInValidator"));
class SignInService {
    static execute(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResponse = (0, SignInValidator_1.default)(payload);
            if (validationResponse.statusCode !== 200) {
                throw new CustomError_1.default(validationResponse.type || 'ValidationError', validationResponse.errors, validationResponse.statusCode);
            }
            const existingUser = yield SignInRepository_1.default.login(payload);
            if (!existingUser) {
                throw new CustomError_1.default('UserNotFound', [
                    {
                        resource: 'email',
                        message: 'User with this email does not exist',
                    },
                ], 404);
            }
            const validPassword = yield bcrypt_1.default.compare(payload.password, existingUser.password);
            if (!validPassword) {
                throw new CustomError_1.default('InvalidCredentials', [
                    {
                        resource: 'password',
                        message: 'Invalid password',
                    },
                ], 401);
            }
            try {
                const token = jsonwebtoken_1.default.sign({ userId: existingUser._id }, process.env.SECRET);
                const result = {
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    email: payload.email,
                    token: token,
                };
                return result;
            }
            catch (error) {
                throw new CustomError_1.default('AuthenticationError', [
                    {
                        resource: 'token',
                        message: 'error generating the token',
                    },
                ], 500);
            }
        });
    }
}
exports.default = SignInService;
