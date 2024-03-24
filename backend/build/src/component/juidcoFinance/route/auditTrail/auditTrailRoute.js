"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const auditTrail_1 = __importDefault(require("../../auditTrail/auditTrail"));
class AuditTrailRoute {
    constructor() {
        this.auditTrail = new auditTrail_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/audit-trails/get`).get((req, res) => this.auditTrail.get(req, res, apiId + "01")); // 4801
        app.route(`${common_1.baseUrl}/audit-trails/report/get`).get((req, res) => this.auditTrail.getPreviousMonthsData(req, res, apiId + "01")); //4802
    }
}
exports.default = AuditTrailRoute;
