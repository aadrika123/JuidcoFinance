import express from "express";
import FunCodeRoute from "./route/funCodeRoute";
import BankMasterRoute from "./route/bankMasterRoute";
import AccountCodeRoute from "./route/accountCodeRoute";
import MuncipalityCodeRoute from "./route/munciCodeRoute";
import VendorTypeRoute from "./route/vendorTypeRoute";
import DepartmentRoute from "./route/departmentRoute";
import VendorMasterRoute from "./route/vendorMasterRoute";
import ChequeBookEntryRoute from "./route/chequebookEntryRoute";

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
    this.vendorMasterRoute.configure(app); //07

    /// CHECKBOOK_ENTRY_ROUTE ///
    this.chequebookEntryRoute = new ChequeBookEntryRoute();
    this.chequebookEntryRoute.configure(app);
  
  }
}

export default FinanceRoute;
