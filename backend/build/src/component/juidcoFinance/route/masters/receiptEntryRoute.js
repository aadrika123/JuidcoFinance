"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const receiptEntryController_1 = __importDefault(require("../../controller/masters/receiptEntryController"));
/**
 * | Author- Bijoy Paitandi
 * | Created On- 31-01-2024
 * | Created for- Receipt Entry
 * | Status: closed
 */
class ReceiptEntryRoute {
    constructor() {
        this.baseUrl = `${common_1.baseUrl}/receipt-entry`;
        this.controller = new receiptEntryController_1.default();
    }
    configure(app, apiId) {
        app.route(`${this.baseUrl}/create`).post((req, res) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get`).get((req, res) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:receiptId`).get((req, res) => this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req, res) => this.controller.update(req, res, apiId + "04"));
        app.route(`${this.baseUrl}/get-pdf/:receiptId`).get((req, res) => this.controller.getPDF(req, res, apiId + "05"));
    }
}
exports.default = ReceiptEntryRoute;
