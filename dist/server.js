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
const app_1 = __importDefault(require("./app"));
const Routes_1 = __importDefault(require("./routes/Routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
dotenv_1.default.config();
const mong_uri = process.env.MONGO_URL;
const port = process.env.PORT;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!mong_uri) {
                process.exit(1);
            }
            yield mongoose_1.default
                .connect(mong_uri)
                .then(() => {
                if (process.env.NODE_ENV !== 'test') {
                    app_1.default.listen(port, () => {
                        console.log(`Server running on port: ${port}`);
                    });
                }
                app_1.default.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
                app_1.default.use('/', Routes_1.default);
            })
                .catch((err) => console.log(err));
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    });
}
exports.default = connect;
