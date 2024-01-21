"use strict";

import FunCodeController from "../controller/funCodeController";
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
    app.route(`/api/v1/get-fun-code`).get(this.funCodeController.getFunCode);  //0201
  }
}

export default FunCodeRoute;
