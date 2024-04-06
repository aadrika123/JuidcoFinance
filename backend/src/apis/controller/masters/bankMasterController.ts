import { Request } from "express";
import BankMasterDao from "../../dao/masters/bankMasterDao";
import ResMessage from "../../responseMessage/masters/bankMasterMessage";
import { BankMasterValidation } from "jflib";
import { APIv1Response } from "../../APIv1";

/**
 * | Author- Bijoy Kumar
 * | Created On- 20-01-2024
 * | Created for- BankMaster Controller
 */

class BankMasterController {
  private bankMasterDao: BankMasterDao;
  constructor() {
    this.bankMasterDao = new BankMasterDao();
  }

  // Create
  create = async (req: Request): Promise<APIv1Response> => {
    try {
      await BankMasterValidation.bankMasterValidation.validate(req.body.data);

      const data = await this.bankMasterDao.store(req);

      return { status: true, code: 200, msg: ResMessage.CREATED, data: data };
    } catch (error: any) {
      return { status: false, code: 200, msg: error.message, data: error };
    }
  };

  // Get limited bank list
  get = async (req: Request): Promise<APIv1Response> => {
    try {
      const data = await this.bankMasterDao.get(req);

      if (!data)
        return {
          status: true,
          code: 200,
          msg: ResMessage.NOT_FOUND,
          data: data,
        };

      return { status: true, code: 200, msg: ResMessage.FOUND, data: data };
    } catch (error: any) {
      return { status: false, code: 200, msg: "Error", data: error };
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
          msg: ResMessage.NOT_FOUND,
          data: data,
        };

      return { status: true, code: 200, msg: ResMessage.FOUND, data: data };
    } catch (error: any) {
      return { status: false, code: 200, msg: "Error", data: error };
    }
  };

  // Update bank details by Id
  update = async (req: Request): Promise<APIv1Response> => {
    try {
      await BankMasterValidation.bankMasterUpdateValidation.validate(
        req.body.data
      );

      const data = await this.bankMasterDao.update(req);

      return { status: true, code: 200, msg: ResMessage.UPDATED, data: data };
    } catch (error: any) {
      return { status: false, code: 200, msg: "Error", data: error };
    }
  };

  // Get By AccountingCode and Ulb
  getByAccCodeAndUlb = async (req: Request): Promise<APIv1Response> => {
    try {
      const data = await this.bankMasterDao.getByAccCodeAndUlb(req);

      if(!data)
       return { status: true, code: 200, msg: ResMessage.NOT_FOUND, data: null };

      return { status: true, code: 200, msg: ResMessage.FOUND, data: data };
    } catch (error: any) {
      return { status: false, code: 200, msg: "Error", data: error };
    }
  };
}

export default BankMasterController;
