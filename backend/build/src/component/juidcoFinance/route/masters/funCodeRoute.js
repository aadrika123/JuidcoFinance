"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../../util/common");
const funCodeController_1 = __importDefault(require("../../controller/masters/funCodeController"));
/**
 * | Route - 02
 */
class FunCodeRoute {
    constructor() {
        this.funCodeController = new funCodeController_1.default();
    }
    configure(app) {
        app.route(`${common_1.baseUrl}/get-fun-code`).get(this.funCodeController.getFunCode); //0201
        app.route(`${common_1.baseUrl}/get-all-fun-codes`).get(this.funCodeController.getAll); //0202
    }
}
exports.default = FunCodeRoute;
