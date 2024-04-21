import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import BillsDao from "../../dao/payments/BillsDao";
import * as Yup from "yup";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 15-04-2024
 */

class BillsController {
  private billsDao: BillsDao;
  constructor() {
    this.billsDao = new BillsDao();
  }

  // Get limited bank list
  get = async (req: Request): Promise<APIv1Response> => {
      const query = req.query;

       // validate
      await Yup.object({
        ulb: Yup.number().required("ulb is required"),
        date: Yup.string().required().matches(/^\d{4}[-]\d{2}[./-]\d{2}$/, "Date must be in YYYY-MM-DD format"),
        page: Yup.number().required("page is required."),
        limit: Yup.number().required("limit is required."),
        search: Yup.string().optional(),
        order: Yup.number().oneOf([-1,1], "Invalid value for order").optional(),

      }).validate(query);

       // collect input
       const ulb: number = Number(query.ulb);
       const date: string = query.date as string;
       const page: number = Number(query.page);
       const limit: number = Number(query.limit);
       const search: string = query?.search? String(query.search): "";
       const order: number = query?.order? Number(query.order): -1; 
 
      
       // call dao
       const data = await this.billsDao.get(ulb, date, page, limit, search, order);

       // return the result
       if (!data) return {status: true, code: 201, message: "Not Found", data: data};
       return {status: true, code: 200, message: "Found", data: data};
  };


  create = async (req: Request): Promise<APIv1Response> =>{

    console.log(req.body);
    console.log(req.files);
    console.log(req.body.data);
    console.log(req.headers);

    return {status: true, code: 200, message: "Created", data: {}}
  }

}

export default BillsController;
