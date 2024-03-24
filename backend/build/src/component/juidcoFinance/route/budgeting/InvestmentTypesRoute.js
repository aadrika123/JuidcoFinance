"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvestmentTypesController_1 = __importDefault(require("../../controller/budgeting/InvestmentTypesController"));
const common_1 = require("../../../../util/common");
class InvestmentTypesRoute {
    constructor() {
        this.controller = new InvestmentTypesController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/investment-types/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = InvestmentTypesRoute;
