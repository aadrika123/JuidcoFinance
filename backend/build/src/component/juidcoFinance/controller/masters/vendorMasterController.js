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
const vendorMasterDao_1 = __importDefault(require("../../dao/masters/vendorMasterDao"));
const vendorMasterValidation_1 = require("../../requests/masters/vendorMasterValidation");
const vendorMasterMessage_1 = __importDefault(require("../../responseMessage/masters/vendorMasterMessage"));
const commonResponse_1 = __importDefault(require("../../../../util/helper/commonResponse"));
const commonMessage_1 = require("../../responseMessage/commonMessage");
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
                    return (0, sendResponse_1.sendResponse)(false, error, "", 400, "POST", "0701", "1.0", res);
                const data = yield this.vendorMasterDao.store(req);
                return (0, sendResponse_1.sendResponse)(true, vendorMasterMessage_1.default.CREATED, data, 200, "POST", "0701", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error, "", 500, "POST", "0701", "1.0", res);
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
                return (0, sendResponse_1.sendResponse)(false, error, "", 500, "GET", "0702", "1.0", res);
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
                return (0, sendResponse_1.sendResponse)(false, error, "", 500, "GET", "0703", "1.0", res);
            }
        });
        // update vendor information
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = vendorMasterValidation_1.vendorMasterValidation.validate(req.body);
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error, "", 403, "POST", "0704", "1.0", res);
                const data1 = yield this.vendorMasterDao.getById(req.body.id);
                req.body.vendor_no = data1.vendor_no;
                const data = yield this.vendorMasterDao.update(req);
                return (0, sendResponse_1.sendResponse)(true, vendorMasterMessage_1.default.UPDATED, data, 200, "POST", "0704", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error, "", 500, "POST", "0704", "1.0", res);
            }
        });
        this.getNames = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const data = yield this.vendorMasterDao.getNames();
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        this.vendorMasterDao = new vendorMasterDao_1.default();
        this.initMsg = "VendorMaster";
    }
}
exports.default = VendorMasterController;
