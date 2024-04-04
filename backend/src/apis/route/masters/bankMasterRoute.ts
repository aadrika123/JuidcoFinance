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

    this.addGetRoute(`get-all`, this.controller.get);
    this.addGetRoute(`get-by-id/:bankId`, this.controller.getById);

    this.addPostRoute(`update`, this.controller.update);

  }
}

export default BankMasterRoute;
