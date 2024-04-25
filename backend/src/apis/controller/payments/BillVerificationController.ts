import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import * as Yup from "yup";
import BillVerificationDao from "../../dao/payments/BillVerificationDao";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 15-04-2024
 */

class BillVerificationController {
  private dao: BillVerificationDao;
  constructor() {
    this.dao = new BillVerificationDao();
  }

  getLevel0JuniorEngineerInbox = async (req: Request): Promise<APIv1Response> => {
    // const user = req.body.user;    
    // console.log(user);
    // console.log(user.isProjectDirectorFinance());

    const query = req.query;

    // validate
    await Yup.object({
      ulbId: Yup.number().required("ulb is required"),
      page: Yup.number().required("page is required."),
      limit: Yup.number().required("limit is required."),
      search: Yup.string().optional(),
      order: Yup.number().oneOf([-1,1], "Invalid value for order").optional(),
    }).validate(query);

    // collect input
    const ulbId: number = Number(query.ulbId);
    const page: number = Number(query.page);
    const limit: number = Number(query.limit);
    const search: string = query?.search? String(query.search): "";
    const order: number = query?.order? Number(query.order): -1; 

    
     // call dao
     const data = await this.dao.getLevel0JuniorEngineerInbox(ulbId, page, limit, search, order);
     
     // console.log(data);

     // return the result
     if (!data) return {status: true, code: 201, message: "Not Found", data: data};
     return {status: true, code: 200, message: "Found", data: data};
};


}

export default BillVerificationController;
