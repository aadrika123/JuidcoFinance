"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const paymentTypeController_1 = __importDefault(require("../controller/paymentTypeController"));
/**
 * | Route - 10
 */
class PaymentTypeRoute {
    constructor() {
        this.paymentTypeController = new paymentTypeController_1.default();
    }
    configure(app) {
        app.route(`${common_1.baseUrl}/payment-type/get`).get(this.paymentTypeController.getPaymentTypes); //1001
    }
}
exports.default = PaymentTypeRoute;
