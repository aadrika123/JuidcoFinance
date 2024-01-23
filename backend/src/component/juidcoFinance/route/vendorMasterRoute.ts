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
      .route(`${baseUrl}/vendor-master/create`)
      .post(this.vendorMasterController.create); // 0701

    app.route(`${baseUrl}/vendor-master/get`).get(this.vendorMasterController.get); //0702

    app
      .route(`${baseUrl}/vendor-master/get/:vendorId`)
      .get(this.vendorMasterController.getById); // 0703

    app
      .route(`${baseUrl}/vendor-master/update`)
      .post(this.vendorMasterController.update); // 0704

      app
      .route(`${baseUrl}/vendor-master/search`)
      .get(this.vendorMasterController.search); // 0705
  }
}

export default VendorMasterRoute;
