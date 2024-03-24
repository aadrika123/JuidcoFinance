"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const voucherEntryController_1 = __importDefault(require("../../controller/documentation/voucherEntryController"));
/**
 * | Author- Krish
 * | Created On- 01-02-2024
 * | Created for- Voucher Entry Controller
 * | Common apiId- 18
 * | Status: open
 */
class VoucherEntryRoute {
    constructor() {
        this.baseUrl = `${common_1.baseUrl}/voucher-entry`;
        this.voucherEntryController = new voucherEntryController_1.default();
    }
    configure(app, apiId) {
        app.route(`${this.baseUrl}/create`).post((req, res) => this.voucherEntryController.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req, res) => this.voucherEntryController.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req, res) => this.voucherEntryController.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req, res) => this.voucherEntryController.update(req, res, apiId + "04"));
    }
}
exports.default = VoucherEntryRoute;
