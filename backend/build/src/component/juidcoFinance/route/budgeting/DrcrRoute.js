"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DrcrController_1 = __importDefault(require("../../controller/budgeting/DrcrController"));
const common_1 = require("../../../../util/common");
class DrcrRoute {
    constructor() {
        this.controller = new DrcrController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/drcr/get`).get((req, res) => this.controller.get(req, res, apiId + "01"));
    }
}
exports.default = DrcrRoute;
