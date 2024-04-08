import express, { Request, Response } from "express";
import { baseUrl } from "../../../util/common";
import BalanceTrackingsController from "../../controller/budgeting/BalanceTrackingsController";

/**
 * | Author- Bijoy Paitandi
 * | Created for- BalanceTrackings Route
 * | Status: open
 */


class BalanceTrackingsRoute {
    private controller: BalanceTrackingsController;
    private baseUrl: string = `${baseUrl}/balance-trackings`;
    constructor(){
        this.controller = new BalanceTrackingsController();
    }

    configure(app: express.Application, apiId: string) : void {
        app.route(`${this.baseUrl}/create`).post((req: Request, res: Response) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req: Request, res: Response) =>this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/get-balance/:id`).get((req: Request, res: Response) =>this.controller.getBalance(req, res, apiId + "04"));
        app.route(`${this.baseUrl}/get-balances`).get((req: Request, res: Response) =>this.controller.getLatestBalances(req, res, apiId + "05"));
        app.route(`${this.baseUrl}/get-schedule-report/:id`).get((req: Request, res: Response) =>this.controller.getScheduleReport(req, res, apiId + "06"));

        app.route(`${this.baseUrl}/get-general-ledger-report/:id`).get((req: Request, res: Response) =>this.controller.getGeneralLedgerReport(req, res, apiId + "07"));

        app.route(`${this.baseUrl}/get-fin-years`).get((req: Request, res: Response) => this.controller.getFinYears(req, res, apiId + "08"));
        

    }
}

export default BalanceTrackingsRoute;