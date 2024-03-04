"use strict";

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../responseMessage/commonMessage";
import { resObj } from "../../../util/types";

class Middleware {
  private initMsg;
  constructor() {
    this.initMsg = "Token";
  }

  //// Generate the temperaury token
  jwtSign = (authData: any) => {
    const secret = process.env.SECRET_KEY || "xyz";

    return jwt.sign(
      {
        authData,
      },
      secret,
      { expiresIn: "1d" }
    );
  };

  //// Verify the generated token
  jwtVerify = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const resObj: resObj = {
      apiId: "Not related to APIs",
      action: "Token Verification",
      version: "1.0",
    };
    const secret = process.env.SECRET_KEY || "xyz";
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader?.split(" ")[1];
    if (token && typeof token !== "undefined") {
      try {
        await jwt.verify(token, secret);
        next();
      } catch (error: any) {
        return CommonRes.VALIDATION_ERROR(
          resMessage(this.initMsg).INVALID,
          resObj,
          res
        );
      }
    } else {
      return CommonRes.VALIDATION_ERROR(
        resMessage(this.initMsg).NOT_FOUND,
        resObj,
        res
      );
    }
  };
}

export default Middleware;
