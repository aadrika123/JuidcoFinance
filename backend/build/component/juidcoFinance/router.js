"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./route/router"));
const funCodeRoute_1 = __importDefault(require("./route/funCodeRoute"));
const bankMasterRoute_1 = __importDefault(require("./route/bankMasterRoute"));
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
        /// ROUTER ///
        this.router = new router_1.default();
        this.router.configure(app); // 01
        /// FUNCTION_CODE_ROUTER ///
        this.funCodeRoute = new funCodeRoute_1.default();
        this.funCodeRoute.configure(app); // 02
        /// BANK_MASTER_ROUTE ///
        this.bankMasterRoute = new bankMasterRoute_1.default();
        this.bankMasterRoute.configure(app); //03
    }
}
exports.default = FinanceRoute;
