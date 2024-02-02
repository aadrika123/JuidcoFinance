import { baseUrl } from "../../../util/common";
import express from "express";
import SubLedgerController from "../controller/subLedgerController";

/**
 * | Route - 17
 */

class SubLedgerRoute {
  private subLedgerController: SubLedgerController;
  constructor() {
    this.subLedgerController = new SubLedgerController();

  }

  configure(app: express.Application) {
    app
      .route(`${baseUrl}/sub-ledger/get`)
      .get(this.subLedgerController.get); //01
  }
}

export default SubLedgerRoute;
