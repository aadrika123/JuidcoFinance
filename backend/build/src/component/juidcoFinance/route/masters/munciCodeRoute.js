"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const munciCodeController_1 = __importDefault(require("../../controller/masters/munciCodeController"));
class MuncipalityCodeRoute {
    constructor() {
        this.muncipalityCodeController = new munciCodeController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/get-munci-code`).get((req, res) => this.muncipalityCodeController.getMuncipalityCode(req, res, apiId + "01"));
        app.route(`${common_1.baseUrl}/get-all-munci-code`).get((req, res) => this.muncipalityCodeController.getAllMunicipalityCode(req, res, apiId + "02"));
    }
}
exports.default = MuncipalityCodeRoute;
