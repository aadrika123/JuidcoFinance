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
const grantDao_1 = __importDefault(require("../dao/grantDao"));
const grantMessage_1 = __importDefault(require("../responseMessage/grantMessage"));
/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-01-2024
 * | Created for- Grant Controller
 * | Common apiId- 12
 */
class GrantController {
    constructor() {
        // Get limited Grants
        this.getGrants = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.grantDao.get();
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, grantMessage_1.default.NOT_FOUND, data, 200, "GET", "1201", "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, grantMessage_1.default.FOUND, data, 200, "GET", "1201", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error, "", 500, "GET", "1201", "1.0", res);
            }
        });
        this.grantDao = new grantDao_1.default();
    }
}
exports.default = GrantController;
