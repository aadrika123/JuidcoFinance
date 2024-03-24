"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const ChequeIssuancesController_1 = __importDefault(require("../../controller/documentation/ChequeIssuancesController"));
/**
 * | Author- Bijoy Paitandi
 * | Created for- ChequeIssuances Route
 * | Status: open
 */
class ChequeIssuancesRoute {
    constructor() {
        this.baseUrl = `${common_1.baseUrl}/cheque-issuances`;
        this.controller = new ChequeIssuancesController_1.default();
    }
    configure(app, apiId) {
        app.route(`${this.baseUrl}/create`).post((req, res) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req, res) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req, res) => this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req, res) => this.controller.update(req, res, apiId + "04"));
    }
}
exports.default = ChequeIssuancesRoute;
