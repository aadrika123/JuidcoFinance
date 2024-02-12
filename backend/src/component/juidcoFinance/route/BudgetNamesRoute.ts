"use strict";

import { baseUrl } from "../../../util/common";
import express, { Request, Response } from "express";
import BudgetNamesController from "../controller/BudgetNamesController";


class BudgetNamesRoute {
  private controller: BudgetNamesController;
  constructor() {
    this.controller = new BudgetNamesController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/budget-names/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default BudgetNamesRoute;
