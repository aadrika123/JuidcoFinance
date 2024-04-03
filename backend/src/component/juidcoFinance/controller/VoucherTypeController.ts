import { Request, Response } from "express";
import VoucherTypeDao from "../dao/voucherTypeDao";
import CommonRes from "../../../util/helper/commonResponse";
import { resObj } from "../../../util/types";
import { resMessage } from "../responseMessage/commonMessage";

/**
 * | Author- Krish
 * | Created On- 31-01-2024
 * | Created for- Voucher Type Controller
 * | Common apiId- 15
 */

class VoucherTypeController {
  private voucherTypeDao: VoucherTypeDao;
  private initMsg;

  constructor() {
    this.voucherTypeDao = new VoucherTypeDao();
    this.initMsg = "Vendor Type";
  }

  // Get all vendor Types
  get = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "1501",
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.voucherTypeDao.get();

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

export default VoucherTypeController;
