import express, { Request, Response } from "express";
import { baseUrl } from "../../../util/common";
import CashBankRVoucherController from "../../controller/documentation/cashBankRVoucherController";

/**
 * | Author- Sanjiv Kumar
 * | Created for- Cash Bank Receipt Voucher Route
 * | Date - 12-04-2024
 * | Status: Done
 */

class CashBankRVoucherRoute {
  private controller: CashBankRVoucherController;
  private baseUrl: string = `${baseUrl}/cash-bank-receipt-voucher`;
  constructor() {
    this.controller = new CashBankRVoucherController();
  }

  configure(app: express.Application, apiId: string): void {
    app
      .route(`${this.baseUrl}/get-all`)
      .get((req: Request, res: Response) =>
        this.controller.get(req, res, apiId + "01")
      );
    app
      .route(`${this.baseUrl}/get-by-id/:id`)
      .get((req: Request, res: Response) =>
        this.controller.getById(req, res, apiId + "02")
      );
    app
      .route(`${this.baseUrl}/approve`)
      .post((req: Request, res: Response) =>
        this.controller.approve(req, res, apiId + "03")
      );
  }
}

export default CashBankRVoucherRoute;
