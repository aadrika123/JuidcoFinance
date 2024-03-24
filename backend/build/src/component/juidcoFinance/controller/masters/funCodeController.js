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
const sendResponse_1 = require("../../../../util/sendResponse");
const functionCodeDao_1 = __importDefault(require("../../dao/masters/functionCodeDao"));
const funCodeMessage_1 = __importDefault(require("../../responseMessage/masters/funCodeMessage"));
const commonResponse_1 = __importDefault(require("../../../../util/helper/commonResponse"));
/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024
 * | Created for- Function Code Controller
 * | Common apiId- 02
 */
class FunCodeController {
    constructor() {
        // Get limited Function Codes
        this.getFunCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.funCodeDao.get(Number(req.query.page), Number(req.query.limit));
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, funCodeMessage_1.default.NOT_FOUND, data, 200, "GET", "0201", "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, funCodeMessage_1.default.FOUND, data, 200, "GET", "0201", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error, "", 500, "GET", "0201", "1.0", res);
            }
        });
        // Get all function codes
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                action: "GET",
                apiId: "0202",
                version: "1.0"
            };
            try {
                const data = yield this.funCodeDao.getAll(req);
                if (!data) {
                    return commonResponse_1.default.SUCCESS("Function Codes Not Found", data, resObj, res);
                }
                return commonResponse_1.default.SUCCESS("Function Codes Found Successfully", data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        this.funCodeDao = new functionCodeDao_1.default();
    }
}
exports.default = FunCodeController;
