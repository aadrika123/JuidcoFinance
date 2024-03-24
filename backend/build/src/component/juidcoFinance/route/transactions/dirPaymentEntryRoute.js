"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const dirPaymentEntryController_1 = __importDefault(require("../../controller/transactions/dirPaymentEntryController"));
class DirPaymentEntryRoute {
    constructor() {
        this.dirPaymentEntryController = new dirPaymentEntryController_1.default();
    }
    configure(app) {
        app.route(`${common_1.baseUrl}/direct-payment-entry/create`).post((req, res) => this.dirPaymentEntryController.create(req, res, "0901")); //0901
        app.route(`${common_1.baseUrl}/direct-payment-entry/get-all`).get((req, res) => this.dirPaymentEntryController.get(req, res, "0902")); //0902
        app.route(`${common_1.baseUrl}/direct-payment-entry/get-by-id/:id`).get((req, res) => this.dirPaymentEntryController.getById(req, res, "0903")); //0903
        app.route(`${common_1.baseUrl}/direct-payment-entry/update`).post((req, res) => this.dirPaymentEntryController.update(req, res, "0904")); //0904
    }
}
exports.default = DirPaymentEntryRoute;
