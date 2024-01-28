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
const dirPaymentEntryValidation_1 = require("../requests/dirPaymentEntryValidation");
const sendResponse_1 = require("../../../util/sendResponse");
const dirPaymentEntryMessage_1 = __importDefault(require("../responseMessage/dirPaymentEntryMessage"));
const dirPaymentEntryDao_1 = __importDefault(require("../dao/dirPaymentEntryDao"));
/**
 * | Author- Sanjiv Kumar
 * | Created On- 25-01-2024
 * | Created for- Direct Payment Entry Controller
 * | Common apiId- 09
 */
class DirPaymentEntryController {
    constructor() {
        // Create
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = dirPaymentEntryValidation_1.dirPaymentEntryValidation.validate(req.body);
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error.message, "", 403, "POST", "0901", "1.0", res);
                req.body.payment_no = 123;
                const data = yield this.dirPaymentEntryDao.store(req);
                return (0, sendResponse_1.sendResponse)(true, dirPaymentEntryMessage_1.default.CREATED, data, 201, "POST", "0901", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "", 500, "POST", "0901", "1.0", res);
            }
        });
        // Get limited payment entry list
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.dirPaymentEntryDao.get(req);
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, dirPaymentEntryMessage_1.default.NOT_FOUND, data, 200, "GET", "0902", "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, dirPaymentEntryMessage_1.default.FOUND, data, 200, "GET", "0902", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "", 500, "GET", "0902", "1.0", res);
            }
        });
        // Get single payment entry details by Id
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = yield this.dirPaymentEntryDao.getById(id);
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, dirPaymentEntryMessage_1.default.NOT_FOUND, data, 200, "GET", "0903", "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, dirPaymentEntryMessage_1.default.FOUND, data, 200, "GET", "0903", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "", 500, "GET", "0903", "1.0", res);
            }
        });
        // Update payment entry details by Id
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = dirPaymentEntryValidation_1.dirPaymentEntryValidation.validate(req.body);
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error.message, "", 403, "POST", "0904", "1.0", res);
                const data = yield this.dirPaymentEntryDao.update(req);
                return (0, sendResponse_1.sendResponse)(true, dirPaymentEntryMessage_1.default.UPDATED, data, 200, "POST", "0904", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "", 500, "POST", "0904", "1.0", res);
            }
        });
        this.dirPaymentEntryDao = new dirPaymentEntryDao_1.default();
    }
}
exports.default = DirPaymentEntryController;
