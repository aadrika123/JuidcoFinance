"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const bankController_1 = __importDefault(require("../controller/bankController"));
const middleware_1 = __importDefault(require("../middleware/middleware"));
class BankRoute {
    constructor() {
        this.controller = new bankController_1.default();
        this.middleware = new middleware_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/banks/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
        // app.route(`${baseUrl}/audit`).post(
        //   this.middleware.jwtVerify,
        //   this.audit.store)
    }
}
exports.default = BankRoute;
