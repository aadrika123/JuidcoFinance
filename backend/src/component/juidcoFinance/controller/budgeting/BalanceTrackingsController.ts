import { Request, Response } from "express";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import { resMessage } from "../../responseMessage/commonMessage";
import Joi from "joi";
import { balanceTrackingsValidation } from "../../requests/budgeting/balanceTrackingsValidation";
import BalanceTrackingsDao from "../../dao/budgeting/BalanceTrackingsDao";

/**
 * | Author- Bijoy Paitandi
 * | Created for- BalanceTrackings Controller
 * | Status: open
 */

class BalanceTrackingsController {
  private balanceTrackingsDao: BalanceTrackingsDao;
  private initMesg: string;
  constructor() {
    this.balanceTrackingsDao = new BalanceTrackingsDao();
    this.initMesg = "BalanceTrackings Entry";
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
      const { error } = balanceTrackingsValidation.validate(req.body);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.balanceTrackingsDao.store(req);
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
      const data = await this.balanceTrackingsDao.get(req);

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
      }).validate({ 'id': id });

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.balanceTrackingsDao.getById(id);

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
  getBalance = async (
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
      }).validate({ 'id': id });

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.balanceTrackingsDao.getBalance(id);

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


  // Get limited bill invoices list
  getLatestBalances = async (
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
      const data = await this.balanceTrackingsDao.getLatestBalances(req);

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

  getScheduleReport = async (
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
      }).validate({ 'id': id });

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);


      const data = await this.balanceTrackingsDao.getScheduleReport(id);

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


  getGeneralLedgerReport = async (
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
      }).validate({ 'id': id });

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);


      const data = await this.balanceTrackingsDao.getGeneralLedgerReport(id);

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

export default BalanceTrackingsController;

