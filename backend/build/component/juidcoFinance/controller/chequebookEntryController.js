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
const chequebookEntryMessage_1 = __importDefault(require("../responseMessage/chequebookEntryMessage"));
/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */
class ChequebookEntryController {
    constructor() {
        // create a new Vendor
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.checkbookEntryDao.store(req);
                return (0, sendResponse_1.sendResponse)(true, chequebookEntryMessage_1.default.CREATED, data, 200, "POST", "0801", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "", 500, "POST", "0801", "1.0", res);
            }
        });
        // get all vendor
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.checkbookEntryDao.get(req);
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, chequebookEntryMessage_1.default.NOT_FOUND, data, 200, "GET", "0802", "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, chequebookEntryMessage_1.default.FOUND, data, 200, "GET", "0802", "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error.message, "", 500, "GET", "0802", "1.0", res);
            }
        });
        this.checkbookEntryDao = new chequebookEntryDao_1.default();
    }
}
exports.default = ChequebookEntryController;
