import { Request } from "express";
import BankMasterDao from "../../dao/masters/bankMasterDao";
import ResMessage from "../../responseMessage/masters/bankMasterMessage";
import { BankMasterValidation } from "jflib";
import { APIv1Response } from "../../APIv1";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 20-01-2024
 */

class BankMasterController {
  private bankMasterDao: BankMasterDao;
  constructor() {
    this.bankMasterDao = new BankMasterDao();
  }

  create = async (req: Request): Promise<APIv1Response> => {
    
    try {
      await BankMasterValidation.bankMasterValidation.validate(req.body.data);

      console.log(req.body.data);
      const data = await this.bankMasterDao.store(req.body.data);

      return { status: true, code: 200, message: ResMessage.CREATED, data: data };
    } catch (error: any) {
      return { status: false, code: 200, message: error.message, data: error };
    }
  };

  // Get limited bank list
  get = async (req: Request): Promise<APIv1Response> => {
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
       const data = await this.bankMasterDao.get(page, limit, search, order);
       if (!data) return {status: true, code: 201, message: ResMessage. NOT_FOUND, data: data};
       return {status: true, code: 200, message: ResMessage.FOUND, data: data};
     } catch (error: any) {
       return { status: false, code: 500, message: "Error", data: error};  
     }
  };

  // Get single bank details by Id
  getById = async (req: Request): Promise<APIv1Response> => {
    try {
      const id: number = Number(req.params.bankId);
      const data = await this.bankMasterDao.getById(id);

      if (!data)
        return {
          status: true,
          code: 200,
          message: ResMessage.NOT_FOUND,
          data: data,
        };

      return { status: true, code: 200, message: ResMessage.FOUND, data: data };
    } catch (error: any) {
      return { status: false, code: 200, message: "Error", data: error };
    }
  };

  // Update bank details by Id
  update = async (req: Request): Promise<APIv1Response> => {
    try {
      await BankMasterValidation.bankMasterUpdateValidation.validate(
        req.body.data
      );

      const data = await this.bankMasterDao.update(req.body.data);

      return { status: true, code: 200, message: ResMessage.UPDATED, data: data };
    } catch (error: any) {
      return { status: false, code: 200, message: "Error", data: error };
    }
  };

  // Get By AccountingCode and Ulb
  getByAccCodeAndUlb = async (req: Request): Promise<APIv1Response> => {
    try {

      const { accCodeId, ulbId } = req.params;

      const data = await this.bankMasterDao.getByAccCodeAndUlb(Number(accCodeId), Number(ulbId));

      if(!data)
       return { status: true, code: 200, message: ResMessage.NOT_FOUND, data: null };

      return { status: true, code: 200, message: ResMessage.FOUND, data: data };
    } catch (error: any) {
      return { status: false, code: 200, message: "Error", data: error };
    }
  };

  // Get by Ulb
  getByUlb = async (req: Request): Promise<APIv1Response> => {
    try {

      const { ulbId } = req.params;

      const data = await this.bankMasterDao.getByUlb(Number(ulbId));

      if(!data)
       return { status: true, code: 200, message: ResMessage.NOT_FOUND, data: null };

      return { status: true, code: 200, message: ResMessage.FOUND, data: data };
    } catch (error: any) {
      return { status: false, code: 200, message: "Error", data: error };
    }
  };
}

export default BankMasterController;
