"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmployeesController_1 = __importDefault(require("../../controller/budgeting/EmployeesController"));
const common_1 = require("../../../../util/common");
class EmployeesRoute {
    constructor() {
        this.controller = new EmployeesController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/employees/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = EmployeesRoute;
