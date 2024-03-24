"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse_1 = require("../sendResponse");
const loggerConfig_1 = require("../../../loggerConfig");
const auditTrail_1 = __importDefault(require("../../component/juidcoFinance/auditTrail/auditTrail"));
const CommonRes = Object.freeze({
    VALIDATION_ERROR: (error, resObj, res, req) => {
        loggerConfig_1.errLogger.error({ metaData: resObj, message: error.message });
        new auditTrail_1.default().store(error, resObj, res, req);
        return (0, sendResponse_1.sendResponse)(false, error, "", 403, resObj.action, resObj.apiId, resObj.version, res);
    },
    SERVER_ERROR: (error, resObj, res, req) => {
        loggerConfig_1.errLogger.error({ metaData: resObj, message: error.message });
        new auditTrail_1.default().store(error, resObj, res, req);
        return (0, sendResponse_1.sendResponse)(false, error, "", 500, resObj.action, resObj.apiId, resObj.version, res);
    },
    CREATED: (message, data, resObj, res) => {
        loggerConfig_1.infoLogger.info({ metaData: resObj, data: data });
        return (0, sendResponse_1.sendResponse)(true, message, data, 201, resObj.action, resObj.apiId, resObj.version, res);
    },
    SUCCESS: (message, data, resObj, res) => {
        loggerConfig_1.infoLogger.info({ metaData: resObj, data: data });
        return (0, sendResponse_1.sendResponse)(true, message, data, 200, resObj.action, resObj.apiId, resObj.version, res);
    },
    UNAUTHORISED: (error, resObj, res, req) => {
        loggerConfig_1.errLogger.error({ metaData: resObj, message: error.message });
        new auditTrail_1.default().store(error, resObj, res, req);
        return (0, sendResponse_1.sendResponse)(false, error, "", 401, resObj.action, resObj.apiId, resObj.version, res);
    },
    DEFAULT: "The underlying {kind} for model {model} does not exist.",
});
exports.default = CommonRes;
