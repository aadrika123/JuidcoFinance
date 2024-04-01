import { Request, Response } from "express";
import Joi from "joi";
import ReceiptRegisterDao from "../../dao/masters/ReceiptRegisterDao";
import { openingBalanceSchema, receiptRegisterApproveSchema, receiptRegisterValidation, receiptRegisterValidationWithID, updateOpeningBalanceSchema } from "../../requests/masters/receiptRegisterValidation";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";
import { resObj } from "../../../../util/types";

/**
 * | Author- Sanjiv Kumar
 * | Created for- ReceiptRegister Controller
 * | Status: open
 */

class ReceiptRegisterController {
  private receiptRegisterDao: ReceiptRegisterDao;
  private initMesg: string;
  constructor() {
    this.receiptRegisterDao = new ReceiptRegisterDao();
    this.initMesg = "ReceiptRegister Entry";
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
      const { error } = receiptRegisterValidation.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.receiptRegisterDao.store(req);
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
      const data = await this.receiptRegisterDao.get(req);

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

      const data = await this.receiptRegisterDao.getById(id);

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
      const { error } = receiptRegisterValidationWithID.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.receiptRegisterDao.update(req);
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
      const { error } = receiptRegisterApproveSchema.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.receiptRegisterDao.approve(req);
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

  // Create Opeining Balance
  createOpeningBal = async(req: Request, res: Response, apiId: string) => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try{
      const { error } = openingBalanceSchema.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.receiptRegisterDao.createOpeningBal(req);
      return CommonRes.CREATED(
        resMessage('Opening Balance').CREATED,
        data,
        resObj,
        res
      );
    }catch(error: any){
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  }


  // Update Opeining Balance
  updateOpeningBal = async(req: Request, res: Response, apiId: string) => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try{
      const { error } = updateOpeningBalanceSchema.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.receiptRegisterDao.updateOpeningBal(req);
      return CommonRes.CREATED(
        resMessage('Opening Balance').UPDATED,
        data,
        resObj,
        res
      );
    }catch(error: any){
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  }
}

export default ReceiptRegisterController;

