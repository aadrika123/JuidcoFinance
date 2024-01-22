import express from "express";
import BankMasterController from "../controller/bankMasterController";
import {baseUrl} from "../../../util/common"
/**
 * | Route - 04
 */

class BankMasterRoute {
  private bankMasterController: BankMasterController;
  constructor() {
    this.bankMasterController = new BankMasterController();
  }

  configure(app: express.Application): void {
    app.route(`${baseUrl}/bank-master/create`).post(this.bankMasterController.create); //0401
    app.route(`${baseUrl}/bank-master/get-all`).get(this.bankMasterController.get); //0402
  }
}

export default BankMasterRoute;
