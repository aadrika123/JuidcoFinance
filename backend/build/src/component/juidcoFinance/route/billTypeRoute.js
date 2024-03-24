"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const billTypeController_1 = __importDefault(require("../controller/billTypeController"));
/**
 * | Route - 14
 */
class BillTypeRoute {
    constructor() {
        this.billTypeController = new billTypeController_1.default();
    }
    configure(app) {
        app.route(`${common_1.baseUrl}/bill-type/get`).get(this.billTypeController.getBillTypes); //1401
    }
}
exports.default = BillTypeRoute;
