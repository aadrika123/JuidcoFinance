import express from "express";
import { baseUrl } from "../../../util/common";
import DirPaymentEntryController from "../controller/dirPaymentEntryController";

/**
 * | Route - 09
 */

class DirPaymentEntryRoute {
    private dirPaymentEntryController: DirPaymentEntryController;
    constructor(){
        this.dirPaymentEntryController = new DirPaymentEntryController();
    }

    configure(app: express.Application) : void {
        app.route(`${baseUrl}/direct-payment-entry/create`).post(this.dirPaymentEntryController.create); //0901
        app.route(`${baseUrl}/direct-payment-entry/get-all`).get(this.dirPaymentEntryController.get); //0902
        app.route(`${baseUrl}/direct-payment-entry/get-by-id/:id`).get(this.dirPaymentEntryController.getById); //0903
        app.route(`${baseUrl}/direct-payment-entry/update`).post(this.dirPaymentEntryController.update); //0904
    }
}

export default DirPaymentEntryRoute;