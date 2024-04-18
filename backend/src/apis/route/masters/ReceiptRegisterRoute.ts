import express, { Request, Response } from "express";
import ReceiptRegisterController from "../../controller/masters/ReceiptRegisterController";
import { baseUrl } from "../../../util/common";

/**
 * | Author- Sanjiv Kumar
 * | Created for- ReceiptRegister Route
 * | Status: Done
 */


class ReceiptRegisterRoute {
    private controller: ReceiptRegisterController;
    private baseUrl: string = `${baseUrl}/receipt-register`;
    constructor(){
        this.controller = new ReceiptRegisterController();
    }

    configure(app: express.Application, apiId: string) : void {
        app.route(`${this.baseUrl}/create`).post((req: Request, res: Response) => this.controller.create(req, res, apiId + "01"));
        app.route(`${this.baseUrl}/get-all`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "02"));
        app.route(`${this.baseUrl}/get-by-id/:id`).get((req: Request, res: Response) =>this.controller.getById(req, res, apiId + "03"));
        app.route(`${this.baseUrl}/update`).post((req: Request, res: Response) =>this.controller.update(req, res, apiId + "04"));
        app.route(`${this.baseUrl}/approve`).post((req: Request, res: Response) =>this.controller.approve(req, res, apiId + "05"));
        app.route(`${this.baseUrl}/opening-balance/create`).post((req: Request, res: Response) =>this.controller.createOpeningBal(req, res, apiId + "06"));
        app.route(`${this.baseUrl}/opening-balance/update`).post((req: Request, res: Response) =>this.controller.updateOpeningBal(req, res, apiId + "07"));
        app.route(`${this.baseUrl}/get-checked-data/:ulbId/:date`).get((req: Request, res: Response) =>this.controller.getCheckedData(req, res, apiId + "08"));
    }
}

export default ReceiptRegisterRoute;