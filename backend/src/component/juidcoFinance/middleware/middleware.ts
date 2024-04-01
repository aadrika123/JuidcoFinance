"use strict";

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import CommonRes from "../../../util/helper/commonResponse";
import { resMessage } from "../responseMessage/commonMessage";
import { resObj } from "../../../util/types";

class Middleware {
  private initMsg;
  private roles;
  constructor() {
    this.initMsg = "Token";
    this.roles = new Roles;
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
  publicValidation = async (
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
        const data: any = await jwt.verify(token, secret);

        res.locals.user = data?.authData;
        next();
      } catch (error: any) {
        return CommonRes.UNAUTHORISED(
          resMessage(this.initMsg).INVALID,
          resObj,
          res,
          req
        );
      }
    } else {
      return CommonRes.UNAUTHORISED(
        resMessage(this.initMsg).NOT_FOUND,
        resObj,
        res,
        req
      );
    }
  };

  //// Verify Is Accountent or not
  accountant = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId: apiId || "Not related to APIs",
      action: "Authentication",
      version: "1.0",
    };
    const secret = process.env.SECRET_KEY || "xyz";
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader?.split(" ")[1];
    if (token && typeof token !== "undefined") {
      try {
        const data: any = await jwt.verify(token, secret);
        res.locals.user = data?.authData;
        if (
          data &&
          data?.authData?.designation?.name !==
            "Accounts Department – Accountant"
        ) {
          return CommonRes.UNAUTHORISED(
            "You are not authorised for the route",
            resObj,
            res,
            req
          );
        }
        next();
      } catch (error: any) {
        return CommonRes.UNAUTHORISED(
          resMessage(this.initMsg).INVALID,
          resObj,
          res,
          req
        );
      }
    } else {
      return CommonRes.UNAUTHORISED(
        resMessage(this.initMsg).NOT_FOUND,
        resObj,
        res,
        req
      );
    }
  };

  //// Verify Is Manager or not Through masterDB
  manager = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId: apiId || "Not related to APIs",
      action: "Authentication",
      version: "1.0",
    };
    const role: any = req.body.auth;

    if (
      role !== "" &&
      role !== undefined &&
      Array.isArray(role) &&
      role.length > 0
    ) {
      
      if (!this.roles.isProjectManager(role)) {
        return CommonRes.UNAUTHORISED(
          "You are not authorised for the route",
          resObj,
          res,
          req
        );
      }
      next();
    } else {
      return CommonRes.UNAUTHORISED(
        resMessage("Role").NOT_FOUND,
        resObj,
        res,
        req
      );
    }
  };
}

export default Middleware;
