"use strict";

import express, { Request, Response } from "express";
import BankTypesController from "../../controller/masters/BankTypesController";
import { baseUrl } from "../../../../util/common";


class BankTypesRoute {
  private controller: BankTypesController;
  constructor() {
    this.controller = new BankTypesController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/bank-types/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default BankTypesRoute;
