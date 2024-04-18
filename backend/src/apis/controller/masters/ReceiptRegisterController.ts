import { Request, Response } from "express";
import Joi from "joi";
import ReceiptRegisterDao from "../../dao/masters/ReceiptRegisterDao";
import { openingBalanceSchema, receiptRegisterApproveSchema, receiptRegisterValidation, receiptRegisterValidationWithID, updateOpeningBalanceSchema } from "../../requests/masters/receiptRegisterValidation";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";
import { resObj } from "../../../util/types";

/**
 * | Author- Sanjiv Kumar
 * | Created for- ReceiptRegister Controller
 * | Status: open
 */

class ReceiptRegisterController {
  private receiptRegisterDao: ReceiptRegisterDao;
  private initMsg: string;
  constructor() {
    this.receiptRegisterDao = new ReceiptRegisterDao();
    this.initMsg = "ReceiptRegister Entry";
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

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.receiptRegisterDao.store(req);
      return CommonRes.CREATED(
        resMessage(this.initMsg).CREATED,
        data,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
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

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.receiptRegisterDao.getById(id);

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

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.receiptRegisterDao.update(req);
      return CommonRes.CREATED(
        resMessage(this.initMsg).UPDATED,
        data,
        resObj,
        req,
        res
      );
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
      const { error } = receiptRegisterApproveSchema.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.receiptRegisterDao.approve(req);
      return CommonRes.CREATED(
        resMessage(this.initMsg).UPDATED,
        data,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
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

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.receiptRegisterDao.createOpeningBal(req);
      return CommonRes.CREATED(
        resMessage('Opening Balance').CREATED,
        data,
        resObj,
        req,
        res
      );
    }catch(error: any){
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
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

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.receiptRegisterDao.updateOpeningBal(req);
      return CommonRes.CREATED(
        resMessage('Opening Balance').UPDATED,
        data,
        resObj,
        req,
        res
      );
    }catch(error: any){
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  }

  ///// Get One Checked Data
  getCheckedData = async (
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
      const date: string = req.params.date;
      const ulbId: number = Number(req.params.ulbId)
      // validate id
      const { error } = Joi.object({
        date: Joi.string().required(),
        ulbId: Joi.number().required()
      }).validate({'date': date, 'ulbId': ulbId});

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.receiptRegisterDao.getCheckedData(req);
      return CommonRes.SUCCESS(
        resMessage(this.initMsg).FOUND,
        data,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default ReceiptRegisterController;

