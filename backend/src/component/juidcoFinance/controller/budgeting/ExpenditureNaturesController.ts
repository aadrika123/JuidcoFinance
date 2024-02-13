"use strict";

import { Request, Response } from "express";
import ExpenditureNaturesDao from "../../dao/budgeting/ExpenditureNaturesDao";
import { resObj } from "../../../../util/types";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";

/**
 * | Author- Bijoy Paitandi
 * | Created for- Bank Controller
 */

class ExpenditureNaturesController{
  private dao: ExpenditureNaturesDao;
  private initMsg: string;
  constructor() {
    this.dao = new ExpenditureNaturesDao();
    this.initMsg = "ExpenditureNatures";
  }

  // Get limited banks
  get = async (req: Request, res: Response, apiId: string): Promise<Response> => {
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
          res
        );

        return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };
}

export default ExpenditureNaturesController;
