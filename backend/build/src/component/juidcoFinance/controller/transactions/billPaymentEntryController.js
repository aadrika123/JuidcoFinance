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
const billPaymentEntryDao_1 = __importDefault(require("../../dao/transactions/billPaymentEntryDao"));
const billPaymentEntryValidation_1 = require("../../requests/transactions/billPaymentEntryValidation");
const commonResponse_1 = __importDefault(require("../../../../util/helper/commonResponse"));
const commonMessage_1 = require("../../responseMessage/commonMessage");
const joi_1 = __importDefault(require("joi"));
/**
 * | Author- Sanjiv Kumar
 * | Created On- 01-02-2024
 * | Created for- Bill Payment Entry Controller
 * | Common apiId- 20
 */
class BillPaymentEntryController {
    constructor() {
        // create
        this.create = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId, action: "POST", version: "1.0",
            };
            try {
                const { error } = billPaymentEntryValidation_1.billPaymentEntryValidation.validate(req.body);
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.dao.store(req);
                return commonResponse_1.default.CREATED((0, commonMessage_1.resMessage)(this.initMsg).CREATED, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        // get bill payment entires
        this.get = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = { apiId, action: "GET", version: "1.0" };
            try {
                const data = yield this.dao.get(req);
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        // get a single record by id
        this.getById = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const id = Number(req.params.id);
                // validate id
                const { error } = joi_1.default.object({
                    id: joi_1.default.number().required().greater(0)
                }).validate({ 'id': id });
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.dao.getById(id);
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        // Update payment entry details by Id
        this.update = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "POST",
                version: "1.0",
            };
            try {
                const { error } = billPaymentEntryValidation_1.billPaymentEntryValidationAlongWithID.validate(req.body);
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.dao.update(req);
                return commonResponse_1.default.CREATED((0, commonMessage_1.resMessage)(this.initMsg).UPDATED, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        this.dao = new billPaymentEntryDao_1.default();
        this.initMsg = "Bill Payment Entry";
    }
}
exports.default = BillPaymentEntryController;
