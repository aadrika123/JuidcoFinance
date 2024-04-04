"use strict";

import { baseUrl } from "../../../util/common";
import express, { Request, Response } from "express";
import BudgetTypesController from "../../controller/budgeting/BudgetTypesController";


class BudgetTypesRoute {
  private controller: BudgetTypesController;
  constructor() {
    this.controller = new BudgetTypesController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/budget-types/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default BudgetTypesRoute;
