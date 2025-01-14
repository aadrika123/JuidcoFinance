import { Request, Response } from "express";
import CommonRes from "../../../../util/helper/commonResponse";
import { resObj } from "../../../../util/types";
import { resMessage } from "../../responseMessage/commonMessage";
import AuthDao from "../../dao/auth/authDao";
import { loginValidation } from "../../requests/auth/loginValidation";

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
  login = async (
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

      const { error } = loginValidation.validate(req.body);

      if(error)
        return CommonRes.VALIDATION_ERROR(error, resObj, res);

      const data = await this.dao.login(req.body);

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).LOGIN,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  /// Send OTP on Mail
  sendMailOtp = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      await this.dao.sendMailOtp(req.body.email);

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).OTP_SENT,
        null,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  /// Verify OTP on Mail
  verifyMailOtp = async (
    req: Request,
    res: Response,
    apiId: string
  ): Promise<Response> => {
    const resObj: resObj = {
      apiId,
      action: "POST",
      version: "1.0",
    };
    try {
      const data = await this.dao.verifyMailOtp(req.body.email, req.body.otp);

      if (data === null) {
        return CommonRes.VALIDATION_ERROR("Wrong OTP entered!!!", resObj, res);
      } else if (!data) {
        return CommonRes.VALIDATION_ERROR(
          "OTP has been expired!!!",
          resObj,
          res
        );
      }

      return CommonRes.SUCCESS(
        "OTP validated successfully!!!",
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };
}

export default AuthController;
