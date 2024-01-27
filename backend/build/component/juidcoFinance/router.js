"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const funCodeRoute_1 = __importDefault(require("./route/funCodeRoute"));
const bankMasterRoute_1 = __importDefault(require("./route/bankMasterRoute"));
const accountCodeRoute_1 = __importDefault(require("./route/accountCodeRoute"));
const munciCodeRoute_1 = __importDefault(require("./route/munciCodeRoute"));
const vendorTypeRoute_1 = __importDefault(require("./route/vendorTypeRoute"));
const departmentRoute_1 = __importDefault(require("./route/departmentRoute"));
const vendorMasterRoute_1 = __importDefault(require("./route/vendorMasterRoute"));
const chequebookEntryRoute_1 = __importDefault(require("./route/chequebookEntryRoute"));
const dirPaymentEntryRoute_1 = __importDefault(require("./route/dirPaymentEntryRoute"));
/*
|--------------------------------------------------------------------------
| API Routes
| Author- Sanjiv Kumar
| Created On- 20-01-2024
| Created for- juidco_finance
| Module status- Open
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
|
*/
/**
 * | Comman Route for finance
 */
class FinanceRoute {
    constructor(app) {
        /// ACCOUNTING_CODE_ROUTER ///
        this.accountCodeRoute = new accountCodeRoute_1.default();
        this.accountCodeRoute.configure(app); // 01
        /// FUNCTION_CODE_ROUTER ///
        this.funCodeRoute = new funCodeRoute_1.default();
        this.funCodeRoute.configure(app); // 02
        //  MUNCIPALITY_CODE_ROUTER ///
        this.muncipalityCodeRoute = new munciCodeRoute_1.default();
        this.muncipalityCodeRoute.configure(app); // 03
        /// BANK_MASTER_ROUTE ///
        this.bankMasterRoute = new bankMasterRoute_1.default();
        this.bankMasterRoute.configure(app); // 04
        /// VENDOR_TYPE_ROUTE ///
        this.vendorTypeRoute = new vendorTypeRoute_1.default();
        this.vendorTypeRoute.configure(app); // 05
        /// DEPARTMENT_ROUTE ///
        this.departmentRoute = new departmentRoute_1.default();
        this.departmentRoute.configure(app); // 06
        // VENDOR_MASTER_ROUTE ///
        this.vendorMasterRoute = new vendorMasterRoute_1.default();
        this.vendorMasterRoute.configure(app); // 07
        /// CHECKBOOK_ENTRY_ROUTE ///
        this.chequebookEntryRoute = new chequebookEntryRoute_1.default();
        this.chequebookEntryRoute.configure(app); // 08
        /// DIRECT_PAYMENT_ENTRY ///
        this.dirPaymentEntryRoute = new dirPaymentEntryRoute_1.default();
        this.dirPaymentEntryRoute.configure(app); // 09
    }
}
exports.default = FinanceRoute;
