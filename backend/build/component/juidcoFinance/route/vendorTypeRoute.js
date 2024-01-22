"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const vendorTypeController_1 = __importDefault(require("../controller/vendorTypeController"));
/**
 * | Route - 05
 */
class VendorTypeRoute {
    constructor() {
        this.vendorTypeController = new vendorTypeController_1.default();
    }
    configure(app) {
        app.route(`${common_1.baseUrl}/vendor-type/get`).get(this.vendorTypeController.get); //01
    }
}
exports.default = VendorTypeRoute;
