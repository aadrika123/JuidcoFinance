import { Request, Response } from "express";
import CommonRes from "../../../util/helper/commonResponse";
import { resObj } from "../../../util/types";
import UDHDSubDepartmentDao from "../dao/udhdSubDepartmentDao";
import { resMessage } from "../responseMessage/commonMessage";

/**
 * | Author- Sanjiv Kumar
 * | Created for- UDHD Sub-Departments
 * | Created Date- 28-02-2024
 * | Status - Done
 */

class UDHDSubDepartmentController {
  private dao: UDHDSubDepartmentDao;
  private initMsg;
  constructor() {
    this.dao = new UDHDSubDepartmentDao();
    this.initMsg = "UDHD Departments";
  }

  /// Get All UDHD sub departments
  getAll = async (req: Request, res: Response, apiId: string) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.dao.getAll();

      if (!data) {
        return CommonRes.SUCCESS(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res
        );
      }

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).FOUND,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };

  ///////// Get all Department on basis of UDHD_ID
  getAllDesignation = async (req: Request, res: Response, apiId: string) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.dao.getAllDesignation(Number(req.params.udhd_id));

      if (!data)
        return CommonRes.SUCCESS(
          resMessage(this.initMsg).NOT_FOUND,
          data,
          resObj,
          res
        );

      return CommonRes.SUCCESS(
        resMessage(this.initMsg + " Designations").FOUND,
        data,
        resObj,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, res);
    }
  };
}

export default UDHDSubDepartmentController;
