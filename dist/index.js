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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodbConnection_1 = require("./db/mongodbConnection");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('⚡️ Simulation Backend Server ⚡️');
});
app.use('/z1', userRoutes_1.default);
app.use((0, cookie_parser_1.default)());
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongodbConnection_1.connection;
        console.log(`mongodb is connected &`);
    }
    catch (err) {
        console.log(err);
    }
    console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
}));
