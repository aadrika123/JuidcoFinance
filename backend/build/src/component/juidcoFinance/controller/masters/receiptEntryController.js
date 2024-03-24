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
const receiptEntryDao_1 = __importDefault(require("../../dao/transactions/receiptEntryDao"));
const joi_1 = __importDefault(require("joi"));
const receiptEntryValidation_1 = require("../../requests/transactions/receiptEntryValidation");
const commonResponse_1 = __importDefault(require("../../../../util/helper/commonResponse"));
const commonMessage_1 = require("../../responseMessage/commonMessage");
const memorystream_1 = __importDefault(require("memorystream"));
const node_latex_1 = __importDefault(require("node-latex"));
const fs_1 = __importDefault(require("fs"));
const dayjs_1 = __importDefault(require("dayjs"));
const escape_latex_1 = __importDefault(require("escape-latex"));
/**
 * | Author- Bijoy Paitandi
 * | Created On- 31-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */
class ReceiptEntryController {
    constructor() {
        this.create = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "POST",
                version: "1.0",
            };
            try {
                console.log(req.body);
                const { error } = receiptEntryValidation_1.receiptValidation.validate(req.body);
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.dao.store(req);
                return commonResponse_1.default.CREATED((0, commonMessage_1.resMessage)(this.initMsg).CREATED, data, resObj, res);
            }
            catch (error) {
                console.log(error);
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        this.get = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
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
        // get receipt by ID
        this.getById = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                // get the data
                const id = Number(req.params.receiptId);
                // validate
                const { error } = joi_1.default.object({
                    id: joi_1.default.number().required()
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
        this.update = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "POST",
                version: "1.0",
            };
            try {
                const { error } = receiptEntryValidation_1.receiptValidationWithID.validate(req.body);
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.dao.update(req);
                return commonResponse_1.default.CREATED((0, commonMessage_1.resMessage)(this.initMsg).UPDATED, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        // get receipt by ID
        this.getPDF = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                // get the data
                const id = Number(req.params.receiptId);
                // validate
                const { error } = joi_1.default.object({
                    id: joi_1.default.number().required()
                }).validate({ 'id': id });
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.dao.getById(id);
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                const texFile = './src/data/typesettings/receipt.tex';
                const texTemplate = fs_1.default.readFileSync(texFile).toString();
                const data1 = Object.assign(Object.assign({}, data), { receipt_type: data.receipt_type.name, ward_no: data.admin_ward.name, subledger: data.subledger.name, date: (0, dayjs_1.default)(data.date).format('DD MMM YYYY') });
                1;
                const texData = texTemplate.replace(/%(\w*)%/g, // or /{(\w*)}/g for "{this} instead of %this%"
                function (m, key) {
                    return Object.prototype.hasOwnProperty.call(data1, key) ? (0, escape_latex_1.default)(data1[key]) : "";
                });
                res.status(200).setHeader("Content-Type", "application/pdf");
                const pdf = (0, node_latex_1.default)(new memorystream_1.default(texData));
                pdf.pipe(res);
                return res;
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        this.dao = new receiptEntryDao_1.default();
        this.initMsg = "Receipt entry";
    }
}
exports.default = ReceiptEntryController;
