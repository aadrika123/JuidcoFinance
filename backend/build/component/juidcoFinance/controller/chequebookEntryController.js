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
const chequebookEntryDao_1 = __importDefault(require("../dao/chequebookEntryDao"));
const cheuqebookValidation_1 = require("../requests/cheuqebookValidation");
const joi_1 = __importDefault(require("joi"));
/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */
class ChequebookEntryController {
    constructor() {
        // create a new chequebook
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = cheuqebookValidation_1.chequebookValidation.validate(req.body);
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 400, "POST", "0801", "1.0", res);
                const data = yield this.chequebookEntryDao.store(req);
                return (0, sendResponse_1.sendResponse)(true, "Chequebook added successfully", data, 200, "POST", "0801", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 500, "POST", "0801", "1.0", res);
            }
        });
        // get all chequebooks
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.chequebookEntryDao.get(req);
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, "No Chequebooks Found", data, 200, "GET", "0802", "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, "Chequebook Data fetched successfully", data, 200, "GET", "0802", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 500, "GET", "0802", "1.0", res);
            }
        });
        // get employee list
        this.get_employee_list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.chequebookEntryDao.get_employee_list(req);
                return (0, sendResponse_1.sendResponse)(true, "Employee list fetched successfully", data, 200, "GET", "0803", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 500, "GET", "0803", "1.0", res);
            }
        });
        // get chequebook by ID
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // get the data
                const id = Number(req.params.chequebookId);
                // validate
                const { error } = joi_1.default.object({
                    id: joi_1.default.number().required()
                }).validate({ 'id': id });
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 400, "POST", "0804", "1.0", res);
                // fetch the data
                const data = yield this.chequebookEntryDao.getById(id);
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, "Chequebook Not Found", data, 200, "GET", "0804", "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, "Chequebook found successfully", data, 200, "GET", "0804", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 500, "GET", "0703", "1.0", res);
            }
        });
        // update vendor information
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // validate fields
                const { error } = cheuqebookValidation_1.chequebookValidationAlongWithID.validate(req.body);
                if (error)
                    return (0, sendResponse_1.sendResponse)(false, error.message, "error.code", 403, "PATCH", "0805", "1.0", res);
                const data = yield this.chequebookEntryDao.update(req);
                return (0, sendResponse_1.sendResponse)(true, "Chequebook updated successfully", data, 200, "PATCH", "0705", "1.0", res);
            }
            catch (error) {
                if (Object.prototype.hasOwnProperty.call(error, 'code')) {
                    if (error.code == "P2025") {
                        return (0, sendResponse_1.sendResponse)(true, "Illegal operation, your IP will be blacklisted.", [], 200, "PATCH", "0805", "1.0", res);
                    }
                }
                return (0, sendResponse_1.sendResponse)(false, "There was an unhandled error", error.code, 500, "PATCH", "0805", "1.0", res);
            }
        });
        this.chequebookEntryDao = new chequebookEntryDao_1.default();
    }
}
exports.default = ChequebookEntryController;
