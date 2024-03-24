"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReceiptRegisterController_1 = __importDefault(require("../../controller/masters/ReceiptRegisterController"));
const common_1 = require("../../../../util/common");
/**
 * | Author- Sanjiv Kumar
 * | Created for- ReceiptRegister Route
 * | Status: Done
 */
class ReceiptRegisterRoute {
    constructor() {
        this.baseUrl = `${common_1.baseUrl}/receipt-register`;
        this.controller = new ReceiptRegisterController_1.default();
    }
    configure(app, apiId) {
        app.route(`${this.baseUrl}/create`).post((req, res) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req, res) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req, res) => this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req, res) => this.controller.update(req, res, apiId + "04"));
        app.route(`${this.baseUrl}/approve`).post((req, res) => this.controller.approve(req, res, apiId + "05"));
        app.route(`${this.baseUrl}/opening-balance/create`).post((req, res) => this.controller.createOpeningBal(req, res, apiId + "06"));
        app.route(`${this.baseUrl}/opening-balance/update`).post((req, res) => this.controller.updateOpeningBal(req, res, apiId + "07"));
    }
}
exports.default = ReceiptRegisterRoute;
