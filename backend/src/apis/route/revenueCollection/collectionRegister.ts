import express, { Request, Response } from "express";
import { baseUrl } from "../../../util/common";
import CollectionRegisterController from "../../controller/revenueCollection/collectionRegisterController";

/**
 * | Author- Sanjiv Kumar
 * | Created for- CollectionRegister Route
 * | Status: Done
 */

class CollectionRegisterRoute {
  private controller: CollectionRegisterController;
  private baseUrl: string = `${baseUrl}/collection-register`;
  constructor() {
    this.controller = new CollectionRegisterController();
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
    app
      .route(`${this.baseUrl}/approve`)
      .post((req: Request, res: Response) =>
        this.controller.approve(req, res, apiId + "03")
      );
    app
      .route(`${this.baseUrl}/get-checked-data`)
      .get((req: Request, res: Response) =>
        this.controller.getCheckedData(req, res, apiId + "04")
      );
  }
}

export default CollectionRegisterRoute;
