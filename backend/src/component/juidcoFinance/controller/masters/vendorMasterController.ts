import { Request, Response } from "express";
import VendorMasterDao from "../../dao/masters/vendorMasterDao";
import { vendorMasterValidation } from "../../requests/masters/vendorMasterValidation";
import { resObj } from "../../../../util/types";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";

/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Vendor Master Controller
 * | Comman apiId- 05
 */

class VendorMasterController {
  private vendorMasterDao: VendorMasterDao;
  private initMsg: string;
  constructor() {
    this.vendorMasterDao = new VendorMasterDao();
    this.initMsg = "VendorMaster";
  }

  // create a new Vendor
  create = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "0701",
      action: "POST",
      version: "1.0",
    };
    try {
      const { error } = vendorMasterValidation.validate(req.body.data);
      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data = await this.vendorMasterDao.store(req);
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

  // get all vendor
  get = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "0702",
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.vendorMasterDao.get(req);

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

  // get vendor by ID
  getById = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "0703",
      action: "GET",
      version: "1.0",
    };
    try {
      const id: number = Number(req.params.vendorId);
      const data = await this.vendorMasterDao.getById(id);

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

  // update vendor information
  update = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "0704",
      action: "POST",
      version: "1.0",
    };
    try {
      const { error } = vendorMasterValidation.validate(req.body.data);

      if (error) return CommonRes.VALIDATION_ERROR(error, resObj,  req, res,);

      const data1 = await this.vendorMasterDao.getById(req.body.data.id);
      req.body.data.vendor_no = data1.vendor_no;

      const data = await this.vendorMasterDao.update(req);

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

  getNames = async (
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
      const data = await this.vendorMasterDao.getNames();

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
}

export default VendorMasterController;
