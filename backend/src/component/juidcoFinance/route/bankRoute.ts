"use strict";

import { baseUrl } from "../../../util/common";
import express, { Request, Response } from "express";
import BankController from "../controller/bankController";
import Middleware from "../middleware/middleware";

class BankRoute {
  private controller: BankController;
  private middleware: Middleware;
  constructor() {
    this.controller = new BankController();
    this.middleware = new Middleware();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/banks/get`).get(
      (req: Request, res: Response) =>
        this.controller.get(req, res, apiId + "01")
    );
    // app.route(`${baseUrl}/audit`).post(
    //   this.middleware.jwtVerify,
    //   this.audit.store)
  }
}

export default BankRoute;
