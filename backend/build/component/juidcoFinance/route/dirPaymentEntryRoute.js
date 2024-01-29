"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const dirPaymentEntryController_1 = __importDefault(require("../controller/dirPaymentEntryController"));
/**
 * | Route - 09
 */
class DirPaymentEntryRoute {
    constructor() {
        this.dirPaymentEntryController = new dirPaymentEntryController_1.default();
    }
    configure(app) {
        app.route(`${common_1.baseUrl}/direct-payment-entry/create`).post(this.dirPaymentEntryController.create); //0901
        app.route(`${common_1.baseUrl}/direct-payment-entry/get-all`).get(this.dirPaymentEntryController.get); //0902
        app.route(`${common_1.baseUrl}/direct-payment-entry/get-by-id/:id`).get(this.dirPaymentEntryController.getById); //0903
        app.route(`${common_1.baseUrl}/direct-payment-entry/update`).post(this.dirPaymentEntryController.update); //0904
    }
}
exports.default = DirPaymentEntryRoute;
