import { Request, Response } from "express";
import Joi from "joi";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";
import { resObj } from "../../../util/types";
import dailyCollSummaryDao from "../../dao/revenueCollection/dailyCollSummaryDao";
import { dailyCollSummaryApproveSchema } from "../../requests/revenueCollection/dailyCollSummaryValidation";

/**
 * | Author- Sanjiv Kumar
 * | Created for- daily collection summary Controller
 * | Status: open
 */

class DailyCollSummaryController {
  private dailyCollSummaryDao: dailyCollSummaryDao;
  private initMsg: string;
  constructor() {
    this.dailyCollSummaryDao = new dailyCollSummaryDao();
    this.initMsg = "Daily Collection Summary";
  }

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
      const data = await this.dailyCollSummaryDao.get(req);

      if (!data)
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          req,
          res
        );

      return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND, data, resObj, req, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
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

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res);

      const data = await this.dailyCollSummaryDao.getById(id);

      if (!data)
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          req,
          res
        );

      return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND, data, resObj, req, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  // Appropve or Check payment entry details by Id
  approve = async (
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
      const { error } = dailyCollSummaryApproveSchema.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.dailyCollSummaryDao.approve(req);
      return CommonRes.CREATED(
        resMessage(this.initMsg).UPDATED,
        data,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      console.log("first", error)
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default DailyCollSummaryController;

