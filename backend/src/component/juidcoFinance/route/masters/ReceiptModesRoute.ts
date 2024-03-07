"use strict";

import express, { Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import ReceiptModesController from "../../controller/masters/ReceiptModesController";


/**
 * | Author- Sanjiv Kumar
 * | Created for- Receipt Modes Route
 * | Status: Done
 */

class ReceiptModesRoute {
  private controller: ReceiptModesController;
  constructor() {
    this.controller = new ReceiptModesController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${baseUrl}/receipt-modes/get`).get((req: Request, res: Response) => this.controller.get(req, res, apiId + "01"));
  }
}

export default ReceiptModesRoute;
