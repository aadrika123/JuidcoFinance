"use strict";

import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import FunCodeDao from "../dao/funCodeDao";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024 
 * | Created for- Function Code Controller
 * | Common apiId- 02
 */

class FunCodeController {
  private funCodeDao: FunCodeDao;

  constructor() {
    this.funCodeDao = new FunCodeDao();
  }

  // Get limited Function Codes
  getFunCode = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.funCodeDao.get();

      return sendResponse(true, "Function Code Found Successfully!!", data, 200, "GET", "0201", "1.0", res);
    } catch (error: any) {
      return sendResponse(false, error.message, error.code, 200, "GET", "0201", "1.0", res);
    }
  };
}

export default FunCodeController;
