"use strict";

import express, { Request, Response } from "express";
import { baseUrl } from "../../../util/common";
import RevenueAccountedTypesController from "../../controller/masters/RevenueAccountedTypesController";


class RevenueAccountedTypesRoute {
  private controller: RevenueAccountedTypesController;
  constructor() {
    this.controller = new RevenueAccountedTypesController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/revenue-accounted-types/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default RevenueAccountedTypesRoute;
