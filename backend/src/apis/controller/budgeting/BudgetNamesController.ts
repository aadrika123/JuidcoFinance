"use strict";

import { Request, Response } from "express";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";
import { resObj } from "../../../util/types";
import BudgetNamesDao from "../../dao/budgeting/BudgetNamesDao";

/**
 * | Author- Bijoy Paitandi
 * | Created for- Bank Controller
 */

class BudgetNamesController {
  private dao: BudgetNamesDao;
  private initMsg: string;
  constructor() {
    this.dao = new BudgetNamesDao();
    this.initMsg = "BudgetNames";
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
      return CommonRes.SERVER_ERROR(error, resObj, res, req);
    }
  };
}

export default BudgetNamesController;
