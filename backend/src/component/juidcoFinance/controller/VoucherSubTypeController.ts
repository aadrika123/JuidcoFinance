import { Request, Response } from "express";
import VoucherSubTypeDao from "../dao/voucherSubTypeDao";
import { resObj } from "../../../util/types";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../responseMessage/commonMessage";

/**
 * | Author- Krish
 * | Created On- 01-02-2024
 * | Created for- Voucher Sub Type Controller
 * | Common apiId- 16
 */

class VoucherSubTypeController {
  private voucherSubTypeDao: VoucherSubTypeDao;
  private initMsg;

  constructor() {
    this.voucherSubTypeDao = new VoucherSubTypeDao();
    this.initMsg = "Vendor Sub Type"
  }

  // Get all vendor Types
  get = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "1601",
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.voucherSubTypeDao.get();

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

export default VoucherSubTypeController;
