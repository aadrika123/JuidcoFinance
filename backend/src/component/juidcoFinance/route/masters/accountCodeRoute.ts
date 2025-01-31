import express, { Request, Response } from "express";
import AccountCodeController from "../../controller/masters/accountCodeController";
import { baseUrl } from "../../../../util/common";

/**
 * | Route - 01
 */

class AccountCodeRoute {
  private accountingCodeController: AccountCodeController;

  constructor() {
    this.accountingCodeController = new AccountCodeController();
  }

  configure(app: express.Application, apiId: string): void {
    app
      .route(`${baseUrl}/get-account-code`)
      .get((req: Request, res: Response) =>
        this.accountingCodeController.getAccountCode(req, res, apiId + "01")
      );
    app
      .route(`${baseUrl}/get-all-account-code`)
      .get((req: Request, res: Response) =>
        this.accountingCodeController.getAllAccountingCode(
          req,
          res,
          apiId + "02"
        )
      );
    app
      .route(`${baseUrl}/get-main-account-codes`)
      .get((req: Request, res: Response) =>
        this.accountingCodeController.getMainAccountingCode(
          req,
          res,
          apiId + "03"
        )
      );
    app
      .route(`${baseUrl}/get-sub-account-codes`)
      .get((req: Request, res: Response) =>
        this.accountingCodeController.getSubAccountingCode(
          req,
          res,
          apiId + "04"
        )
      );
    app
      .route(`${baseUrl}/get-child-account-codes/:id`)
      .get((req: Request, res: Response) =>
        this.accountingCodeController.getChildAccountingCode(
          req,
          res,
          apiId + "05"
        )
      );
    app
      .route(`${baseUrl}/get-parent-account-code/:id`)
      .get((req: Request, res: Response) =>
        this.accountingCodeController.getParentCode(req, res, apiId + "06")
      );
    app
      .route(`${baseUrl}/get-codes-with-parent-detail`)
      .get((req: Request, res: Response) =>
        this.accountingCodeController.getCodesWithParentDetail(
          req,
          res,
          apiId + "07"
        )
      );
    app
      .route(`${baseUrl}/request-new-acc-code`)
      .post((req: Request, res: Response) =>
        this.accountingCodeController.requestingNewCode(req, res, apiId + "08")
      );
  }
}

export default AccountCodeRoute;
