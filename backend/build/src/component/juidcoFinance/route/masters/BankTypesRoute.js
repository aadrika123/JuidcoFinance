"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BankTypesController_1 = __importDefault(require("../../controller/masters/BankTypesController"));
const common_1 = require("../../../../util/common");
class BankTypesRoute {
    constructor() {
        this.controller = new BankTypesController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/bank-types/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = BankTypesRoute;
