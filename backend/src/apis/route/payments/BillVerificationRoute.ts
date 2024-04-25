import express from "express";
import { APIv1 } from "../../APIv1";
import BillVerificationController from "../../controller/payments/BillVerificationController";

class BillVerificationRoute extends APIv1 {
  private controller: BillVerificationController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "bill-verification");
    this.controller = new BillVerificationController();
  }

  configure(): void {
    this.addGetRoute(`inbox`, this.controller.getInbox);

    this.addGetRoute(`get/:billId`, this.controller.getBillById);

    this.addPostRoute(`approve`, this.controller.approveBill);
  }
}

export default BillVerificationRoute;
