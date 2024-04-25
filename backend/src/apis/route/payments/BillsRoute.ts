import express from "express";
import { APIv1 } from "../../APIv1";
import BillsController from "../../controller/payments/BillsController";

class BillsRoute extends APIv1{
  private controller: BillsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "bills");
    this.controller = new BillsController();
  }

  configure(): void {
    this.addGetRoute(`get-all`, this.controller.get);
    this.addFormDataPostRoute('create', this.controller.create, [
      { name: 'payment_for_document', maxCount: 1 },
    ]);

    
  }
}

export default BillsRoute;
