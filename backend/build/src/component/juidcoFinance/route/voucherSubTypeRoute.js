"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const VoucherSubTypeController_1 = __importDefault(require("../controller/VoucherSubTypeController"));
/**
 * | Route - 16
 */
class VoucherSubTypeRoute {
    constructor() {
        this.voucherSubTypeController = new VoucherSubTypeController_1.default();
    }
    configure(app) {
        app
            .route(`${common_1.baseUrl}/voucher-sub-type/get`)
            .get(this.voucherSubTypeController.get); //01
    }
}
exports.default = VoucherSubTypeRoute;
