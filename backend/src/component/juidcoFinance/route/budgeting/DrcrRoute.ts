"use strict";

import express, { Request, Response } from "express";
import DrcrController from "../../controller/budgeting/DrcrController";
import { baseUrl } from "../../../../util/common";


class DrcrRoute {
  private controller: DrcrController;
  constructor() {
    this.controller = new DrcrController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/drcr/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default DrcrRoute;
