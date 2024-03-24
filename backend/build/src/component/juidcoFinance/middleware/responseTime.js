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
exports.resourcesUsage = exports.responseTime = void 0;
const node_os_utils_1 = __importDefault(require("node-os-utils"));
const responseTime = (req, res, next) => {
    const startTime = process.hrtime();
    res.locals.startTime = startTime;
    next();
};
exports.responseTime = responseTime;
const resourcesUsage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const mem = node_os_utils_1.default.mem;
    const data = yield mem.info();
    res.locals.memoInfo = data.usedMemPercentage;
    /////////////////
    const cpu = node_os_utils_1.default.cpu;
    const info = yield cpu.usage();
    res.locals.cpuInfo = info;
    next();
});
exports.resourcesUsage = resourcesUsage;
