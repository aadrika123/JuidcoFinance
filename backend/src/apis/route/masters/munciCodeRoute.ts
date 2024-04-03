import { baseUrl } from "../../../util/common";
import MuncipalityCodeController from "../../controller/masters/munciCodeController";
import express, { Request, Response } from "express";
class MuncipalityCodeRoute {
  private muncipalityCodeController: MuncipalityCodeController;

  constructor() {
    this.muncipalityCodeController = new MuncipalityCodeController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/get-munci-code`).get((req: Request, res: Response) => this.muncipalityCodeController.getMuncipalityCode(req, res, apiId + "01"));
    app.route(`${baseUrl}/get-all-munci-code`).get((req: Request, res: Response) => this.muncipalityCodeController.getAllMunicipalityCode(req, res, apiId + "02"));
  }
}

export default MuncipalityCodeRoute;
