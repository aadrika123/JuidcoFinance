import { Request, Response } from "express";
import DepartmentDao from "../dao/departmentDao";
import CommonRes from "../../../util/helper/commonResponse";
import { resObj } from "../../../util/types";
import { resMessage } from "../responseMessage/commonMessage";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-01-2024
 * | Created for- Department Controller
 * | Common apiId- 06
 */

class DepartmentController {
  private departmentDao: DepartmentDao;
  private initMsg;

  constructor() {
    this.departmentDao = new DepartmentDao();
    this.initMsg = "Department";
  }

  // Get all Departments
  get = async (req: Request, res: Response): Promise<Response> => {
    const resObj: resObj = {
      apiId: "0601",
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await this.departmentDao.get();

      if (!data)
      return CommonRes.NOT_FOUND(
        resMessage(this.initMsg).NOT_FOUND,
        data,
        resObj,
        req,
        res
      );

      return CommonRes.SUCCESS(
        resMessage(this.initMsg).FOUND,
        data,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default DepartmentController;
