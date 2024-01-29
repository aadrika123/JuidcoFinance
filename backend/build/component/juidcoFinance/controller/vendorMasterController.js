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
const vendorMasterMessage_1 = __importDefault(require("../responseMessage/vendorMasterMessage"));
/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Vendor Master Controller
 * | Comman apiId- 05
 */
class VendorMasterController {
    constructor() {
        // create a new Vendor
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = vendorMasterValidation_1.vendorMasterValidation.validate(req.body);
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error.message, "", 400, "POST", "0701", "1.0", res);
                const data = yield this.vendorMasterDao.store(req);
                return (0, sendResponse_1.sendResponse)(true, vendorMasterMessage_1.default.CREATED, data, 200, "POST", "0701", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "", 500, "POST", "0701", "1.0", res);
            }
        });
        // get all vendor
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.vendorMasterDao.get(req);
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, vendorMasterMessage_1.default.NOT_FOUND, data, 200, "GET", "0702", "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, vendorMasterMessage_1.default.FOUND, data, 200, "GET", "0702", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "", 500, "GET", "0702", "1.0", res);
            }
        });
        // get vendor by ID
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.vendorId);
                const data = yield this.vendorMasterDao.getById(id);
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, vendorMasterMessage_1.default.NOT_FOUND, data, 200, "GET", "0703", "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, vendorMasterMessage_1.default.FOUND, data, 200, "GET", "0703", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "", 500, "GET", "0703", "1.0", res);
            }
        });
        // update vendor information
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = vendorMasterValidation_1.vendorMasterValidation.validate(req.body);
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error.message, "", 403, "POST", "0704", "1.0", res);
                const data = yield this.vendorMasterDao.update(req);
                return (0, sendResponse_1.sendResponse)(true, vendorMasterMessage_1.default.UPDATED, data, 200, "POST", "0704", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "", 500, "POST", "0704", "1.0", res);
            }
        });
        this.vendorMasterDao = new vendorMasterDao_1.default();
    }
}
exports.default = VendorMasterController;
