import { Request, Response } from "express";
import { bankMasterValidation } from "../requests/bankMasterValidation";
import { sendResponse } from "../../../util/sendResponse";
import BankMasterDao from "../dao/bankMasterDao";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024 
 * | Created for- BankMaster Controller
 * | Common apiId- 04
 */

class BankMasterController {
  private bankMasterDao: BankMasterDao;
  constructor() {
    this.bankMasterDao = new BankMasterDao();
  }

  // Create
  create = async (req: Request, res: Response) => {
    try {
      const { error } = bankMasterValidation.validate(req.body);

      if (error)
        return sendResponse(
          false,
          error.message,
          "error.code",
          400,
          "POST",
          "0401",
          "1.0",
          res
        );


      const data = await this.bankMasterDao.store(req);
      return sendResponse(
        true,
        "Bank Master created Successfully!!",
        data,
        201,
        "POST",
        "0401",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error.message,
        error.code,
        500,
        "POST",
        "0401",
        "1.0",
        res
      );
    }
  };

  get =async(req: Request, res: Response)=>{
    try{

      const data = await this.bankMasterDao.get();

      return sendResponse(
        true,
        "Bank Master Found Successfully!!",
        data,
        200,
        "GET",
        "0401",
        "1.0",
        res
      );
    }catch(error: any){
      return sendResponse(
        false,
        error.message,
        error.code,
        200,
        "GET",
        "0401",
        "1.0",
        res
      );
    }
  }
}

export default BankMasterController;
