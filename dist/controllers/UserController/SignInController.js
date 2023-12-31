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
const SignInService_1 = __importDefault(require("../../services/UserServices/SignInService"));
const CustomError_1 = __importDefault(require("../../errors/CustomError"));
class SignInController {
    static handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userLogin = req.body;
                const result = yield SignInService_1.default.execute(userLogin);
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
}
exports.default = SignInController;
