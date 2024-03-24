"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const receiptTypeController_1 = __importDefault(require("../controller/receiptTypeController"));
class ReceiptTypeRoute {
    constructor() {
        this.controller = new receiptTypeController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/receipt-types/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = ReceiptTypeRoute;
