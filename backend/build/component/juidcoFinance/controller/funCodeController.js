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
const sendResponse_1 = require("../../../util/sendResponse");
const funCodeDao_1 = __importDefault(require("../dao/funCodeDao"));
/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024
 * | Created for- Function Code Controller
 * | Comman apiId- 02
 */
class FunCodeController {
    constructor() {
        // Get limited Function Codes
        this.getFunCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.funCodeDao.get();
                return (0, sendResponse_1.sendResponse)(true, "Data Found Successfully!!", data, 200, "GET", "0201", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, error.code, 200, "GET", "0201", "1.0", res);
            }
        });
        this.funCodeDao = new funCodeDao_1.default();
    }
}
exports.default = FunCodeController;
