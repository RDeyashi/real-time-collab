"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const dotenvResult = dotenv_1.default.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
const port = process.env.PORT;
process.on('uncaughtException', (err) => {
    console.log('Woops! some error occored', err);
});
//adding middleware to parse all incoming request as JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//adding middleware to allow cross-origin request
app.use((0, cors_1.default)());
//Compress all response
app.use((0, compression_1.default)());
const runningMessage = `Server running at port: ${port}`;
app.listen(port, () => {
    console.log(runningMessage);
});
