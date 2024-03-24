"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const FinancialYearsController_1 = __importDefault(require("../../controller/budgeting/FinancialYearsController"));
class FinancialYearsRoute {
    constructor() {
        this.controller = new FinancialYearsController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/financial-years/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = FinancialYearsRoute;
