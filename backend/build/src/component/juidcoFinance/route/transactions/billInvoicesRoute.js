"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const billInvoicesController_1 = __importDefault(require("../../controller/transactions/billInvoicesController"));
const middleware_1 = __importDefault(require("../../middleware/middleware"));
/**
 * | Author- Bijoy Paitandi
 * | Created On- 07-02-2024
 * | Created for- Bill Invoices Route
 * | Status: open
 */
class BillInvoicesRoute {
    constructor() {
        this.baseUrl = `${common_1.baseUrl}/bill-invoices`;
        this.controller = new billInvoicesController_1.default();
        this.middleware = new middleware_1.default();
    }
    configure(app, apiId) {
        app
            .route(`${this.baseUrl}/create`)
            .post((req, res) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get(this.middleware.publicValidation, (req, res) => this.controller.get(req, res, apiId + "02"));
        app
            .route(`${this.baseUrl}/get-by-id/:id`)
            .get((req, res) => this.controller.getById(req, res, apiId + "03"));
        app
            .route(`${this.baseUrl}/update`)
            .post((req, res) => this.controller.update(req, res, apiId + "04"));
    }
}
exports.default = BillInvoicesRoute;
