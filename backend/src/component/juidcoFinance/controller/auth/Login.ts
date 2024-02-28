import { Request, Response } from "express";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import { resMessage } from "../../responseMessage/commonMessage";
import AuthDao from "../../dao/auth/authDao";

/**
 * | Author- Sanjiv Kumar
 * | Created for- Authentication
 * | Created Date- 27-02-2024
 * | Status - Done
 */

class AuthController {
    private dao: AuthDao;
    private initMsg: string;
    constructor() {
      this.dao = new AuthDao();
      this.initMsg = "Employee";
    }

     // Login
  login = async (req: Request, res: Response, apiId: string): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    
    try {
      
      const data = await this.dao.login(req.body);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res
        );

        return CommonRes.SUCCESS(resMessage(this.initMsg).LOGIN, data, resObj, res);
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };
}

export default AuthController;