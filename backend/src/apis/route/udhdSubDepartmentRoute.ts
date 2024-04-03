import express, { Request, Response } from "express";
import UDHDSubDepartmentController from "../controller/udhdSubDepartmentController";
import { baseUrl } from "../../util/common";

/**
 * | Route - 44
 */

class UDHDSubDepartmentRoute {
  private controller: UDHDSubDepartmentController;
  constructor() {
    this.controller = new UDHDSubDepartmentController();
  }

  configure(app: express.Application, apiId: string): void {
    app
      .route(`${baseUrl}/udhd/get-all`)
      .get((req: Request, res: Response) =>
        this.controller.getAll(req, res, apiId + "01")
      ); // 01
    app
      .route(`${baseUrl}/udhd/designations/get-all/:udhd_id`)
      .get((req: Request, res: Response) =>
        this.controller.getAllDesignation(req, res, apiId + "02")
      ); // 02
  }
}

export default UDHDSubDepartmentRoute;
