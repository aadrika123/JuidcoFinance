"use strict";

import { Request, Response } from "express";
import { resObj } from "../../../util/types";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";
import RevenueAccountedTypesDao from "../../dao/masters/RevenueAccountedTypesDao";

/**
 * | Author- Sanjiv Kumar
 * | Created for- Revenue Accounted Controller
 */

class RevenueAccountedTypesController {
  private dao: RevenueAccountedTypesDao;
  private initMsg: string;
  constructor() {
    this.dao = new RevenueAccountedTypesDao();
    this.initMsg = "Revenue Accounted Types";
  }

  // Get all revenue accounted types
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
      const data = await this.dao.get();

      if (!data)
        return CommonRes.SUCCESS(
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

  // Get one revenue accounted types ON revenue module Id and Account Code Id
  getByRevenueAndAccountingId = async (
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
      const data = await this.dao.getByRevenueAndAccountingId(req);

      if (!data)
        return CommonRes.SUCCESS(
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

export default RevenueAccountedTypesController;
