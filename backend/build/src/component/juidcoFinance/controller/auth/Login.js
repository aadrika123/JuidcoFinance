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
const authDao_1 = __importDefault(require("../../dao/auth/authDao"));
const loginValidation_1 = require("../../requests/auth/loginValidation");
/**
 * | Author- Sanjiv Kumar
 * | Created for- Authentication
 * | Created Date- 27-02-2024
 * | Status - Done
 */
class AuthController {
    constructor() {
        // Login
        this.login = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const { error } = loginValidation_1.loginValidation.validate(req.body);
                if (error)
                    return commonResponse_1.default.VALIDATION_ERROR(error, resObj, res);
                const data = yield this.dao.login(req.body);
                if (!data)
                    return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, data, resObj, res);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).LOGIN, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        /// Send OTP on Mail
        this.sendMailOtp = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "POST",
                version: "1.0",
            };
            try {
                yield this.dao.sendMailOtp(req.body.email);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)(this.initMsg).OTP_SENT, null, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        /// Verify OTP on Mail
        this.verifyMailOtp = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "POST",
                version: "1.0",
            };
            try {
                const data = yield this.dao.verifyMailOtp(req.body.email, req.body.otp);
                if (data === null) {
                    return commonResponse_1.default.VALIDATION_ERROR("Wrong OTP entered!!!", resObj, res);
                }
                else if (!data) {
                    return commonResponse_1.default.VALIDATION_ERROR("OTP has been expired!!!", resObj, res);
                }
                return commonResponse_1.default.SUCCESS("OTP validated successfully!!!", data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res);
            }
        });
        this.dao = new authDao_1.default();
        this.initMsg = "Employee";
    }
}
exports.default = AuthController;
