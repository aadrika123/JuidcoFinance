import express from "express";
import { APIv1 } from "../../APIv1";
import BillVerificationController from "../../controller/payments/BillVerificationController";
import { ROLES } from "jflib";

class BillVerificationRoute extends APIv1{
  private controller: BillVerificationController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "bill-verification");
    this.controller = new BillVerificationController();
  }

  configure(): void {
    this.addGetRoute(`level-0-${ROLES.JUNIOR_ENGINEER.toLowerCase().replaceAll(' ', '-')}/inbox`, this.controller.getLevel0JuniorEngineerInbox);
  }
}

export default BillVerificationRoute;
