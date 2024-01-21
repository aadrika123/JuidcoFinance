import express from "express";
import Router from "./route/router";
import FunCodeRoute from "./route/funCodeRoute";
import BankMasterRoute from "./route/bankMasterRoute";

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
  private router: Router;
  private funCodeRoute: FunCodeRoute;
  private bankMasterRoute: BankMasterRoute;

  constructor(app: express.Application) {
    /// ROUTER ///
    this.router = new Router();
    this.router.configure(app); // 01

    /// FUNCTION_CODE_ROUTER ///
    this.funCodeRoute = new FunCodeRoute();
    this.funCodeRoute.configure(app); // 02

    /// BANK_MASTER_ROUTE ///
    this.bankMasterRoute = new BankMasterRoute();
    this.bankMasterRoute.configure(app); //03
  }
}

export default FinanceRoute;
