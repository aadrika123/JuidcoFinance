"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountCodeController_1 = __importDefault(require("../../controller/masters/accountCodeController"));
const common_1 = require("../../../../util/common");
/**
 * | Route - 01
 */
class AccountCodeRoute {
    constructor() {
        this.accountingCodeController = new accountCodeController_1.default();
    }
    configure(app, apiId) {
        app
            .route(`${common_1.baseUrl}/get-account-code`)
            .get((req, res) => this.accountingCodeController.getAccountCode(req, res, apiId + "01"));
        app
            .route(`${common_1.baseUrl}/get-all-account-code`)
            .get((req, res) => this.accountingCodeController.getAllAccountingCode(req, res, apiId + "02"));
        app
            .route(`${common_1.baseUrl}/get-main-account-codes`)
            .get((req, res) => this.accountingCodeController.getMainAccountingCode(req, res, apiId + "03"));
        app
            .route(`${common_1.baseUrl}/get-sub-account-codes`)
            .get((req, res) => this.accountingCodeController.getSubAccountingCode(req, res, apiId + "04"));
        app
            .route(`${common_1.baseUrl}/get-child-account-codes/:id`)
            .get((req, res) => this.accountingCodeController.getChildAccountingCode(req, res, apiId + "05"));
        app
            .route(`${common_1.baseUrl}/get-parent-account-code/:id`)
            .get((req, res) => this.accountingCodeController.getParentCode(req, res, apiId + "06"));
        app
            .route(`${common_1.baseUrl}/get-codes-with-parent-detail`)
            .get((req, res) => this.accountingCodeController.getCodesWithParentDetail(req, res, apiId + "07"));
        app
            .route(`${common_1.baseUrl}/request-new-acc-code`)
            .post((req, res) => this.accountingCodeController.requestingNewCode(req, res, apiId + "08"));
    }
}
exports.default = AccountCodeRoute;
