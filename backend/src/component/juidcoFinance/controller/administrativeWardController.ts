"use strict";

import { Request, Response } from "express";
import AdministrativeWardDao from "../dao/administrativeWardDao";
import CommonRes from "../../../util/helper/commonResponse";
import { resObj } from "../../../util/types";
import { resMessage } from "../responseMessage/commonMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-01-2024
 * | Created for- Administrative Ward Controller
 * | Common apiId- 11
 */

class AdministrativeWardController {
  private adminsWardDao: AdministrativeWardDao;
  private initMsg;

  constructor() {
    this.adminsWardDao = new AdministrativeWardDao();
    this.initMsg = "Administrative Ward";
  }

  // Get limited Administrative Wards
  getAdministrativeWards = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId: "1101",
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.adminsWardDao.get();

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

export default AdministrativeWardController;
