import express, { Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import AdvanceManagementController from "../../controller/budgeting/AdvanceManagementController";

/**
 * | Author- Sanjiv Kumar
 * | Created for- AdvanceManagement Route
 * | Status: open
 */


class AdvanceManagementRoute {
    private controller: AdvanceManagementController;
    private baseUrl: string = `${baseUrl}/advance-management`;
    constructor(){
        this.controller = new AdvanceManagementController();
    }

    configure(app: express.Application, apiId: string) : void {
        app.route(`${this.baseUrl}/create`).post((req: Request, res: Response) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req: Request, res: Response) =>this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req: Request, res: Response) =>this.controller.update(req, res, apiId + "04"));
    }
}

export default AdvanceManagementRoute;