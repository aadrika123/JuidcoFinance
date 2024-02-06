import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import ResMessage from "../responseMessage/vendorTypeMessage";
import SubledgerDao from "../dao/transactions/subledgerDao";

/**
 * | Author- Krish
 * | Created On- 01-02-2024
 * | Created for- Sub Ledger Controller
 * | Common apiId- 17
 */

class SubledgerController {
  private subledgerDao: SubledgerDao;
  constructor() {
    this.subledgerDao = new SubledgerDao();
  }

  // Get all vendor Types
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.subledgerDao.get();

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

export default SubledgerController;
