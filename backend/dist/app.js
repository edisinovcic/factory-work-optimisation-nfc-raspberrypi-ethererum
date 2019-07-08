"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const body_parser_1 = __importDefault(require("body-parser"));
// Routes (route handlers)
const tag_1 = __importDefault(require("./routes/tag"));
//import employeeRouter from './routes/employee'
const app = express_1.default();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//Routes
app.use('/api/tag', tag_1.default);
//app.use('/api/employee', employeeRouter);
exports.default = app;
//# sourceMappingURL=app.js.map