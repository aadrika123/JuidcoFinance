"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const grantController_1 = __importDefault(require("../controller/grantController"));
/**
 * | Route - 12
 */
class GrantRoute {
    constructor() {
        this.grantController = new grantController_1.default();
    }
    configure(app) {
        app.route(`${common_1.baseUrl}/grant/get`).get(this.grantController.getGrants); //1201
    }
}
exports.default = GrantRoute;
