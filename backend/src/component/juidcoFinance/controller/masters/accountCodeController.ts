import { sendResponse } from "../../../../util/sendResponse";
import { Request, Response } from "express";
import AccountingCodeDao from "../../dao/masters/accountingCodeDao";
import ResMessage from "../../responseMessage/masters/accountCodeMessage";
import { resObj } from "../../../../util/types";
import CommonRes from "../../../../util/helper/commonResponse";
import { resMessage } from "../../responseMessage/commonMessage";
import Joi from "joi";

/**
 * | Author- Krish Vishwakarma
 * | Created On- 22-01-2024
 * | Created for- Account Code Controller
 * | Comman apiId- 01
 */

class AccountCodeController {
  private dao: AccountingCodeDao;
  private initMsg;
  constructor() {
    this.dao = new AccountingCodeDao();
    this.initMsg = "Accounting Codes";

  }

  getAccountCode = async (req: Request, res: Response, apiId: string): Promise<Response> => {
    try {
      const data = await this.dao.get(
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
      return sendResponse(
        false,
        error,
        "",
        500,
        "GET",
        apiId,
        "1.0",
        res
      );
    }
  };


    // Get limited account codes
    getAllAccountingCode = async (req: Request, res: Response, apiId: string): Promise<Response> => {
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
  
          return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND, data, resObj, res);
      } catch (error: any) {
        return CommonRes.SERVER_ERROR(error, resObj, res);
      }
    };

     // Get main codes
     getMainAccountingCode = async (req: Request, res: Response, apiId: string): Promise<Response> => {
      const resObj: resObj = {
        apiId,
        action: "GET",
        version: "1.0",
      };
      
      try {
        
        const data = await this.dao.getMainCodes();
  
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

    // Get main codes
    getSubAccountingCode = async (req: Request, res: Response, apiId: string): Promise<Response> => {
      const resObj: resObj = {
        apiId,
        action: "GET",
        version: "1.0",
      };
      
      try {
        
        const data = await this.dao.getSubCodes();
  
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


    // Get main codes
    getChildAccountingCode = async (req: Request, res: Response, apiId: string): Promise<Response> => {
      const resObj: resObj = {
        apiId,
        action: "GET",
        version: "1.0",
      };
      
      try {

        const id: number = Number(req.params.id);

        // validate id
        const { error } = Joi.object({
          id: Joi.number().required()
        }).validate({'id': id});
  
        if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);
  
        
        const data = await this.dao.getChildCodes(id);
  
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


        // Get main codes
        getParentCode = async (req: Request, res: Response, apiId: string): Promise<Response> => {
          const resObj: resObj = {
            apiId,
            action: "GET",
            version: "1.0",
          };
          
          try {
    
            const id: number = Number(req.params.id);
    
            // validate id
            const { error } = Joi.object({
              id: Joi.number().required()
            }).validate({'id': id});
      
            if (error) return CommonRes.VALIDATION_ERROR(error, resObj, res);
      
            
            const data = await this.dao.getParentCode(id);
      
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


      getCodesWithParentDetail = async (req: Request, res: Response, apiId: string): Promise<Response> => {
        const resObj: resObj = {apiId, action: "GET", version: "1.0",};
        try {
          const data = await this.dao.getCodesWithParentDetail();
          if (!data)
            return CommonRes.SUCCESS(
              resMessage(this.initMsg).NOT_FOUND, data, resObj, res);

            return CommonRes.SUCCESS(resMessage(this.initMsg).FOUND, data, resObj, res);
        } catch (error: any) {return CommonRes.SERVER_ERROR(error, resObj, res);}
      };
  
  
}

export default AccountCodeController;
