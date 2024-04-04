"use strict";

import { Request, Response } from "express";
import FunctionCodeDao from "../../dao/masters/functionCodeDao";
import CommonRes from "../../../util/helper/commonResponse";
import { resObj } from "../../../util/types";
import { resMessage } from "../../responseMessage/commonMessage";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 20-01-2024
 * | Created for- Function Code Controller
 * | Common apiId- 02
 */

class FunCodeController {
  private funCodeDao: FunctionCodeDao;
  private initMsg;

  constructor() {
    this.funCodeDao = new FunctionCodeDao();
    this.initMsg = "Function Codes";
  }

  // Get limited Function Codes
  getFunCode = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj ={
      action: "GET",
      apiId: "0201",
      version: "1.0"
    }
    try {
      const data = await this.funCodeDao.get(
        Number(req.query.page),
        Number(req.query.limit)
      );

      if (!data)
      return CommonRes.NOT_FOUND(
        resMessage(this.initMsg).NOT_FOUND,
        data,
        resObj,
        req,
        res
      );

      return CommonRes.SUCCESS("Function Codes Found Successfully", data, resObj, req, res)
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
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

      if(!data)
      return CommonRes.NOT_FOUND(
        resMessage(this.initMsg).NOT_FOUND,
        data,
        resObj,
        req,
        res
      );

      return CommonRes.SUCCESS("Function Codes Found Successfully", data, resObj, req, res)
    }catch(error: any){
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  }
}

export default FunCodeController;
