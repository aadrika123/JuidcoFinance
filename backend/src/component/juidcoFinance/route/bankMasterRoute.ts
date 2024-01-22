import express from "express";
import BankMasterController from "../controller/bankMasterController";
import {baseUrl} from "../../../util/common"
/**
 * | Route - 03
 */

class BankMasterRoute {
  private bankMasterController: BankMasterController;
  constructor() {
    this.bankMasterController = new BankMasterController();
  }

  configure(app: express.Application): void {
    app.route(`${baseUrl}/bank-master/create`).post(this.bankMasterController.create); //0301
  }
}

export default BankMasterRoute;
