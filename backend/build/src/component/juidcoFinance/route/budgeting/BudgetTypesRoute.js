"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const BudgetTypesController_1 = __importDefault(require("../../controller/budgeting/BudgetTypesController"));
class BudgetTypesRoute {
    constructor() {
        this.controller = new BudgetTypesController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/budget-types/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = BudgetTypesRoute;
