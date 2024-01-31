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
  private accountCodeRoute: AccountCodeRoute;
  private funCodeRoute: FunCodeRoute;
  private muncipalityCodeRoute: MuncipalityCodeRoute;
  private bankMasterRoute: BankMasterRoute;
  private vendorTypeRoute: VendorTypeRoute;
  private departmentRoute: DepartmentRoute;
  private vendorMasterRoute: VendorMasterRoute;
  private chequebookEntryRoute: ChequeBookEntryRoute;
  private dirPaymentEntryRoute: DirPaymentEntryRoute;
  private paymentTypeRoute: PaymentTypeRoute;
  private adminisWardRoute: AdministrativeWardRoute;
  private grantRoute: GrantRoute;

  constructor(app: express.Application) {
    /// ACCOUNTING_CODE_ROUTER ///
    this.accountCodeRoute = new AccountCodeRoute();
    this.accountCodeRoute.configure(app); // 01

    /// FUNCTION_CODE_ROUTER ///
    this.funCodeRoute = new FunCodeRoute();
    this.funCodeRoute.configure(app); // 02

    //  MUNCIPALITY_CODE_ROUTER ///
    this.muncipalityCodeRoute = new MuncipalityCodeRoute();
    this.muncipalityCodeRoute.configure(app); // 03

    /// BANK_MASTER_ROUTE ///
    this.bankMasterRoute = new BankMasterRoute();
    this.bankMasterRoute.configure(app); // 04

    /// VENDOR_TYPE_ROUTE ///
    this.vendorTypeRoute = new VendorTypeRoute();
    this.vendorTypeRoute.configure(app);  // 05

    /// DEPARTMENT_ROUTE ///
    this.departmentRoute = new DepartmentRoute();
    this.departmentRoute.configure(app)  // 06

    // VENDOR_MASTER_ROUTE ///
    this.vendorMasterRoute = new VendorMasterRoute();
    this.vendorMasterRoute.configure(app); // 07

    /// CHECKBOOK_ENTRY_ROUTE ///
    this.chequebookEntryRoute = new ChequeBookEntryRoute();
    this.chequebookEntryRoute.configure(app);  // 08

    /// DIRECT_PAYMENT_ENTRY ///
    this.dirPaymentEntryRoute = new DirPaymentEntryRoute();
    this.dirPaymentEntryRoute.configure(app);  // 09

    /// PAYMENT_TYPE ///
    this.paymentTypeRoute = new PaymentTypeRoute();
    this.paymentTypeRoute.configure(app);  // 10

    /// ADMINISTRATIVE_WARD ///
    this.adminisWardRoute = new AdministrativeWardRoute();
    this.adminisWardRoute.configure(app);  // 11

    /// GRANT ///
    this.grantRoute = new GrantRoute();
    this.grantRoute.configure(app);  // 12
  }
}

export default FinanceRoute;
