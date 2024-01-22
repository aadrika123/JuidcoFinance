import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import VendorMasterDao from "../dao/vendorMasterDao";
import { vendorMasterValidation } from "../requests/vendorMasterValidation";

/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Vendor Master Controller
 * | Comman apiId- 05
 */

class VendorMasterController {
  private vendorMasterDao: VendorMasterDao;
  constructor() {
    this.vendorMasterDao = new VendorMasterDao();
  }

  create = async (req: Request, res: Response) => {
    try {
      const { error } = vendorMasterValidation.validate(req.body);
      if (error)
        return sendResponse(
          false,
          error.message,
          "error.code",
          400,
          "POST",
          "0701",
          "1.0",
          res
        );

      const data = await this.vendorMasterDao.store(req);
      sendResponse(
        true,
        "Vendor Data added successfully",
        data,
        200,
        "POST",
        "0701",
        "1.0",
        res
      );
    } catch (error: any) {
      sendResponse(
        false,
        error.message,
        "error.code",
        500,
        "POST",
        "0701",
        "1.0",
        res
      );
    }
  };

  get = async (req:Request, res: Response) => {
    try {
      const data = await this.vendorMasterDao.get();
      sendResponse(
        true,
        "Vendor Data fetched successfully",
        data,
        200,
        "GET",
        "0702",
        "1.0",
        res
      );
    } catch (error: any) {
      sendResponse(
        false,
        error.message,
        "error.code",
        500,
        "GET",
        "0702",
        "1.0",
        res
      );
    }
  };
}

export default VendorMasterController;
