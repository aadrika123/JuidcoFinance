import { sendResponse } from "../../../util/sendResponse";
import { Request, Response } from "express";
import AccountingCodeDao from "../dao/accountingCodeDao";

/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Account Code Controller
 * | Comman apiId- 01
 */

class AccountCodeController {
  private accountCodeDao: AccountingCodeDao;

  constructor() {
    this.accountCodeDao = new AccountingCodeDao();
  }

  getAccountCode = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.accountCodeDao.get();

      return sendResponse(
        true,
        "Function Code Found Successfully!!",
        data,
        200,
        "GET",
        "0201",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error.message,
        error.code,
        500,
        "GET",
        "0201",
        "1.0",
        res
      );
    }
  };
}

export default AccountCodeController;
