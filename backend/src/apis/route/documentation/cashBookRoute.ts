import express, { Request, Response } from "express";
import { baseUrl } from "../../../util/common";
import CashBookController from "../../controller/documentation/cashBookController";

/**
 * | Author- Sanjiv Kumar
 * | Created for-Cash Book Route
 * | Status: Done
 */

class CashBookRoute {
  private controller: CashBookController;
  private baseUrl: string = `${baseUrl}/cash-book`;
  constructor() {
    this.controller = new CashBookController();
  }

  configure(app: express.Application, apiId: string): void {
    app
      .route(`${this.baseUrl}/get-all`)
      .get((req: Request, res: Response) =>
        this.controller.get(req, res, apiId + "01")
      );
    app
      .route(`${this.baseUrl}/get-by-id/:id`)
      .get((req: Request, res: Response) =>
        this.controller.getById(req, res, apiId + "02")
      );
  }
}

export default CashBookRoute;
