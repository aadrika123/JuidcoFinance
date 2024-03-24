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
const commonResponse_1 = __importDefault(require("../../../../util/helper/commonResponse"));
const commonMessage_1 = require("../../responseMessage/commonMessage");
const joi_1 = __importDefault(require("joi"));
const InvestmentsDao_1 = __importDefault(require("../../dao/budgeting/InvestmentsDao"));
const investmentsValidation_1 = require("../../requests/budgeting/investmentsValidation");
/**
 * | Author- Bijoy Paitandi
 * | Created for- Investments Controller
 * | Status: open
 */
class InvestmentsController {
    constructor() {
        // Create
        this.create = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "POST",
                version: "1.0",
            };
            try {
                const { error } = investmentsValidation_1.investmentsValidation.validate(req.body);
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.investmentsDao.store(req);
                return commonResponse_1.default.CREATED((0, commonMessage_1.resMessage)(this.initMesg).CREATED, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        // Get limited bill invoices list
        this.get = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const data = yield this.investmentsDao.get(req);
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMesg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMesg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        // Get single biull invoice details by Id
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
                const data = yield this.investmentsDao.getById(id);
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMesg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMesg).FOUND, data, resObj, res);
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
                const { error } = investmentsValidation_1.investmentsValidationWithID.validate(req.body);
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.investmentsDao.update(req);
                return commonResponse_1.default.CREATED((0, commonMessage_1.resMessage)(this.initMesg).UPDATED, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        this.investmentsDao = new InvestmentsDao_1.default();
        this.initMesg = "Investments Entry";
    }
}
exports.default = InvestmentsController;
