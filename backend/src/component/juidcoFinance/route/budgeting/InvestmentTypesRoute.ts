"use strict";

import express, { Request, Response } from "express";
import InvestmentTypesController from "../../controller/budgeting/InvestmentTypesController";
import { baseUrl } from "../../../../util/common";


class InvestmentTypesRoute {
  private controller: InvestmentTypesController;
  constructor() {
    this.controller = new InvestmentTypesController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/investment-types/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default InvestmentTypesRoute;
