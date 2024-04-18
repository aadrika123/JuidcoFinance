import { Request, Response } from "express";
import Joi from "joi";
import { collectionRegisterApproveSchema } from "../../requests/revenueCollection/collectionRegisterValidation";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";
import { resObj } from "../../../util/types";
import CollectionRegisterDao from "../../dao/revenueCollection/collectionRegisterDao";

/**
 * | Author- Sanjiv Kumar
 * | Created for- collectionRegister Controller
 * | Status: open
 */

class CollectionRegisterController {
  private collectionRegisterDao: CollectionRegisterDao;
  private initMsg: string;
  constructor() {
    this.collectionRegisterDao = new CollectionRegisterDao();
    this.initMsg = "CollectionRegister Entry";
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
      const data = await this.collectionRegisterDao.get(req);

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

      const data = await this.collectionRegisterDao.getById(id);

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
      const { error } = collectionRegisterApproveSchema.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.collectionRegisterDao.approve(req);
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
        const moduleId: number = Number(req.params.moduleId)
        // validate id
        const { error } = Joi.object({
          date: Joi.string().required(),
          ulbId: Joi.number().required(),
          moduleId :Joi.number().required(),
        }).validate({'date': date, 'ulbId': ulbId, 'moduleId': moduleId});
  
        if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);
  
        const data = await this.collectionRegisterDao.getCheckedData(req);
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



export default CollectionRegisterController;

