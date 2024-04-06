import express from "express";
import BankMasterController from "../../controller/masters/bankMasterController";
import { APIv1 } from "../../APIv1";

class BankMasterRoute extends APIv1{
  private controller: BankMasterController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "bank-master");
    this.controller = new BankMasterController();
  }

  configure(): void {

    this.addPostRoute(`create`, this.controller.create);

    this.getRoute(`bank-master/get-all`, this.controller.get);
    
    this.getRoute(`bank-master/get-by-id/:bankId`, this.controller.getById);
    this.getRoute(`bank-master/get-by-acc-ulb/:accCodeId/:ulbId`, this.controller.getByAccCodeAndUlb);
  }
}

export default BankMasterRoute;
