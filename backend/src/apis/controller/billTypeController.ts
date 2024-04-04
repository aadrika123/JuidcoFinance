"use strict";

import { Request, Response } from "express";
import BillTypeDao from "../dao/billTypeDao";
import { resObj } from "../../util/types";
import CommonRes from "../../util/helper/commonResponse";
import { resMessage } from "../responseMessage/commonMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 31-01-2024
 * | Created for- Bill Type Controller
 * | Common apiId- 14
 */

class BillTypeController {
  private billTypeDao: BillTypeDao;
  private initMsg;

  constructor() {
    this.billTypeDao = new BillTypeDao();
    this.initMsg = "Bill Type";
  }

  // Get limited BillTypes
  getBillTypes = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "1401",
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.billTypeDao.get();

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

export default BillTypeController;
