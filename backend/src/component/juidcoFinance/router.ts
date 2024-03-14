import express from "express";
import FunCodeRoute from "./route/masters/funCodeRoute";
import BankMasterRoute from "./route/masters/bankMasterRoute";
import AccountCodeRoute from "./route/masters/accountCodeRoute";
import MuncipalityCodeRoute from "./route/masters/munciCodeRoute";
import VendorTypeRoute from "./route/vendorTypeRoute";
import DepartmentRoute from "./route/departmentRoute";
import VendorMasterRoute from "./route/masters/vendorMasterRoute";
import ChequeBookEntryRoute from "./route/masters/chequebookEntryRoute";
import DirPaymentEntryRoute from "./route/transactions/dirPaymentEntryRoute";
import PaymentTypeRoute from "./route/paymentTypeRoute";
import AdministrativeWardRoute from "./route/adminisWardRoute";
import GrantRoute from "./route/grantRoute";
import BillTypeRoute from "./route/billTypeRoute";
import ReceiptEntryRoute from "./route/masters/receiptEntryRoute";
import VoucherTypeRoute from "./route/voucherTypeRoute";
import VoucherSubTypeRoute from "./route/voucherSubTypeRoute";
import SubLedgerRoute from "./route/subLedgerRoute";
import VoucherEntryRoute from "./route/documentation/voucherEntryRoute";
import BillInvoicesRoute from "./route/transactions/billInvoicesRoute";
import BillPaymentEntryRoute from "./route/transactions/billPaymentEntryRoute";
import ChequeIssuancesRoute from "./route/documentation/ChequeIssuancesRoute";
import BankRoute from "./route/bankRoute";
import ModuleRoute from "./route/moduleRoute";
import ReceiptTypeRoute from "./route/receiptTypeRoute";
import BudgetTypesRoute from "./route/budgeting/BudgetTypesRoute";
import FinancialYearsRoute from "./route/budgeting/FinancialYearsRoute";
import BudgetAppropriationsRoute from "./route/budgeting/BudgetAppropriationsRoute";
import ReceiptBudgetsRoute from "./route/budgeting/ReceiptBudgetsRoute";
import BudgetReappropriationsRoute from "./route/budgeting/BudgetReappropriationsRoute";
import OpeningBalancesRoute from "./route/budgeting/OpeningBalancesRoute";
import RevisedBudgetsRoute from "./route/budgeting/RevisedBudgetsRoute";
import InvestmentTypesRoute from "./route/budgeting/InvestmentTypesRoute";
import InvestmentsRoute from "./route/budgeting/InvestmentsRoute";
import BalanceTrackingsRoute from "./route/budgeting/BalanceTrackingsRoute";
import GrantEntriesRoute from "./route/budgeting/GrantEntriesRoute";
import GrantNaturesRoute from "./route/budgeting/GrantNaturesRoute";
import ExpenditureNaturesRoute from "./route/budgeting/ExpenditureNaturesRoute";
import EmployeesRoute from "./route/budgeting/EmployeesRoute";
import BudgetNamesRoute from "./route/budgeting/BudgetNamesRoute";
import DrcrRoute from "./route/budgeting/DrcrRoute";
import LoanManagementRoute from "./route/budgeting/LoanManagementRoute";
import AdvanceManagementRoute from "./route/budgeting/AdvanceManagementRoute";
import AuthRoute from "./route/auth/Auth";
import UDHDSubDepartmentRoute from "./route/udhdSubDepartmentRoute";
import RevenueModulesRoute from "./route/masters/RevenueModulesRoute";
import ReceiptModesRoute from "./route/masters/ReceiptModesRoute";
import ReceiptRegisterRoute from "./route/masters/ReceiptRegisterRoute";
import BankTypesRoute from "./route/masters/BankTypesRoute";

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
  private funCodeRoute: FunCodeRoute;
  private bankMasterRoute: BankMasterRoute;
  private vendorTypeRoute: VendorTypeRoute;
  private departmentRoute: DepartmentRoute;
  private chequebookEntryRoute: ChequeBookEntryRoute;
  private dirPaymentEntryRoute: DirPaymentEntryRoute;
  private paymentTypeRoute: PaymentTypeRoute;
  private adminisWardRoute: AdministrativeWardRoute;
  private grantRoute: GrantRoute;
  private billTypeRoute: BillTypeRoute;
  private voucherTypeRoute: VoucherTypeRoute;
  private voucherSubTypeRoute: VoucherSubTypeRoute;
  private subLedgerRoute: SubLedgerRoute;
  private voucherEntryRoute: VoucherEntryRoute;

  constructor(app: express.Application) {
    /// ACCOUNTING_CODE_ROUTER ///
    (new AccountCodeRoute()).configure(app, "01");

    /// FUNCTION_CODE_ROUTER ///
    this.funCodeRoute = new FunCodeRoute();
    this.funCodeRoute.configure(app); // 02

    //  MUNCIPALITY_CODE_ROUTER ///
    (new MuncipalityCodeRoute()).configure(app, "03");

    /// BANK_MASTER_ROUTE ///
    this.bankMasterRoute = new BankMasterRoute();
    this.bankMasterRoute.configure(app); // 04

    /// VENDOR_TYPE_ROUTE ///
    this.vendorTypeRoute = new VendorTypeRoute();
    this.vendorTypeRoute.configure(app); // 05

    /// DEPARTMENT_ROUTE ///
    this.departmentRoute = new DepartmentRoute();
    this.departmentRoute.configure(app); // 06

    // VENDOR_MASTER_ROUTE ///
    (new VendorMasterRoute()).configure(app, "07");
    /// CHECKBOOK_ENTRY_ROUTE ///
    this.chequebookEntryRoute = new ChequeBookEntryRoute();
    this.chequebookEntryRoute.configure(app); // 08

    /// DIRECT_PAYMENT_ENTRY ///
    this.dirPaymentEntryRoute = new DirPaymentEntryRoute();
    this.dirPaymentEntryRoute.configure(app); // 09

    /// PAYMENT_TYPE ///
    this.paymentTypeRoute = new PaymentTypeRoute();
    this.paymentTypeRoute.configure(app); // 10

    /// ADMINISTRATIVE_WARD ///
    this.adminisWardRoute = new AdministrativeWardRoute();
    this.adminisWardRoute.configure(app); // 11

    /// GRANT ///
    this.grantRoute = new GrantRoute();
    this.grantRoute.configure(app); // 12

    /// EMPLOYEE ///
    (new EmployeesRoute()).configure(app, "13");

    /// BILL TYPE ///
    this.billTypeRoute = new BillTypeRoute();
    this.billTypeRoute.configure(app);  // 14


    this.billTypeRoute.configure(app); // 14

    // VOUCHER_TYPE ///
    this.voucherTypeRoute = new VoucherTypeRoute();
    this.voucherTypeRoute.configure(app); // 15

    // VOUCHER_SUB_TYPE ///
    this.voucherSubTypeRoute = new VoucherSubTypeRoute();
    this.voucherSubTypeRoute.configure(app); // 16

    // VOUCHER_SUB_TYPE ///
    this.subLedgerRoute = new SubLedgerRoute();
    this.subLedgerRoute.configure(app, "17"); // 17

    // VOUCHER_ENTRY_ROUTES ///
    this.voucherEntryRoute = new VoucherEntryRoute();
    this.voucherEntryRoute.configure(app, "18");

    (new BillInvoicesRoute()).configure(app, "19");

    (new BillPaymentEntryRoute()).configure(app, "20");

    (new ChequeIssuancesRoute()).configure(app, "21");

    (new BankRoute()).configure(app, "22");

    (new ModuleRoute()).configure(app, "23");

    (new ReceiptTypeRoute()).configure(app, "24");

    (new ReceiptEntryRoute()).configure(app,"25");

    (new BudgetTypesRoute()).configure(app, "26");
    
    (new FinancialYearsRoute()).configure(app, "27");

    (new ReceiptBudgetsRoute()).configure(app, "28");

    (new BudgetAppropriationsRoute()).configure(app, "29");

    (new BudgetReappropriationsRoute()).configure(app, "30");

    (new OpeningBalancesRoute()).configure(app, "31");

    (new RevisedBudgetsRoute()).configure(app, "32");

    (new InvestmentTypesRoute()).configure(app, "33");

    (new InvestmentsRoute()).configure(app, "34");

    (new BalanceTrackingsRoute()).configure(app, "35");

    (new GrantEntriesRoute()).configure(app, "36");

    (new GrantNaturesRoute()).configure(app, "37");

    (new ExpenditureNaturesRoute()).configure(app, "38");

    (new BudgetNamesRoute()).configure(app, "39");

    (new DrcrRoute()).configure(app, "40");

    (new LoanManagementRoute()).configure(app, "41");  // 41

    (new AdvanceManagementRoute()).configure(app, "42");  // 42

    (new AuthRoute()).configure(app, "43");  // 43

    (new UDHDSubDepartmentRoute().configure(app, "44")); // 44

    (new RevenueModulesRoute().configure(app, "45")); // 45

    (new ReceiptModesRoute().configure(app, "46")); // 46

    (new ReceiptRegisterRoute().configure(app, "47")); // 47

    (new BankTypesRoute().configure(app, "45"));
  }
}

export default FinanceRoute;
