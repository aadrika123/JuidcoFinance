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
          403,
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

  // Get limited bank list
  get = async (req: Request, res: Response) => {
    try {
      const data = await this.bankMasterDao.get();

      return sendResponse(
        true,
        "Bank Master Found Successfully!!",
        data,
        200,
        "GET",
        "0402",
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
        "0402",
        "1.0",
        res
      );
    }
  };

  // Get single bank details by Id
  getById = async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.bankId);
      const data = await this.bankMasterDao.getById(id);
      return sendResponse(
        true,
        "Bank Master Found Successfully!!",
        data,
        200,
        "GET",
        "0403",
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
        "0403",
        "1.0",
        res
      );
    }
  };

  // Update bank details by Id
  update = async (req: Request, res: Response) => {
    try {
      const { error } = bankMasterValidation.validate(req.body);

      if (error)
        return sendResponse(
          false,
          error.message,
          "error.code",
          403,
          "POST",
          "0404",
          "1.0",
          res
        );

      const data = await this.bankMasterDao.store(req);
      return sendResponse(
        true,
        "Bank Master updated Successfully!!",
        data,
        200,
        "POST",
        "0404",
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
        "0404",
        "1.0",
        res
      );
    }
  };
}

export default BankMasterController;
