import { Request } from "express";
import * as Yup from "yup";
import BillVerificationDao from "../../dao/payments/BillVerificationDao";
import { BillStages } from "jflib";
import { APIv1Response } from "../../APIv1";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 15-04-2024
 */

class BillVerificationController {
  private dao: BillVerificationDao;
  constructor() {
    this.dao = new BillVerificationDao();
  }

  commonCallFunction = async (
    req: Request,
    level: number,
    callDao: (
      ulbId: number,
      page: number,
      limit: number,
      search: string,
      order: number,
      level:number
    ) => any
  ) : Promise<APIv1Response> => {
    const query = req.query;

    // validate
    await Yup.object({
      ulbId: Yup.number().required("ulb is required"),
      page: Yup.number().required("page is required."),
      limit: Yup.number().required("limit is required."),
      search: Yup.string().optional(),
      order: Yup.number().oneOf([-1, 1], "Invalid value for order").optional(),
    }).validate(query);

    // collect input
    const ulbId: number = Number(query.ulbId);
    const page: number = Number(query.page);
    const limit: number = Number(query.limit);
    const search: string = query?.search ? String(query.search) : "";
    const order: number = query?.order ? Number(query.order) : -1;

    const data = await callDao(ulbId, page, limit, search, order, level);

    if (!data)
      return { status: true, code: 201, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };


  getInbox = async (req: Request) : Promise<APIv1Response> => {
    const user = req.body.user;
    if(user.isJuniorEngineer())
      return await this.commonCallFunction(req, BillStages.ApprovedByJuniorEngineer, this.dao.getLevel0JuniorEngineerInbox);
    else if(user.isAssistantEngineer())
      return this.commonCallFunction(req, BillStages.ApprovedByAssistantEngineer, this.dao.getHigherLevelInbox);
    
    throw new Error("User not authorized.");
  }




  ////// Getting Bill By Id
  getBillById = async (req: Request) => {
    const params = req.params;

    // validate
    await Yup.object({
      billId: Yup.number().required("billId is required"),
    }).validate(params);

    // collecting requirements
    const billId: number = Number(params.billId);

    const data = await this.dao.getBillById(billId);

    if (!data)
      return { status: false, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };

  ///// Approving Bill
  approveBill = async (req: Request) => {
    const { data, user } = req.body;

    await Yup.object({
      bill_id: Yup.number().required("billId is required"),
    }).validate(data);

    ////// Getting Last Bill From Bill Checking By Bill Id
    const lastBill = await this.dao.getLastBillFromBillCheckingByBillId(
      data?.bill_id
    );

    if (!lastBill) if (!user.isJuniorEngineer()) throw "You are not allowed.";

    const reqData = {
      bill_id: data?.bill_id,
      checker_id: user?.getUserId(),
      approval_stage_id: BillStages.ApprovedByJuniorEngineer,
    };

    const resData = await this.dao.approveBill(reqData);

    return { status: true, code: 200, message: "Approved", data: resData };
  };
}

export default BillVerificationController;
