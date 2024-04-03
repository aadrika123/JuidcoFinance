import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import MuncipalityCodeDao from "../../dao/masters/munciCodeDao";
import ResMessage from "../../responseMessage/masters/municCodeMessage";
import { resObj } from "../../../util/types";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";

/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Muncipality Code Controller
 * | Common apiId- 03 .
 */

class MuncipalityCodeController {
  private dao: MuncipalityCodeDao;
  private initMsg: string;
  constructor() {
    this.dao = new MuncipalityCodeDao();
    this.initMsg = "Municipality Codes";
  }

  // Muncipality Code Controller
  getMuncipalityCode = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    try {
      const data = await this.dao.get();

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          apiId,
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        apiId,
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(false, error, "", 500, "GET", apiId, "1.0", res,
      req);
    }
  };

  // Get limited account codes
  getAllMunicipalityCode = async (
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
      const data = await this.dao.get_all();

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).FOUND,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
    }
  };
}

export default MuncipalityCodeController;
