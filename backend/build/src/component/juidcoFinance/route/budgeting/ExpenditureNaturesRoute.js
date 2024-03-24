"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExpenditureNaturesController_1 = __importDefault(require("../../controller/budgeting/ExpenditureNaturesController"));
const common_1 = require("../../../../util/common");
class ExpenditureNaturesRoute {
    constructor() {
        this.controller = new ExpenditureNaturesController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/expenditure-natures/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = ExpenditureNaturesRoute;
