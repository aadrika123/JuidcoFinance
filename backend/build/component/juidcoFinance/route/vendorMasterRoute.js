"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const vendorMasterController_1 = __importDefault(require("../controller/vendorMasterController"));
class VendorMasterRoute {
    constructor() {
        this.vendorMasterController = new vendorMasterController_1.default();
    }
    configure(app) {
        app
            .route(`${common_1.baseUrl}/vendor-master/create`)
            .post(this.vendorMasterController.create); // 0701
        app.route(`${common_1.baseUrl}/vendor-master/get`).get(this.vendorMasterController.get); //0702
        app
            .route(`${common_1.baseUrl}/vendor-master/get/:vendorId`)
            .get(this.vendorMasterController.getById); // 0703
        app
            .route(`${common_1.baseUrl}/vendor-master/update`)
            .post(this.vendorMasterController.update); // 0704
    }
}
exports.default = VendorMasterRoute;
