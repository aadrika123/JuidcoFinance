import { Request, Response } from "express";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import { resMessage } from "../../responseMessage/commonMessage";
import Joi from "joi";
import { budgetAppropriationsValidation, budgetAppropriationsValidationWithID } from "../../requests/documentation/budgetAppropriationsValidation";
import BudgetAppropriationsDao from "../../dao/budgeting/BudgetAppropriationsDao";

/**
 * | Author- Bijoy Paitandi
 * | Created for- BudgetAppropriations Controller
 * | Status: open
 */

class BudgetAppropriationsController {
  private budgetAppropriationsDao: BudgetAppropriationsDao;
  private initMesg: string;
  constructor() {
    this.budgetAppropriationsDao = new BudgetAppropriationsDao();
    this.initMesg = "BudgetAppropriations Entry";
  }

  // Create
  create = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      const { error } = budgetAppropriationsValidation.validate(req.body);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.budgetAppropriationsDao.store(req);
      return CommonRes.CREATED(
        resMessage(this.initMesg).CREATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  // Get limited bill invoices list
  get = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.budgetAppropriationsDao.get(req);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(resMessage(this.initMesg).FOUND, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  // Get single biull invoice details by Id
  getById = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    try {
      const id: number = Number(req.params.id);

      // validate id
      const { error } = Joi.object({
        id: Joi.number().required().greater(0)
      }).validate({'id': id});

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.budgetAppropriationsDao.getById(id);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(resMessage(this.initMesg).FOUND, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  // Update payment entry details by Id
  update = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      const { error } = budgetAppropriationsValidationWithID.validate(req.body);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.budgetAppropriationsDao.update(req);
      return CommonRes.CREATED(
        resMessage(this.initMesg).UPDATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

    // Get single biull invoice details by Id
    getCurrentAmounts = async (
      req: Request,
      res: Response,
      apiId: string
    ): Promise<Response> => {
      const resObj: resObj = {
        apiId,
        action: "GET",
        version: "1.0",
      };
      try {
        const id: number = Number(req.params.id);
  
        // validate id
        const { error } = Joi.object({
          id: Joi.number().required().greater(0)
        }).validate({'id': id});
  
        if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);
  
        const data = await this.budgetAppropriationsDao.getCurrentAmounts(id);
  
        if (!data)
          return CommonRes.SUCCESS(
            resMessage(this.initMesg).NOT_FOUND,
            data,
            resObj,
            res
          );
  
        return CommonRes.SUCCESS(resMessage(this.initMesg).FOUND, data, resObj, res);
      } catch (error: any) {
        return CommonRes.SERVER_ERROR(error, resObj, res);
      }
    };

}

export default BudgetAppropriationsController;

