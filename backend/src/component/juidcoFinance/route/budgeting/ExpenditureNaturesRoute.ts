"use strict";

import express, { Request, Response } from "express";
import ExpenditureNaturesController from "../../controller/budgeting/ExpenditureNaturesController";
import { baseUrl } from "../../../../util/common";


class ExpenditureNaturesRoute {
  private controller: ExpenditureNaturesController;
  constructor() {
    this.controller = new ExpenditureNaturesController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/expenditure-natures/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default ExpenditureNaturesRoute;
