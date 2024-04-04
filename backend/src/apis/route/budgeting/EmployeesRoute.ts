"use strict";

import express, { Request, Response } from "express";
import EmployeesController from "../../controller/budgeting/EmployeesController";
import { baseUrl } from "../../../util/common";


class EmployeesRoute {
  private controller: EmployeesController;
  constructor() {
    this.controller = new EmployeesController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/employees/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default EmployeesRoute;
