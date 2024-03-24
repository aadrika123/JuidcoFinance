"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const BudgetReappropriationsController_1 = __importDefault(require("../../controller/budgeting/BudgetReappropriationsController"));
/**
 * | Author- Bijoy Paitandi
 * | Created for- BudgetReappropriations Route
 * | Status: open
 */
class BudgetReappropriationsRoute {
    constructor() {
        this.baseUrl = `${common_1.baseUrl}/budget-reappropriations`;
        this.controller = new BudgetReappropriationsController_1.default();
    }
    configure(app, apiId) {
        app.route(`${this.baseUrl}/create`).post((req, res) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req, res) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req, res) => this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req, res) => this.controller.update(req, res, apiId + "04"));
    }
}
exports.default = BudgetReappropriationsRoute;
