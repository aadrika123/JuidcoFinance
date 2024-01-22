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
const vendorMasterDao_1 = __importDefault(require("../dao/vendorMasterDao"));
const vendorMasterValidation_1 = require("../requests/vendorMasterValidation");
/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Vendor Master Controller
 * | Comman apiId- 05
 */
class VendorMasterController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = vendorMasterValidation_1.vendorMasterValidation.validate(req.body);
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 400, "POST", "0701", "1.0", res);
                const data = yield this.vendorMasterDao.store(req);
                return (0, sendResponse_1.sendResponse)(true, "Vendor Data added successfully", data, 200, "POST", "0701", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 500, "POST", "0701", "1.0", res);
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.vendorMasterDao.get();
                return (0, sendResponse_1.sendResponse)(true, "Vendor Data fetched successfully", data, 200, "GET", "0702", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 500, "GET", "0702", "1.0", res);
            }
        });
        this.vendorMasterDao = new vendorMasterDao_1.default();
    }
}
exports.default = VendorMasterController;
