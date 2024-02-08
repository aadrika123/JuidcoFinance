"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const funCodeRoute_1 = __importDefault(require("./route/masters/funCodeRoute"));
const bankMasterRoute_1 = __importDefault(require("./route/masters/bankMasterRoute"));
const accountCodeRoute_1 = __importDefault(require("./route/masters/accountCodeRoute"));
const munciCodeRoute_1 = __importDefault(require("./route/masters/munciCodeRoute"));
const vendorTypeRoute_1 = __importDefault(require("./route/vendorTypeRoute"));
const departmentRoute_1 = __importDefault(require("./route/departmentRoute"));
const vendorMasterRoute_1 = __importDefault(require("./route/masters/vendorMasterRoute"));
const chequebookEntryRoute_1 = __importDefault(require("./route/masters/chequebookEntryRoute"));
const dirPaymentEntryRoute_1 = __importDefault(require("./route/transactions/dirPaymentEntryRoute"));
const paymentTypeRoute_1 = __importDefault(require("./route/paymentTypeRoute"));
const adminisWardRoute_1 = __importDefault(require("./route/adminisWardRoute"));
const grantRoute_1 = __importDefault(require("./route/grantRoute"));
const employeeRoute_1 = __importDefault(require("./route/employeeRoute"));
const billTypeRoute_1 = __importDefault(require("./route/billTypeRoute"));
const receiptEntryRoute_1 = __importDefault(require("./route/masters/receiptEntryRoute"));
const voucherTypeRoute_1 = __importDefault(require("./route/voucherTypeRoute"));
const voucherSubTypeRoute_1 = __importDefault(require("./route/voucherSubTypeRoute"));
const subLedgerRoute_1 = __importDefault(require("./route/subLedgerRoute"));
const voucherEntryRoute_1 = __importDefault(require("./route/documentation/voucherEntryRoute"));
const billInvoicesRoute_1 = __importDefault(require("./route/transactions/billInvoicesRoute"));
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
        /// PAYMENT_TYPE ///
        this.paymentTypeRoute = new paymentTypeRoute_1.default();
        this.paymentTypeRoute.configure(app); // 10
        /// ADMINISTRATIVE_WARD ///
        this.adminisWardRoute = new adminisWardRoute_1.default();
        this.adminisWardRoute.configure(app); // 11
        /// GRANT ///
        this.grantRoute = new grantRoute_1.default();
        this.grantRoute.configure(app); // 12
        /// EMPLOYEE ///
        this.employeeRoute = new employeeRoute_1.default();
        this.employeeRoute.configure(app); // 13
        /// BILL TYPE ///
        this.billTypeRoute = new billTypeRoute_1.default();
        this.billTypeRoute.configure(app); // 14
        /// RECEIPTS ///
        this.receiptsRoute = new receiptEntryRoute_1.default();
        this.receiptsRoute.configure(app); //19
        this.billTypeRoute.configure(app); // 14
        // VOUCHER_TYPE ///
        this.voucherTypeRoute = new voucherTypeRoute_1.default();
        this.voucherTypeRoute.configure(app); // 15
        // VOUCHER_SUB_TYPE ///
        this.voucherSubTypeRoute = new voucherSubTypeRoute_1.default();
        this.voucherSubTypeRoute.configure(app); // 16
        // VOUCHER_SUB_TYPE ///
        this.subLedgerRoute = new subLedgerRoute_1.default();
        this.subLedgerRoute.configure(app); // 17
        // VOUCHER_ENTRY_ROUTES ///
        this.voucherEntryRoute = new voucherEntryRoute_1.default();
        this.voucherEntryRoute.configure(app, "18");
        // Bill Invoice Entries ///
        (new billInvoicesRoute_1.default()).configure(app, "19");
    }
}
exports.default = FinanceRoute;
