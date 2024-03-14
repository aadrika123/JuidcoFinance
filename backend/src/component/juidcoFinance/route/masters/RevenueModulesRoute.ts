"use strict";

import express, { Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import RevenueModulesController from "../../controller/masters/RevenueModulesController";

/**
 * | Author- Sanjiv Kumar
 * | Created for- Receipt Modules Route
 * | Status: Done
 */

class RevenueModulesRoute {
  private controller: RevenueModulesController;
  constructor() {
    this.controller = new RevenueModulesController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/revenue-modules/get-all`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default RevenueModulesRoute;
