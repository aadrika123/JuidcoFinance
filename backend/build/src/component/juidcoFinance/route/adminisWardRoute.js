"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const administrativeWardController_1 = __importDefault(require("../controller/administrativeWardController"));
/**
 * | Route - 11
 */
class AdministrativeWardRoute {
    constructor() {
        this.administrativeWardController = new administrativeWardController_1.default();
    }
    configure(app) {
        app.route(`${common_1.baseUrl}/adminis-ward/get`).get(this.administrativeWardController.getAdministrativeWards); //1101
    }
}
exports.default = AdministrativeWardRoute;
