import { Request } from "express";
import BalanceTrackingsDao from "../../dao/budgeting/BalanceTrackingsDao";
import { APIv1Response } from "../../APIv1";
import * as Yup from "yup";


/**
 * | Author- Bijoy Paitandi
 * | Created for- BalanceTrackings Controller
 * | Status: open
 */

class BalanceTrackingsController {
  private balanceTrackingsDao: BalanceTrackingsDao;
  private initMsg: string;
  constructor() {
    this.balanceTrackingsDao = new BalanceTrackingsDao();
    this.initMsg = "BalanceTrackings Entry";
  }

  // Get limited bill invoices list
  get = async ( req: Request): Promise<APIv1Response> => {
    try {
      // collect input
      const page: number = Number(req.query.page);
      const limit: number = Number(req.query.limit);
      const search: string = String(req.query.search);
      let order: number = Number(req.query.order);

      if (order != -1 && order != 1) {
        order = -1;
      }

      // validate


      // call dao
      const data = await this.balanceTrackingsDao.get(page, limit, search, order);

      // generate response
      if (!data) return {status: true, code: 201, message: "Not Found", data: data};
      return {status: true, code: 200, message: "Found", data: data};
    } catch (error: any) {
      return { status: false, code: 500, message: "Error", data: error};  
    }
  };

  // Get single biull invoice details by Id
  getById = async ( req: Request): Promise<APIv1Response> => {
    try {
      const id: number = Number(req.params.id);

      // validate id
      await Yup.object({
        id: Yup.number().required("Id is required")
      }).validate({ 'id': id });

      const data = await this.balanceTrackingsDao.getById(id);

      if (!data) return {status: true, code: 201, message: "Not Found", data: data};

      return {status: true, code: 200, message: "Found", data: data};
    } catch (error: any) {
      return { status: false, code: 500, message: "Error", data: error};  
    }
  };



  // Get single biull invoice details by Id
  getBalance = async (req: Request ): Promise<APIv1Response> => {
    try {
      const id: number = Number(req.params.id);

      // validate id
      await Yup.object({
        id: Yup.number().required("Id is required.")
      }).validate({ 'id': id });

      const data = await this.balanceTrackingsDao.getBalance(id);

      if (!data) return {status: true, code: 201, message: "Not Found", data: data};

      return {status: true, code: 200, message: "Found", data: data};
    } catch (error: any) {
      return { status: false, code: 500, message: "Error", data: error};  
    }
  };


  // Get limited bill invoices list
  getLatestBalances = async (req: Request): Promise<APIv1Response> => {
    try {
      const data = await this.balanceTrackingsDao.getLatestBalances(req);

      if (!data) return {status: true, code: 201, message: "Not Found", data: data};

      return {status: true, code: 200, message: "Found", data: data};
    } catch (error: any) {
      return { status: false, code: 500, message: "Error", data: error};  
    }
  };

  getScheduleReport = async (req: Request): Promise<APIv1Response> => {
    try {

      const id: number = Number(req.params.id);
      const ulbID: number = Number(req.query.ulb);
      const year: number= Number(req.query.year);

      console.log(year);

      // validate id
      await Yup.object({
        id: Yup.number().required("Id is required.")
      }).validate({ 'id': id });

      const data = await this.balanceTrackingsDao.getScheduleReport(id, ulbID, year);

      if (!data) return {status: true, code: 201, message: "Not Found", data: data};

      return {status: true, code: 200, message: "Found", data: data};
    } catch (error: any) {
      return { status: false, code: 500, message: "Error", data: error};  
    }
  };


  getGeneralLedgerReport = async (req: Request): Promise<APIv1Response> => {
    try {

      const id: number = Number(req.params.id);
      const ulbID: number = Number(req.query.ulb);
      const year: number= Number(req.query.year);


      // validate id
      await Yup.object({
        id: Yup.number().required("Id is required.")
      }).validate({ 'id': id });



      const data = await this.balanceTrackingsDao.getGeneralLedgerReport(id, ulbID, year);

      if (!data) return {status: true, code: 201, message: "Not Found", data: data};

      return {status: true, code: 200, message: "Found", data: data};
    } catch (error: any) {
      return { status: false, code: 500, message: "Error", data: error};  
    }
  };


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getFinYears = async (req: Request): Promise<APIv1Response> => {
    try {
      
      const data = await this.balanceTrackingsDao.getFinYears();
      if (!data) return {status: true, code: 201, message: "Not Found", data: data};

      return {status: true, code: 200, message: "Found", data: data};
    } catch (error: any) {
      return { status: false, code: 500, message: "Error", data: error};  
    }
  };

  getTrialBalance = async (req: Request): Promise<APIv1Response> => {
    
    
    // validate
    await Yup.object({
      ulb: Yup.number().required("ulb is required."),
      year: Yup.number().required("Year is required.")
    }).validate(req.query);

    // get data
    const ulb = Number(req.query.ulb);
    const year = Number(req.query.year);


    // call dao
    const data = await this.balanceTrackingsDao.getTrialBalance(Number(ulb), Number(year));

    // return the result
    return {status: true, code: 200, message: "Found", data: data};
  }


  getIncomeStatement = async(req: Request): Promise<APIv1Response> => {

    //validate
    await Yup.object({
      ulb: Yup.number().required("ulb is required."),
      year: Yup.number().required("year is required.")
    }).validate(req.query);

    // get data
    const ulb = Number(req.query.ulb);
    const year = Number(req.query.year);

    // call dao
    const data: any[] = await this.balanceTrackingsDao.getTrialBalance(Number(ulb), Number(year));


    // business logic
    const income: any[] = [];
    const expenditure: any[] = [];

    data.forEach((item) => {
      const majorHead = parseInt(item.code.substring(0,2));
      if(11 <= majorHead && majorHead <= 18) income.push(item);
      else if(21 <= majorHead && majorHead <= 27) expenditure.push(item);
    });

    const new_data = {
      income: income,
      expenditure: expenditure
    };

    // return the result
    return {status: true, code: 200, message: "Found", data: new_data};
  }


}

export default BalanceTrackingsController;

