"use strict";

import { Request, Response } from "express";
import GrantDao from "../dao/grantDao";
import CommonRes from "../../../util/helper/commonResponse";
import { resObj } from "../../../util/types";
import { resMessage } from "../responseMessage/commonMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-01-2024
 * | Created for- Grant Controller
 * | Common apiId- 12
 */

class GrantController {
  private grantDao: GrantDao;
  private initMsg;

  constructor() {
    this.grantDao = new GrantDao();
    this.initMsg = "Grant";
  }

  // Get limited Grants
  getGrants = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "1201",
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.grantDao.get();

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

export default GrantController;
