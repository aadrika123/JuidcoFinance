"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GrantNaturesController_1 = __importDefault(require("../../controller/budgeting/GrantNaturesController"));
const common_1 = require("../../../../util/common");
class GrantNaturesRoute {
    constructor() {
        this.controller = new GrantNaturesController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/grant-natures/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = GrantNaturesRoute;
