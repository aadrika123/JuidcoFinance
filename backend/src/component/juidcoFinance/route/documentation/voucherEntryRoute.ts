import express, { Request, Response } from "express";
import { baseUrl } from "../../../../util/common";
import VoucherEntryController from "../../controller/documentation/voucherEntryController";


/**
 * | Author- Krish
 * | Created On- 01-02-2024
 * | Created for- Voucher Entry Controller
 * | Common apiId- 18
 * | Status: open
 */

class VoucherEntryRoute {
  private voucherEntryController: VoucherEntryController;
  private baseUrl: string = `${baseUrl}/voucher-entry`;
  constructor() {
    this.voucherEntryController = new VoucherEntryController();
  }

  configure(app: express.Application, apiId: string): void {
    app.route(`${this.baseUrl}/get`).get((req: Request, res: Response) => this.voucherEntryController.get(req, res, apiId + "01"));
    app.route(`${this.baseUrl}/create`).post((req: Request, res: Response) => this.voucherEntryController.create(req, res, apiId +"02"));
  }
}

export default VoucherEntryRoute;
