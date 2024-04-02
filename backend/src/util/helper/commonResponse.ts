import { Request, Response } from "express";
import { sendResponse } from "../sendResponse";
import { resObj } from "../types";

const CommonRes = Object.freeze({
  VALIDATION_ERROR: (
    error: any,
    resObj: resObj,
    res: Response,
    req?: Request | any
  ): Promise<Response> => {
    return sendResponse(
      false,
      error,
      "",
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res,
      req
    );
  },
  SERVER_ERROR: (
    error: any,
    resObj: resObj,
    res: Response,
    req?: Request | any
  ): Promise<Response> => {
    return sendResponse(
      false,
      error,
      "",
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res,
      req
    );
  },
  CREATED: (
    message: any,
    data: unknown,
    resObj: resObj,
    res: Response
  ): Promise<Response> => {
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
  SUCCESS: (
    message: any,
    data: unknown,
    resObj: resObj,
    res: Response
  ): Promise<Response> => {
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
    return sendResponse(
      false,
      error,
      "",
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      res,
      req
    );
  },
  DEFAULT: "The underlying {kind} for model {model} does not exist.",
});

export default CommonRes;
