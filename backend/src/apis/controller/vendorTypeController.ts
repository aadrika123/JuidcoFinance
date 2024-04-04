import { Request, Response } from "express";
import VendorTypeDao from "../dao/vendorTypeDao";
import CommonRes from "../../util/helper/commonResponse";
import { resObj } from "../../util/types";
import { resMessage } from "../responseMessage/commonMessage";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-01-2024
 * | Created for- Vendor Type Controller
 * | Common apiId- 05
 */

class VendorTypeController {
  private vendorTypeDao: VendorTypeDao;
  private initMsg;
  constructor() {
    this.vendorTypeDao = new VendorTypeDao();
    this.initMsg = "Vendor Type";
  }

  // Get all vendor Types
  get = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "0501",
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.vendorTypeDao.get();

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

export default VendorTypeController;
