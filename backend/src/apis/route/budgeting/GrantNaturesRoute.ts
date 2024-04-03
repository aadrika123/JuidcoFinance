"use strict";

import express, { Request, Response } from "express";
import GrantNaturesController from "../../controller/budgeting/GrantNaturesController";
import { baseUrl } from "../../../util/common";


class GrantNaturesRoute {
  private controller: GrantNaturesController;
  constructor() {
    this.controller = new GrantNaturesController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/grant-natures/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default GrantNaturesRoute;
