import { Request, Response } from "express";
import {
  bankMasterUpdateValidation,
  bankMasterValidation,
} from "../../requests/masters/bankMasterValidation";
import BankMasterDao from "../../dao/masters/bankMasterDao";
import CommonRes from "../../../util/helper/commonResponse";
import { resObj } from "../../../util/types";
import { resMessage } from "../../responseMessage/commonMessage";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024
 * | Created for- BankMaster Controller
 * | Common apiId- 04
 */

class BankMasterController {
  private bankMasterDao: BankMasterDao;
  private initMsg;
  constructor() {
    this.bankMasterDao = new BankMasterDao();
    this.initMsg = "Bank Master";
  }

  // Create
  create = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "0401",
      action: "POST",
      version: "1.0",
    };
    try {
      const { error } = bankMasterValidation.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.bankMasterDao.store(req);
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

  // Get limited bank list
  get = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "0402",
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.bankMasterDao.get(req);

      if (!data)
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          req,
          res
        );

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

  // Get single bank details by Id
  getById = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "0403",
      action: "GET",
      version: "1.0",
    };
    try {
      const id: number = Number(req.params.bankId);
      const data = await this.bankMasterDao.getById(id);

      if (!data)
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          req,
          res
        );

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

  // Update bank details by Id
  update = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      action: "POST",
      apiId: "0404",
      version: "1.0",
    };
    try {
      const { error } = bankMasterUpdateValidation.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.bankMasterDao.update(req);
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
}

export default BankMasterController;
