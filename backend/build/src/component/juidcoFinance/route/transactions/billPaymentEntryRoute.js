"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const billPaymentEntryController_1 = __importDefault(require("../../controller/transactions/billPaymentEntryController"));
class BillPaymentEntryRoute {
    constructor() {
        this.controller = new billPaymentEntryController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/bill-payment-entry/create`).post((req, res) => this.controller.create(req, res, apiId + "01"));
        app.route(`${common_1.baseUrl}/bill-payment-entry/get-all`).get((req, res) => this.controller.get(req, res, apiId + "02"));
        app.route(`${common_1.baseUrl}/bill-payment-entry/get-by-id/:id`).get((req, res) => this.controller.getById(req, res, apiId + "03"));
        app.route(`${common_1.baseUrl}/bill-payment-entry/update`).post((req, res) => this.controller.update(req, res, apiId + "04"));
    }
}
exports.default = BillPaymentEntryRoute;
