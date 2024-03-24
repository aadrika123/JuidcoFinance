"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const BalanceTrackingsController_1 = __importDefault(require("../../controller/budgeting/BalanceTrackingsController"));
/**
 * | Author- Bijoy Paitandi
 * | Created for- BalanceTrackings Route
 * | Status: open
 */
class BalanceTrackingsRoute {
    constructor() {
        this.baseUrl = `${common_1.baseUrl}/balance-trackings`;
        this.controller = new BalanceTrackingsController_1.default();
    }
    configure(app, apiId) {
        app.route(`${this.baseUrl}/create`).post((req, res) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req, res) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req, res) => this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/get-balance/:id`).get((req, res) => this.controller.getBalance(req, res, apiId + "04"));
        app.route(`${this.baseUrl}/get-balances`).get((req, res) => this.controller.getLatestBalances(req, res, apiId + "05"));
        app.route(`${this.baseUrl}/get-schedule-report/:id`).get((req, res) => this.controller.getScheduleReport(req, res, apiId + "06"));
        app.route(`${this.baseUrl}/get-general-ledger-report/:id`).get((req, res) => this.controller.getGeneralLedgerReport(req, res, apiId + "07"));
    }
}
exports.default = BalanceTrackingsRoute;
