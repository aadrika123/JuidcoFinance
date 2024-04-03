import express, { Request, Response } from "express";
import { baseUrl } from "../../../util/common";
import BudgetAppropriationsController from "../../controller/budgeting/BudgetAppropriationsController";

/**
 * | Author- Bijoy Paitandi
 * | Created for- BudgetAppropriations Route
 * | Status: open
 */


class BudgetAppropriationsRoute {
    private controller: BudgetAppropriationsController;
    private baseUrl: string = `${baseUrl}/budget-appropriations`;
    constructor(){
        this.controller = new BudgetAppropriationsController();
    }

    configure(app: express.Application, apiId: string) : void {
        app.route(`${this.baseUrl}/create`).post((req: Request, res: Response) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req: Request, res: Response) =>this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req: Request, res: Response) =>this.controller.update(req, res, apiId + "04"));
        app.route(`${this.baseUrl}/get-current-amounts/:id`).get((req: Request, res: Response) => this.controller.getCurrentAmounts(req, res, apiId + "05"));

    }
}

export default BudgetAppropriationsRoute;