"use strict";

import { Request, Response } from "express";
import PaymentTypeDao from "../dao/paymentTypeDao";
import CommonRes from "../../../util/helper/commonResponse";
import { resObj } from "../../../util/types";
import { resMessage } from "../responseMessage/commonMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-01-2024
 * | Created for- Payment Type Controller
 * | Common apiId- 10
 */

class PaymentTypeController {
  private paymentTypeDao: PaymentTypeDao;
  private initMsg;

  constructor() {
    this.paymentTypeDao = new PaymentTypeDao();
    this.initMsg = "Payment Type";
  }

  // Get limited Payment types
  getPaymentTypes = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "1001",
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.paymentTypeDao.get();

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

export default PaymentTypeController;
