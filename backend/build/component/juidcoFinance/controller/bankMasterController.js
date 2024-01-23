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
const bankMasterValidation_1 = require("../requests/bankMasterValidation");
const sendResponse_1 = require("../../../util/sendResponse");
const bankMasterDao_1 = __importDefault(require("../dao/bankMasterDao"));
/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024
 * | Created for- BankMaster Controller
 * | Common apiId- 04
 */
class BankMasterController {
    constructor() {
        // Create
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = bankMasterValidation_1.bankMasterValidation.validate(req.body);
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 403, "POST", "0401", "1.0", res);
                const data = yield this.bankMasterDao.store(req);
                return (0, sendResponse_1.sendResponse)(true, "Bank Master created Successfully!!", data, 201, "POST", "0401", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, error.code, 500, "POST", "0401", "1.0", res);
            }
        });
        // Get limited bank list
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.bankMasterDao.get(req);
                return (0, sendResponse_1.sendResponse)(true, "Bank Master Found Successfully!!", data, 200, "GET", "0402", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, error.code, 500, "GET", "0402", "1.0", res);
            }
        });
        // Get single bank details by Id
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.bankId);
                const data = yield this.bankMasterDao.getById(id);
                return (0, sendResponse_1.sendResponse)(true, "Bank Master Found Successfully!!", data, 200, "GET", "0403", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, error.code, 500, "GET", "0403", "1.0", res);
            }
        });
        // Update bank details by Id
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = bankMasterValidation_1.bankMasterValidation.validate(req.body);
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 403, "POST", "0404", "1.0", res);
                const data = yield this.bankMasterDao.update(req);
                return (0, sendResponse_1.sendResponse)(true, "Bank Master updated Successfully!!", data, 200, "POST", "0404", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, error.code, 500, "POST", "0404", "1.0", res);
            }
        });
        // Search bank list
        this.search = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.bankMasterDao.search(req);
                return (0, sendResponse_1.sendResponse)(true, "Bank Master Found Successfully!!", data, 200, "GET", "0405", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, error.code, 500, "GET", "0405", "1.0", res);
            }
        });
        this.bankMasterDao = new bankMasterDao_1.default();
    }
}
exports.default = BankMasterController;
