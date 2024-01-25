import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import ChequebookEntryDao from "../dao/chequebookEntryDao";
import ResMessage from "../responseMessage/chequebookEntryMessage";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */

class ChequebookEntryController {
  private checkbookEntryDao: ChequebookEntryDao;
  constructor() {
    this.checkbookEntryDao = new ChequebookEntryDao();
  }

    // create a new Vendor
    create = async (req: Request, res: Response): Promise<Response> => {
      try {
        
        const data = await this.checkbookEntryDao.store(req);
        return sendResponse(
          true,
          ResMessage.CREATED,
          data,
          200,
          "POST",
          "0801",
          "1.0",
          res
        );
      } catch (error: any) {
        return sendResponse(
          false,
          error.message,
          "",
          500,
          "POST",
          "0801",
          "1.0",
          res
        );
      }
    };
  

  // get all vendor
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.checkbookEntryDao.get(req);

      if(!data)
      return sendResponse(
        true,
        ResMessage.NOT_FOUND,
        data,
        200,
        "GET",
        "0802",
        "1.0",
        res
      );

      return sendResponse(
        true,
        ResMessage.FOUND,
        data,
        200,
        "GET",
        "0802",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error.message,
        "",
        500,
        "GET",
        "0802",
        "1.0",
        res
      );
    }
  };


}

export default ChequebookEntryController;
