"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const VoucherTypeController_1 = __importDefault(require("../controller/VoucherTypeController"));
/**
 * | Route - 15
 */
class VoucherTypeRoute {
    constructor() {
        this.voucherTypeController = new VoucherTypeController_1.default();
    }
    configure(app) {
        app
            .route(`${common_1.baseUrl}/voucher-type/get`)
            .get(this.voucherTypeController.get); //01
    }
}
exports.default = VoucherTypeRoute;
