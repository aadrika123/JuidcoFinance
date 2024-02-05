import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import ResMessage from "../responseMessage/vendorTypeMessage";
import SubLedgerDao from "../dao/subLedgerDao";

/**
 * | Author- Krish
 * | Created On- 01-02-2024
 * | Created for- Sub Ledger Controller
 * | Common apiId- 17
 */

class SubLedgerController {
  private subLedgerDao: SubLedgerDao;
  constructor() {
    this.subLedgerDao = new SubLedgerDao();
  }

  // Get all vendor Types
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.subLedgerDao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "1701",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "1701",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(false, error, "", 500, "GET", "1701", "1.0", res);
    }
  };
}

export default SubLedgerController;
