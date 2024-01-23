"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bankMasterController_1 = __importDefault(require("../controller/bankMasterController"));
const common_1 = require("../../../util/common");
/**
 * | Route - 04
 */
class BankMasterRoute {
    constructor() {
        this.bankMasterController = new bankMasterController_1.default();
    }
    configure(app) {
        app.route(`${common_1.baseUrl}/bank-master/create`).post(this.bankMasterController.create); //0401
        app.route(`${common_1.baseUrl}/bank-master/get-all`).get(this.bankMasterController.get); //0402
        app.route(`${common_1.baseUrl}/bank-master/get-by-id/:bankId`).get(this.bankMasterController.getById); //0403
        app.route(`${common_1.baseUrl}/bank-master/update`).post(this.bankMasterController.update); //0404
        app.route(`${common_1.baseUrl}/bank-master/search`).get(this.bankMasterController.search); //0405
    }
}
exports.default = BankMasterRoute;
