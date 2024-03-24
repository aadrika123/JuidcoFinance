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
const commonResponse_1 = __importDefault(require("../../../util/helper/commonResponse"));
const udhdSubDepartmentDao_1 = __importDefault(require("../dao/udhdSubDepartmentDao"));
const commonMessage_1 = require("../responseMessage/commonMessage");
/**
 * | Author- Sanjiv Kumar
 * | Created for- UDHD Sub-Departments
 * | Created Date- 28-02-2024
 * | Status - Done
 */
class UDHDSubDepartmentController {
    constructor() {
        /// Get All UDHD sub departments
        this.getAll = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const data = yield this.dao.getAll();
                if (!data) {
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                }
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        ///////// Get all Department on basis of UDHD_ID
        this.getAllDesignation = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const data = yield this.dao.getAllDesignation(Number(req.params.udhd_id));
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg + " Designations").FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        this.dao = new udhdSubDepartmentDao_1.default();
        this.initMsg = "UDHD Departments";
    }
}
exports.default = UDHDSubDepartmentController;
