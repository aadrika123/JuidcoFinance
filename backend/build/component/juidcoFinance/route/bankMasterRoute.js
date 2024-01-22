"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bankMasterController_1 = __importDefault(require("../controller/bankMasterController"));
const comman_1 = require("../../../util/comman");
/**
 * | Route - 03
 */
class BankMasterRoute {
    constructor() {
        this.bankMasterController = new bankMasterController_1.default();
    }
    configure(app) {
        app.route(`${comman_1.baseUrl}/bank-master/create`).post(this.bankMasterController.create); //0301
    }
}
exports.default = BankMasterRoute;
