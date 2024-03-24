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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const commonResponse_1 = __importDefault(require("../../../util/helper/commonResponse"));
const commonMessage_1 = require("../responseMessage/commonMessage");
class Middleware {
    constructor() {
        //// Generate the temperaury token
        this.jwtSign = (authData) => {
            const secret = process.env.SECRET_KEY || "xyz";
            return jsonwebtoken_1.default.sign({
                authData,
            }, secret, { expiresIn: "1d" });
        };
        //// Verify the generated token
        this.publicValidation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId: "Not related to APIs",
                action: "Token Verification",
                version: "1.0",
            };
            const secret = process.env.SECRET_KEY || "xyz";
            const bearerHeader = req.headers["authorization"];
            const token = bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(" ")[1];
            if (token && typeof token !== "undefined") {
                try {
                    const data = yield jsonwebtoken_1.default.verify(token, secret);
                    res.locals.user = data === null || data === void 0 ? void 0 : data.authData;
                    next();
                }
                catch (error) {
                    return commonResponse_1.default.UNAUTHORISED((0, commonMessage_1.resMessage)(this.initMsg).INVALID, resObj, res, req);
                }
            }
            else {
                return commonResponse_1.default.UNAUTHORISED((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, resObj, res, req);
            }
        });
        //// Verify Is Accountent or not
        this.accountant = (req, res, next, apiId) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const resObj = {
                apiId: apiId || "Not related to APIs",
                action: "Authentication",
                version: "1.0",
            };
            const secret = process.env.SECRET_KEY || "xyz";
            const bearerHeader = req.headers["authorization"];
            const token = bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(" ")[1];
            if (token && typeof token !== "undefined") {
                try {
                    const data = yield jsonwebtoken_1.default.verify(token, secret);
                    res.locals.user = data === null || data === void 0 ? void 0 : data.authData;
                    if (data &&
                        ((_b = (_a = data === null || data === void 0 ? void 0 : data.authData) === null || _a === void 0 ? void 0 : _a.designation) === null || _b === void 0 ? void 0 : _b.name) !==
                            "Accounts Department – Accountant") {
                        return commonResponse_1.default.UNAUTHORISED("You are not authorised for the route", resObj, res, req);
                    }
                    next();
                }
                catch (error) {
                    return commonResponse_1.default.UNAUTHORISED((0, commonMessage_1.resMessage)(this.initMsg).INVALID, resObj, res, req);
                }
            }
            else {
                return commonResponse_1.default.UNAUTHORISED((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, resObj, res, req);
            }
        });
        //// Verify Is Accountent or not
        this.manager = (req, res, next, apiId) => __awaiter(this, void 0, void 0, function* () {
            var _c, _d;
            const resObj = {
                apiId: apiId,
                action: "Authentication",
                version: "1.0",
            };
            const secret = process.env.SECRET_KEY || "xyz";
            const bearerHeader = req.headers["authorization"];
            const token = bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(" ")[1];
            if (token && typeof token !== "undefined") {
                try {
                    const data = yield jsonwebtoken_1.default.verify(token, secret);
                    res.locals.user = data === null || data === void 0 ? void 0 : data.authData;
                    if (data &&
                        ((_d = (_c = data === null || data === void 0 ? void 0 : data.authData) === null || _c === void 0 ? void 0 : _c.designation) === null || _d === void 0 ? void 0 : _d.name) !== "Accounts Department – Manager") {
                        return commonResponse_1.default.UNAUTHORISED("You are not authorised for the route", resObj, res, req);
                    }
                    next();
                }
                catch (error) {
                    return commonResponse_1.default.UNAUTHORISED((0, commonMessage_1.resMessage)(this.initMsg).INVALID, resObj, res, req);
                }
            }
            else {
                return commonResponse_1.default.UNAUTHORISED((0, commonMessage_1.resMessage)(this.initMsg).NOT_FOUND, resObj, res, req);
            }
        });
        this.initMsg = "Token";
    }
}
exports.default = Middleware;
