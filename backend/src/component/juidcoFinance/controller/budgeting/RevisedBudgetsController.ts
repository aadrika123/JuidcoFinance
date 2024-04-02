import { Request, Response } from "express";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import { resMessage } from "../../responseMessage/commonMessage";
import Joi from "joi";
import RevisedBudgetsDao from "../../dao/budgeting/RevisedBudgetsDao";
import { revisedBudgetsValidation, revisedBudgetsValidationWithID } from "../../requests/budgeting/revisedBudgetsValidation";

/**
 * | Author- Bijoy Paitandi
 * | Created for- RevisedBudgets Controller
 * | Status: open
 */

class RevisedBudgetsController {
  private revisedBudgetsDao: RevisedBudgetsDao;
  private initMesg: string;
  constructor() {
    this.revisedBudgetsDao = new RevisedBudgetsDao();
    this.initMesg = "RevisedBudgets Entry";
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
      const { error } = revisedBudgetsValidation.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res, req);

      const data = await this.revisedBudgetsDao.store(req);
      return CommonRes.CREATED(
        resMessage(this.initMesg).CREATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
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
      const data = await this.revisedBudgetsDao.get(req);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(resMessage(this.initMesg).FOUND, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
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

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res, req);

      const data = await this.revisedBudgetsDao.getById(id);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMesg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(resMessage(this.initMesg).FOUND, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
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
      const { error } = revisedBudgetsValidationWithID.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res, req);

      const data = await this.revisedBudgetsDao.update(req);
      return CommonRes.CREATED(
        resMessage(this.initMesg).UPDATED,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
    }
  };
}

export default RevisedBudgetsController;

