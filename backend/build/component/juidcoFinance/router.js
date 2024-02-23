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
const billTypeRoute_1 = __importDefault(require("./route/billTypeRoute"));
const receiptEntryRoute_1 = __importDefault(require("./route/masters/receiptEntryRoute"));
const voucherTypeRoute_1 = __importDefault(require("./route/voucherTypeRoute"));
const voucherSubTypeRoute_1 = __importDefault(require("./route/voucherSubTypeRoute"));
const subLedgerRoute_1 = __importDefault(require("./route/subLedgerRoute"));
const voucherEntryRoute_1 = __importDefault(require("./route/documentation/voucherEntryRoute"));
const billInvoicesRoute_1 = __importDefault(require("./route/transactions/billInvoicesRoute"));
const billPaymentEntryRoute_1 = __importDefault(require("./route/transactions/billPaymentEntryRoute"));
const ChequeIssuancesRoute_1 = __importDefault(require("./route/documentation/ChequeIssuancesRoute"));
const bankRoute_1 = __importDefault(require("./route/bankRoute"));
const moduleRoute_1 = __importDefault(require("./route/moduleRoute"));
const receiptTypeRoute_1 = __importDefault(require("./route/receiptTypeRoute"));
const BudgetTypesRoute_1 = __importDefault(require("./route/budgeting/BudgetTypesRoute"));
const FinancialYearsRoute_1 = __importDefault(require("./route/budgeting/FinancialYearsRoute"));
const BudgetAppropriationsRoute_1 = __importDefault(require("./route/budgeting/BudgetAppropriationsRoute"));
const ReceiptBudgetsRoute_1 = __importDefault(require("./route/budgeting/ReceiptBudgetsRoute"));
const BudgetReappropriationsRoute_1 = __importDefault(require("./route/budgeting/BudgetReappropriationsRoute"));
const OpeningBalancesRoute_1 = __importDefault(require("./route/budgeting/OpeningBalancesRoute"));
const RevisedBudgetsRoute_1 = __importDefault(require("./route/budgeting/RevisedBudgetsRoute"));
const InvestmentTypesRoute_1 = __importDefault(require("./route/budgeting/InvestmentTypesRoute"));
const InvestmentsRoute_1 = __importDefault(require("./route/budgeting/InvestmentsRoute"));
const BalanceTrackingsRoute_1 = __importDefault(require("./route/budgeting/BalanceTrackingsRoute"));
const GrantEntriesRoute_1 = __importDefault(require("./route/budgeting/GrantEntriesRoute"));
const GrantNaturesRoute_1 = __importDefault(require("./route/budgeting/GrantNaturesRoute"));
const ExpenditureNaturesRoute_1 = __importDefault(require("./route/budgeting/ExpenditureNaturesRoute"));
const EmployeesRoute_1 = __importDefault(require("./route/budgeting/EmployeesRoute"));
const BudgetNamesRoute_1 = __importDefault(require("./route/budgeting/BudgetNamesRoute"));
const DrcrRoute_1 = __importDefault(require("./route/budgeting/DrcrRoute"));
const LoanManagementRoute_1 = __importDefault(require("./route/budgeting/LoanManagementRoute"));
const AdvanceManagementRoute_1 = __importDefault(require("./route/budgeting/AdvanceManagementRoute"));
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
        (new accountCodeRoute_1.default()).configure(app, "01");
        /// FUNCTION_CODE_ROUTER ///
        this.funCodeRoute = new funCodeRoute_1.default();
        this.funCodeRoute.configure(app); // 02
        //  MUNCIPALITY_CODE_ROUTER ///
        (new munciCodeRoute_1.default()).configure(app, "03");
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
        (new vendorMasterRoute_1.default()).configure(app, "07");
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
        (new EmployeesRoute_1.default()).configure(app, "13");
        /// BILL TYPE ///
        this.billTypeRoute = new billTypeRoute_1.default();
        this.billTypeRoute.configure(app); // 14
        this.billTypeRoute.configure(app); // 14
        // VOUCHER_TYPE ///
        this.voucherTypeRoute = new voucherTypeRoute_1.default();
        this.voucherTypeRoute.configure(app); // 15
        // VOUCHER_SUB_TYPE ///
        this.voucherSubTypeRoute = new voucherSubTypeRoute_1.default();
        this.voucherSubTypeRoute.configure(app); // 16
        // VOUCHER_SUB_TYPE ///
        this.subLedgerRoute = new subLedgerRoute_1.default();
        this.subLedgerRoute.configure(app, "17"); // 17
        // VOUCHER_ENTRY_ROUTES ///
        this.voucherEntryRoute = new voucherEntryRoute_1.default();
        this.voucherEntryRoute.configure(app, "18");
        (new billInvoicesRoute_1.default()).configure(app, "19");
        (new billPaymentEntryRoute_1.default()).configure(app, "20");
        (new ChequeIssuancesRoute_1.default()).configure(app, "21");
        (new bankRoute_1.default()).configure(app, "22");
        (new moduleRoute_1.default()).configure(app, "23");
        (new receiptTypeRoute_1.default()).configure(app, "24");
        (new receiptEntryRoute_1.default()).configure(app, "25");
        (new BudgetTypesRoute_1.default()).configure(app, "26");
        (new FinancialYearsRoute_1.default()).configure(app, "27");
        (new ReceiptBudgetsRoute_1.default()).configure(app, "28");
        (new BudgetAppropriationsRoute_1.default()).configure(app, "29");
        (new BudgetReappropriationsRoute_1.default()).configure(app, "30");
        (new OpeningBalancesRoute_1.default()).configure(app, "31");
        (new RevisedBudgetsRoute_1.default()).configure(app, "32");
        (new InvestmentTypesRoute_1.default()).configure(app, "33");
        (new InvestmentsRoute_1.default()).configure(app, "34");
        (new BalanceTrackingsRoute_1.default()).configure(app, "35");
        (new GrantEntriesRoute_1.default()).configure(app, "36");
        (new GrantNaturesRoute_1.default()).configure(app, "37");
        (new ExpenditureNaturesRoute_1.default()).configure(app, "38");
        (new BudgetNamesRoute_1.default()).configure(app, "39");
        (new DrcrRoute_1.default()).configure(app, "40");
        (new LoanManagementRoute_1.default()).configure(app, "41"); // 41
        (new AdvanceManagementRoute_1.default()).configure(app, "42"); // 42
    }
}
exports.default = FinanceRoute;
