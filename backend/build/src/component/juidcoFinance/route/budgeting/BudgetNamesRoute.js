"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BudgetNamesController_1 = __importDefault(require("../../controller/budgeting/BudgetNamesController"));
const common_1 = require("../../../../util/common");
class BudgetNamesRoute {
    constructor() {
        this.controller = new BudgetNamesController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/budget-names/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = BudgetNamesRoute;
