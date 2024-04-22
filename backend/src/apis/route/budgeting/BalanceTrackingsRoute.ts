import express from "express";
import BalanceTrackingsController from "../../controller/budgeting/BalanceTrackingsController";
import { APIv1 } from "../../APIv1";

/**
 * | Author- Bijoy Paitandi
 * | Created for- BalanceTrackings Route
 * | Status: open
 */


class BalanceTrackingsRoute extends APIv1 {
    private controller: BalanceTrackingsController;
    constructor(routeId: string, app: express.Application){
        super(routeId, app, "balance-trackings");
        this.controller = new BalanceTrackingsController();
    }

    configure() : void {
        this.addGetRoute("get-all", this.controller.get);
        this.addGetRoute(`get-by-id/:id`, this.controller.getById);
        this.addGetRoute('get-balance/:id', this.controller.getBalance);
        this.addGetRoute('get-balances',this.controller.getLatestBalances);
        this.addGetRoute('get-schedule-report/:id', this.controller.getScheduleReport);
        this.addGetRoute('get-general-ledger-report/:id', this.controller.getGeneralLedgerReport);
        this.addGetRoute('get-fin-years', this.controller.getFinYears);
        
        this.addGetRoute('get-trial-balance', this.controller.getTrialBalance);
        this.addGetRoute('get-income-statement', this.controller.getIncomeStatement);
        this.addGetRoute('get-balance-sheet', this.controller.getBalanceSheet);
    }
}

export default BalanceTrackingsRoute;