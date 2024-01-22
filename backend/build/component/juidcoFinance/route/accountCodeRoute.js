"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountCodeController_1 = __importDefault(require("../controller/accountCodeController"));
const common_1 = require("../../../util/common");
/**
 * | Route - 01
 */
class AccountCodeRoute {
    constructor() {
        this.accountingCodeController = new accountCodeController_1.default();
    }
    configure(app) {
        app
            .route(`${common_1.baseUrl}/get-account-code`)
            .get(this.accountingCodeController.getAccountCode); //0101
    }
}
exports.default = AccountCodeRoute;
