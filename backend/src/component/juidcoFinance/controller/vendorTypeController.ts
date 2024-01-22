import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import VendorTypeDao from "../dao/vendorTypeDao";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-01-2024
 * | Created for- Vendor Type Controller
 * | Common apiId- 05
 */

class VendorTypeController {
  private vendorTypeDao: VendorTypeDao;
  constructor() {
    this.vendorTypeDao = new VendorTypeDao();
  }

  // Get all vendor Types
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.vendorTypeDao.get();

      return sendResponse(
        true,
        "Vendor Type Found Successfully!!",
        data,
        200,
        "GET",
        "0501",
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
        "0501",
        "1.0",
        res
      );
    }
  };
}

export default VendorTypeController;
