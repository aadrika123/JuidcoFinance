"use strict";

import { Request, Response } from "express";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";
import { resObj } from "../../../../util/types";
import BudgetTypesDao from "../../dao/budgeting/BudgetTypesDao";

/**
 * | Author- Bijoy Paitandi
 * | Created for- Bank Controller
 */

class BudgetTypesController{
  private dao: BudgetTypesDao;
  private initMsg: string;
  constructor() {
    this.dao = new BudgetTypesDao();
    this.initMsg = "BudgetTypes";
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
        return CommonRes.NOT_FOUND(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          req,
          res
        );

        return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND, data, resObj, req, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default BudgetTypesController;
