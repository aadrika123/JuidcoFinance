import express from "express";
import BankMasterController from "../../controller/masters/bankMasterController";
import { APIv1 } from "../../APIv1";

class BankMasterRoute extends APIv1{
  private controller: BankMasterController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app);
    this.controller = new BankMasterController();
  }

  configure(): void {

    this.postRoute(`bank-master/update`, this.controller.update);
    this.postRoute(`bank-master/create`, this.controller.create);

    this.getRoute(`bank-master/get-all`, this.controller.get);
    
    this.getRoute(`bank-master/get-by-id/:bankId`, this.controller.getById);

    
  }
}

export default BankMasterRoute;
