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
const accountingCodeDao_1 = __importDefault(require("../../dao/masters/accountingCodeDao"));
const accountCodeMessage_1 = __importDefault(require("../../responseMessage/masters/accountCodeMessage"));
const commonResponse_1 = __importDefault(require("../../../../util/helper/commonResponse"));
const commonMessage_1 = require("../../responseMessage/commonMessage");
const joi_1 = __importDefault(require("joi"));
const reqAccountCodeValidation_1 = require("../../requests/masters/reqAccountCodeValidation");
/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Account Code Controller
 * | Comman apiId- 01
 */
class AccountCodeController {
    constructor() {
        this.getAccountCode = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.dao.get(req);
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, accountCodeMessage_1.default.NOT_FOUND, data, 200, "GET", apiId, "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, accountCodeMessage_1.default.FOUND, data, 200, "GET", apiId, "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error, "", 500, "GET", apiId, "1.0", res);
            }
        });
        // Get limited account codes
        this.getAllAccountingCode = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const data = yield this.dao.get_all();
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        // Get main codes
        this.getMainAccountingCode = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const data = yield this.dao.getMainCodes();
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        // Get main codes
        this.getSubAccountingCode = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const data = yield this.dao.getSubCodes();
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        // Get main codes
        this.getChildAccountingCode = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const id = Number(req.params.id);
                // validate id
                const { error } = joi_1.default.object({
                    id: joi_1.default.number().required(),
                }).validate({ id: id });
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.dao.getChildCodes(id);
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        // Get main codes
        this.getParentCode = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const id = Number(req.params.id);
                // validate id
                const { error } = joi_1.default.object({
                    id: joi_1.default.number().required(),
                }).validate({ id: id });
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.dao.getParentCode(id);
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        this.getCodesWithParentDetail = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = { apiId, action: "GET", version: "1.0" };
            try {
                const data = yield this.dao.getCodesWithParentDetail();
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        /**
         * | Author- Sanjiv Kumar
         * | Created On- 05-03-2024
         * | Created for- Requesting New Accounting Code
         */
        this.requestingNewCode = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "POST",
                version: "1.0",
            };
            try {
                const { error } = reqAccountCodeValidation_1.requestNewAccCodeSchema.validate(req.body);
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.dao.requestNewCode(req.body);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).CREATED, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        this.dao = new accountingCodeDao_1.default();
        this.initMsg = "Accounting Codes";
    }
}
exports.default = AccountCodeController;
