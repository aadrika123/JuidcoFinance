"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const RevenueModulesController_1 = __importDefault(require("../../controller/masters/RevenueModulesController"));
/**
 * | Author- Sanjiv Kumar
 * | Created for- Receipt Modules Route
 * | Status: Done
 */
class RevenueModulesRoute {
    constructor() {
        this.controller = new RevenueModulesController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/revenue-modules/get-all`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = RevenueModulesRoute;
