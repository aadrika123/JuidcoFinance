import { Request, Response } from "express";
import { sendResponse } from "../../../../util/sendResponse";
import ChequebookEntryDao from "../../dao/masters/chequebookEntryDao";
import { chequebookValidation, chequebookValidationAlongWithID } from "../../requests/masters/cheuqebookValidation";
import Joi from "joi";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */

class ChequebookEntryController {
  private chequebookEntryDao: ChequebookEntryDao;
  constructor() {
    this.chequebookEntryDao = new ChequebookEntryDao();
  }

    // create a new chequebook
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = chequebookValidation.validate(req.body.data);
      if (error)
        return sendResponse(
          false,
          error.message,
          "error.code",
          400,
          "POST",
          "0801",
          "1.0",
          req,
          res
        );

      const data = await this.chequebookEntryDao.store(req);
      return sendResponse(
        true,
        "Chequebook added successfully",
        data,
        200,
        "POST",
        "0801",
        "1.0",
        req,
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error.message,
        "error.code",
        500,
        "POST",
        "0801",
        "1.0",
        req,
        res
      );
    }
  };

  

  // get all chequebooks
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.chequebookEntryDao.get(req);

      if (!data)
        return sendResponse(
          false,
          "No Chequebooks Found",
          data,
          200,
          "GET",
          "0802",
          "1.0",
          req,
          res
        );

      return sendResponse(
        true,
        "Chequebook Data fetched successfully",
        data,
        200,
        "GET",
        "0802",
        "1.0",
        req,
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error.message,
        "error.code",
        500,
        "GET",
        "0802",
        "1.0",
        req,
        res
      );
    }
  };

  // get employee list
  get_employee_list = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.chequebookEntryDao.get_employee_list(req);
      return sendResponse(
        true,
        "Employee list fetched successfully",
        data,
        200,
        "GET",
        "0803",
        "1.0",
        req,
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error.message,
        "error.code",
        500,
        "GET",
        "0803",
        "1.0",
        req,
        res
      );
    }
  };

  // get chequebook by ID
  getById = async (req: Request, res: Response): Promise<Response> => {
    
    
    try {
      // get the data
      const id: number = Number(req.params.chequebookId);
    

      // validate
      const { error } = Joi.object({
        id: Joi.number().required()
      }).validate({'id': id});

      if (error)
        return sendResponse(
          false,
          error.message,
          "error.code",
          400,
          "POST",
          "0804",
          "1.0",
          req,
          res
        );

      // fetch the data
      const data = await this.chequebookEntryDao.getById(id);

      if (!data)
        return sendResponse(
          false,
          "Chequebook Not Found",
          data,
          200,
          "GET",
          "0804",
          "1.0",
          req,
          res
        );

      return sendResponse(
        true,
        "Chequebook found successfully",
        data,
        200,
        "GET",
        "0804",
        "1.0",
        req,
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error.message,
        "error.code",
        500,
        "GET",
        "0703",
        "1.0",
        req,
        res
      );
    }
  };


  // update vendor information
  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      

      // validate fields
      const {error} = chequebookValidationAlongWithID.validate(req.body.data);
    
      if (error)
        return sendResponse(
          false,
          error.message,
          "error.code",
          403,
          "PATCH",
          "0805",
          "1.0",
          req,
          res
        );

      const data = await this.chequebookEntryDao.update(req);

      return sendResponse(
        true,
        "Chequebook updated successfully",
        data,
        200,
        "PATCH",
        "0705",
        "1.0",
        req,
        res
      );
    } catch (error: any) {
      
      if(Object.prototype.hasOwnProperty.call(error, 'code')){
        if(error.code == "P2025"){
          return sendResponse(
            true,
            "Illegal operation, your IP will be blacklisted.",
            [],
            200,
            "PATCH",
            "0805",
            "1.0",
            req,
            res
          );
        }
      }
      
      
      return sendResponse(
        false,
        "There was an unhandled error",
        error.code,
        500,
        "PATCH",
        "0805",
        "1.0",
        req,
        res
      );
    }
  };

}

export default ChequebookEntryController;
