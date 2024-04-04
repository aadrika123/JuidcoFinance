"use strict";

import { baseUrl } from "../../util/common";
import express, { Request, Response } from "express";
import BankController from "../controller/bankController";

class BankRoute {
  private controller: BankController;
  constructor() {
    this.controller = new BankController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/banks/get`).get(
      //(req: Request, res: Response, next: NextFunction) => manager(req, res, next, apiId+"01"),
      (req: Request, res: Response) =>
        this.controller.get(req, res, apiId + "01")
    );
    // app.route(`${baseUrl}/audit`).post(
    //   this.middleware.jwtVerify,
    //   this.audit.store)
  }
}

export default BankRoute;
