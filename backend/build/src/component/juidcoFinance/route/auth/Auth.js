"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const Login_1 = __importDefault(require("../../controller/auth/Login"));
class AuthRoute {
    constructor() {
        this.authController = new Login_1.default();
    }
    configure(app, apiId) {
        app
            .route(`${common_1.baseUrl}/auth/login`)
            .post((req, res) => this.authController.login(req, res, apiId + "01"));
        app
            .route(`${common_1.baseUrl}/auth/mail/send-otp`)
            .post((req, res) => this.authController.sendMailOtp(req, res, apiId + "02"));
        app
            .route(`${common_1.baseUrl}/auth/mail/verify-otp`)
            .post((req, res) => this.authController.verifyMailOtp(req, res, apiId + "03"));
    }
}
exports.default = AuthRoute;
