import express, { Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import OpeningBalancesController from "../../controller/budgeting/OpeningBalancesController";

/**
 * | Author- Bijoy Paitandi
 * | Created for- OpeningBalances Route
 * | Status: open
 */


class OpeningBalancesRoute {
    private controller: OpeningBalancesController;
    private baseUrl: string = `${baseUrl}/opening-balances`;
    constructor(){
        this.controller = new OpeningBalancesController();
    }

    configure(app: express.Application, apiId: string) : void {
        app.route(`${this.baseUrl}/create`).post((req: Request, res: Response) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req: Request, res: Response) =>this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req: Request, res: Response) =>this.controller.update(req, res, apiId + "04"));
    }
}

export default OpeningBalancesRoute;