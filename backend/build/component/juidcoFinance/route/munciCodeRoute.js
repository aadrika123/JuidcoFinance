"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../util/common");
const munciCodeController_1 = __importDefault(require("../controller/munciCodeController"));
class MuncipalityCodeRoute {
    constructor() {
        this.muncipalityCodeController = new munciCodeController_1.default();
    }
    configure(app) {
        app
            .route(`${common_1.baseUrl}/get-munci-code`)
            .get(this.muncipalityCodeController.getMuncipalityCode); //0301
    }
}
exports.default = MuncipalityCodeRoute;
