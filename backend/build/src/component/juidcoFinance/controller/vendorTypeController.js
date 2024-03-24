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
const vendorTypeDao_1 = __importDefault(require("../dao/vendorTypeDao"));
const vendorTypeMessage_1 = __importDefault(require("../responseMessage/vendorTypeMessage"));
/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-01-2024
 * | Created for- Vendor Type Controller
 * | Common apiId- 05
 */
class VendorTypeController {
    constructor() {
        // Get all vendor Types
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.vendorTypeDao.get();
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, vendorTypeMessage_1.default.NOT_FOUND, data, 200, "GET", "0501", "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, vendorTypeMessage_1.default.FOUND, data, 200, "GET", "0501", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error, "", 500, "GET", "0501", "1.0", res);
            }
        });
        this.vendorTypeDao = new vendorTypeDao_1.default();
    }
}
exports.default = VendorTypeController;
