import express from "express";
import { baseUrl } from "../../../../util/common";
import VoucherEntryController from "../../controller/documentation/voucherEntryController";

class VoucherEntryRoute {
  private voucherEntryController: VoucherEntryController;
  constructor() {
    this.voucherEntryController = new VoucherEntryController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/voucher-entry/create`)
      .post(this.voucherEntryController.create); // 1801

    app
      .route(`${baseUrl}/voucher-entry/get`)
      .get(this.voucherEntryController.get); //1802
  }
}

export default VoucherEntryRoute;
