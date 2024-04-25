import express from "express";
import { APIv1 } from "../../APIv1";
import BillVerificationController from "../../controller/payments/BillVerificationController";
import { BillStages, ROLES } from "jflib";

class BillVerificationRoute extends APIv1 {
  private controller: BillVerificationController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "bill-verification");
    this.controller = new BillVerificationController();
  }

  configure(): void {
    this.addGetRoute(
      `level-${BillStages.ApprovedByJuniorEngineer}-${ROLES.JUNIOR_ENGINEER.toLowerCase().replaceAll(
        " ",
        "-"
      )}/inbox`,
      this.controller.getLevel0JuniorEngineerInbox
    );

    this.addGetRoute(
      `level-${BillStages.ApprovedByAssistantEngineer}-${ROLES.ASSISTANT_ENGINEER.toLowerCase().replaceAll(
        " ",
        "-"
      )}/inbox`,
      this.controller.getLevel1AssistantEngineerInbox
    );

    this.addGetRoute(`get/:billId`, this.controller.getBillById);

    this.addPostRoute(`approve`, this.controller.approveBill);
  }
}

export default BillVerificationRoute;
