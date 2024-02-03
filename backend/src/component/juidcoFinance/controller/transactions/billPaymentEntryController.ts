import { Request, Response } from "express";
import { dirPaymentEntryValidationAlongWithID, dirPaymentEntryValidation } from "../../requests/transactions/dirPaymentEntryValidation";
import { sendResponse } from "../../../../util/sendResponse";
import ResMessage from "../../responseMessage/transactions/dirPaymentEntryMessage";
import DirPaymentEntryDao from "../../dao/transactions/dirPaymentEntryDao";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 01-02-2024
 * | Created for- Bill Payment Entry Controller
 * | Common apiId- 20
 */

class DirPaymentEntryController {
  private dirPaymentEntryDao: DirPaymentEntryDao;
  private apiId;
  constructor(baseId: string) {
    this.apiId = baseId
    this.dirPaymentEntryDao = new DirPaymentEntryDao();
  }

  // Create
  create = async (req: Request, res: Response): Promise<Response> => {
    
    try {
      const { error } = dirPaymentEntryValidation.validate(req.body);

      if (error)
        return sendResponse(
          false,
          error,
          "",
          403,
          "POST",
          "0901",
          "1.0",
          res
        );

      //   req.body.payment_no = 123;

      const data = await this.dirPaymentEntryDao.store(req);
      return sendResponse(
        true,
        ResMessage.CREATED,
        data,
        201,
        "POST",
        "0901",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error,
        "",
        500,
        "POST",
        "0901",
        "1.0",
        res
      );
    }
  };

  // Get limited payment entry list
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.dirPaymentEntryDao.get(req);

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "0902",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0902",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error.message,
        "",
        500,
        "GET",
        "0902",
        "1.0",
        res
      );
    }
  };

  // Get single payment entry details by Id
  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: number = Number(req.params.id);
      const data = await this.dirPaymentEntryDao.getById(id);

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "0903",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0903",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error,
        "",
        500,
        "GET",
        "0903",
        "1.0",
        res
      );
    }
  };

  // Update payment entry details by Id
  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = dirPaymentEntryValidationAlongWithID.validate(req.body);

      if (error)
        return sendResponse(
          false,
          error,
          "",
          403,
          "POST",
          "0904",
          "1.0",
          res
        );

      const data = await this.dirPaymentEntryDao.update(req);
      return sendResponse(
        true,
        ResMessage.UPDATED,
        data,
        200,
        "POST",
        "0904",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error,
        "",
        500,
        "POST",
        "0904",
        "1.0",
        res
      );
    }
  };
}

export default DirPaymentEntryController;
