"use strict";

import { baseUrl } from "../../../../util/common";
import FunCodeController from "../../controller/masters/funCodeController";
import express from "express";

/**
 * | Route - 02
 */

class FunCodeRoute {
  private funCodeController: FunCodeController;
  constructor() {
    this.funCodeController = new FunCodeController();
  }

  configure(app: express.Application): void {
    app.route(`${baseUrl}/get-fun-code`).get(this.funCodeController.getFunCode);  //0201
    app.route(`${baseUrl}/get-all-fun-codes`).get(this.funCodeController.getAll); //0202
  }
}

export default FunCodeRoute;
