"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLogger = exports.errLogger = exports.warnlogger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, prettyPrint, json } = winston_1.default.format;
exports.warnlogger = winston_1.default.createLogger({
    format: combine(timestamp(), prettyPrint(), json()),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston_1.default.transports.File({
            filename: "logs/audit.log",
            level: "warn",
        }),
    ],
});
exports.errLogger = winston_1.default.createLogger({
    format: combine(timestamp(), prettyPrint(), json()),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston_1.default.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
    ],
});
exports.infoLogger = winston_1.default.createLogger({
    format: combine(timestamp(), prettyPrint(), json()),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston_1.default.transports.File({
            filename: "logs/info.log",
            level: "info",
        }),
    ],
});
