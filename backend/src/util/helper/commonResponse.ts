import { Request, Response } from "express";
import { sendResponse } from "../sendResponse";
import { resObj } from "../types";
import { errLogger, infoLogger } from "../../../loggerConfig";
import AuditTrail from "../../component/juidcoFinance/auditTrail/auditTrail";

const CommonRes = Object.freeze({
  VALIDATION_ERROR: (
    error: any,
    resObj: resObj,
    res: Response,
    req?: Request | any
  ): Promise<Response> => {
    errLogger.error({ metaData: resObj, message: error.message });
    new AuditTrail().store(error, resObj, res, req);
    return sendResponse(
      false,
      error,
      "",
      403,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res
    );
  },
  SERVER_ERROR: (
    error: any,
    resObj: resObj,
    res: Response,
    req?: Request | any
  ): Promise<Response> => {
    errLogger.error({ metaData: resObj, message: error.message });
    new AuditTrail().store(error, resObj, res, req);
    return sendResponse(
      false,
      error,
      "",
      500,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res
    );
  },
  CREATED: (
    message: any,
    data: unknown,
    resObj: resObj,
    res: Response
  ): Promise<Response> => {
    infoLogger.info({ metaData: resObj, data: data });
    return sendResponse(
      true,
      message,
      data,
      201,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res
    );
  },
  SUCCESS: (
    message: any,
    data: unknown,
    resObj: resObj,
    res: Response
  ): Promise<Response> => {
    infoLogger.info({ metaData: resObj, data: data });
    return sendResponse(
      true,
      message,
      data,
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res
    );
  },
  UNAUTHORISED: (
    error: any,
    resObj: resObj,
    res: Response,
    req?: Request | any
  ): Promise<Response> => {
    errLogger.error({ metaData: resObj, message: error.message });
    new AuditTrail().store(error, resObj, res, req);
    return sendResponse(
      false,
      error,
      "",
      401,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res
    );
  },
  DEFAULT: "The underlying {kind} for model {model} does not exist.",
});

export default CommonRes;
