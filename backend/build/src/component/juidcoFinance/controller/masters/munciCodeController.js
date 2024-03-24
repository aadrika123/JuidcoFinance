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
const munciCodeDao_1 = __importDefault(require("../../dao/masters/munciCodeDao"));
const municCodeMessage_1 = __importDefault(require("../../responseMessage/masters/municCodeMessage"));
const commonResponse_1 = __importDefault(require("../../../../util/helper/commonResponse"));
const commonMessage_1 = require("../../responseMessage/commonMessage");
/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Muncipality Code Controller
 * | Common apiId- 03 .
 */
class MuncipalityCodeController {
    constructor() {
        // Muncipality Code Controller
        this.getMuncipalityCode = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.dao.get(req);
                if (!data)
                    return (0, sendResponse_1.sendResponse)(true, municCodeMessage_1.default.NOT_FOUND, data, 200, "GET", apiId, "1.0", res);
                return (0, sendResponse_1.sendResponse)(true, municCodeMessage_1.default.FOUND, data, 200, "GET", apiId, "1.0", res);
            }
            catch (error) {
                return (0, sendResponse_1.sendResponse)(false, error, "", 500, "GET", apiId, "1.0", res);
            }
        });
        // Get limited account codes
        this.getAllMunicipalityCode = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
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
        this.dao = new munciCodeDao_1.default();
        this.initMsg = "Municipality Codes";
    }
}
exports.default = MuncipalityCodeController;
