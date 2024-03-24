"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const ReceiptModesController_1 = __importDefault(require("../../controller/masters/ReceiptModesController"));
/**
 * | Author- Sanjiv Kumar
 * | Created for- Receipt Modes Route
 * | Status: Done
 */
class ReceiptModesRoute {
    constructor() {
        this.controller = new ReceiptModesController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/receipt-modes/get-all`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = ReceiptModesRoute;
