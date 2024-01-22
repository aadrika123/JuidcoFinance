import { baseUrl } from "../../../util/common";
import express from "express";
import VendorMasterController from "../controller/vendorMasterController";

class VendorMasterRoute {
  private vendorMasterController: VendorMasterController;

  constructor() {
    this.vendorMasterController = new VendorMasterController();
  }

  configure(app: express.Application): void {
    app
      .route(`${baseUrl}/create-vendor-master`)
      .post(this.vendorMasterController.create); // 0701
    app.route(`${baseUrl}/get-vendor-master`).get(this.vendorMasterController.get); //0702
  }
}

export default VendorMasterRoute;
