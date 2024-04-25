import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import BillsDao from "../../dao/payments/BillsDao";
import * as Yup from "yup";
import {multiBillEntryValidationSchema} from "jflib";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 15-04-2024
 */

class BillsController {
  private dao: BillsDao;
  constructor() {
    this.dao = new BillsDao();
  }

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
       const data = await this.dao.get(ulb, date, page, limit, search, order);
       
       // return the result
       if (!data) return {status: true, code: 201, message: "Not Found", data: data};
       return {status: true, code: 200, message: "Found", data: data};
  };


  generateUniqueRandomID = (existing: string[]) => {
    const millis = new Date().getTime();
    
    let id;
    do{
      const randomNumber = Math.floor(Math.random()*1000000000);
      id = `${millis}-${randomNumber}`;
    }while(existing.includes(id));

    existing.push(id);
    return id;
  }

  create = async (req: Request): Promise<APIv1Response> =>{
    //validate
    await multiBillEntryValidationSchema.validate(req.body.data);

    // collect the input
    const data = req.body.data;


    const existingIDs: string[] = [];

    // generate bill numbers
    data.forEach((record: any) => {
      record.bill_date = new Date(record.bill_date);
      record.bill_no = 'BN-'+ this.generateUniqueRandomID(existingIDs);
      console.log(record.bill_no);
    });

    // call dao
    const result = await this.dao.create(data);


    return {status: true, code: 200, message: "Created", data: result}
  }

}

export default BillsController;
