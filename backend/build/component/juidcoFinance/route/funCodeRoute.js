"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const funCodeController_1 = __importDefault(require("../controller/funCodeController"));
/**
 * | Route - 02
 */
class FunCodeRoute {
    constructor() {
        this.funCodeController = new funCodeController_1.default();
    }
    configure(app) {
        app.route(`/api/v1/get-fun-code`).get(this.funCodeController.getFunCode); //0201
    }
}
exports.default = FunCodeRoute;
