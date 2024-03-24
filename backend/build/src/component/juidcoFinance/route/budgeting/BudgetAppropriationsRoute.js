"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const BudgetAppropriationsController_1 = __importDefault(require("../../controller/budgeting/BudgetAppropriationsController"));
/**
 * | Author- Bijoy Paitandi
 * | Created for- BudgetAppropriations Route
 * | Status: open
 */
class BudgetAppropriationsRoute {
    constructor() {
        this.baseUrl = `${common_1.baseUrl}/budget-appropriations`;
        this.controller = new BudgetAppropriationsController_1.default();
    }
    configure(app, apiId) {
        app.route(`${this.baseUrl}/create`).post((req, res) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req, res) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req, res) => this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req, res) => this.controller.update(req, res, apiId + "04"));
        app.route(`${this.baseUrl}/get-current-amounts/:id`).get((req, res) => this.controller.getCurrentAmounts(req, res, apiId + "05"));
    }
}
exports.default = BudgetAppropriationsRoute;
