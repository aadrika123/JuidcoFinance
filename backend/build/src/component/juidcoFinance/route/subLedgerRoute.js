"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const subLedgerController_1 = __importDefault(require("../controller/subLedgerController"));
/**
 * | Route - 17
 */
class SubLedgerRoute {
    constructor() {
        this.subLedgerController = new subLedgerController_1.default();
    }
    configure(app, apiId) {
        app.route(`${common_1.baseUrl}/sub-ledger/get`).get((req, res) => this.subLedgerController.get(req, res, apiId + "01")); //01
        app.route(`${common_1.baseUrl}/sub-ledger/get-codes`).get((req, res) => this.subLedgerController.getCodes(req, res, apiId + "02")); //01
    }
}
exports.default = SubLedgerRoute;
