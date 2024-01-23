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

  // create a new Vendor
  create = async (req: Request, res: Response): Promise<Response> => {
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
      return sendResponse(
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
      return sendResponse(
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

<<<<<<< HEAD
  // get all vendor
=======
  // Get vendor master list
>>>>>>> 312253492f4af18a25d73b22258c75cd6bfcc443
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.vendorMasterDao.get(Number(req.query.page), Number(req.query.limit));
      return sendResponse(
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
      return sendResponse(
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

  // get vendor by ID
  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: number = Number(req.params.vendorId);
      const data = await this.vendorMasterDao.getById(id);
      return sendResponse(
        true,
        "Vendor find successfully",
        data,
        200,
        "GET",
        "0703",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error.message,
        "error.code",
        500,
        "GET",
        "0703",
        "1.0",
        res
      );
    }
  };

  // update vendor information
  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = vendorMasterValidation.validate(req.body);

      if (error)
        return sendResponse(
          false,
          error.message,
          "error.code",
          403,
          "PATCH",
          "0704",
          "1.0",
          res
        );

      const data = await this.vendorMasterDao.store(req);

      return sendResponse(
        true,
        "Vendor updated successfully",
        data,
        200,
        "PATCH",
        "0704",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        "Vendor updated successfully",
        error.message,
        500,
        "PATCH",
        "0704",
        "1.0",
        res
      );
    }
  };
}

export default VendorMasterController;
