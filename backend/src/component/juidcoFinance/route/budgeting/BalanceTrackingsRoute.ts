import express, { Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
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
    }
}

export default BalanceTrackingsRoute;