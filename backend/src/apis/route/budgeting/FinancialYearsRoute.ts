"use strict";

import { baseUrl } from "../../../util/common";
import express, { Request, Response } from "express";
import FinancialYearsController from "../../controller/budgeting/FinancialYearsController";


class FinancialYearsRoute {
  private controller: FinancialYearsController;
  constructor() {
    this.controller = new FinancialYearsController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/financial-years/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default FinancialYearsRoute;
