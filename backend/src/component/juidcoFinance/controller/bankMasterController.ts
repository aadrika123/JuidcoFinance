import { Request, Response } from "express";
import { bankMasterValidation } from "../requests/bankMasterValidation";
import { sendResponse } from "../../../util/sendResponse";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024 
 * | Created for- BankMaster Controller
 * | Comman apiId- 03
 */

class BankMasterController {
  constructor() {
    ///
  }

  create = async (req: Request, res: Response) => {
    try {
      const { error } = bankMasterValidation.validate({
        username: "abc",
        birth_year: 1994,
      });

      if (error)
        return sendResponse(
          false,
          error.message,
          "error.code",
          400,
          "POST",
          "0301",
          "1.0",
          res
        );

      const data: [] = [];
      return sendResponse(
        true,
        "Bank Master Found Successfully!!",
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
        200,
        "GET",
        "0301",
        "1.0",
        res
      );
    }
  };
}

export default BankMasterController;
