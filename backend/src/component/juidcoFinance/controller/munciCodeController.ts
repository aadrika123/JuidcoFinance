import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import MuncipalityCodeDao from "../dao/munciCodeDao";

/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Muncipality Code Controller
 * | Common apiId- 03 .
 */

class MuncipalityCodeController {
  private muncipalityCodeDao: MuncipalityCodeDao;

  constructor() {
    this.muncipalityCodeDao = new MuncipalityCodeDao();
  }

  // Muncipality Code Controller
  getMuncipalityCode = async (req: Request, res: Response): Promise<Response>  => {
    try {
      const data = await this.muncipalityCodeDao.get(Number(req.query.page), Number(req.query.limit));
     return sendResponse(
        true,
        "Muncipality Code Fetched successfully.",
        data,
        200,
        "GET",
        "0301",
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
        "0301",
        "1.0",
        res
      );
    }
  };
}

export default MuncipalityCodeController;
