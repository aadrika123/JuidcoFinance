"use strict";

import { Request, Response } from "express";
import { sendResponse } from "../../../../util/sendResponse";
import FunctionCodeDao from "../../dao/masters/functionCodeDao";
import ResMessage from "../../responseMessage/masters/funCodeMessage";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024
 * | Created for- Function Code Controller
 * | Common apiId- 02
 */

class FunCodeController {
  private funCodeDao: FunctionCodeDao;

  constructor() {
    this.funCodeDao = new FunctionCodeDao();
  }

  // Get limited Function Codes
  getFunCode = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.funCodeDao.get(
        Number(req.query.page),
        Number(req.query.limit)
      );

      if (!data)
        return sendResponse(
          true,
          ResMessage.NOT_FOUND,
          data,
          200,
          "GET",
          "0201",
          "1.0",
          res
        );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0201",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error,
       "",
        500,
        "GET",
        "0201",
        "1.0",
        res
      );
    }
  };

  // Get all function codes
  getAll = async (req: Request, res: Response): Promise<Response> =>{
    const resObj: resObj ={
      action: "GET",
      apiId: "0202",
      version: "1.0"
    }
    try{
      const data = await this.funCodeDao.getAll(req);

      if(!data){
        return CommonRes.SUCCESS("Function Codes Not Found", data, resObj, res)
      }

      return CommonRes.SUCCESS("Function Codes Found Successfully", data, resObj, res)
    }catch(error: any){
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  }
}

export default FunCodeController;
