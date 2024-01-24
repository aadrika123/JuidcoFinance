import { Request, Response } from "express";
import { sendResponse } from "../../../util/sendResponse";
import ChequebookEntryDao from "../dao/chequebookEntryDao";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry Controller
 * | Comman apiId- 08
 */

class ChequebookEntryController {
  private vendorMasterDao: ChequebookEntryDao;
  constructor() {
    this.vendorMasterDao = new ChequebookEntryDao();
  }

  // get all vendor
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.vendorMasterDao.get(req);
      return sendResponse(
        true,
        "Chequebook Data fetched successfully",
        data,
        200,
        "GET",
        "0702",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(
        false,
        error.message,
        "error.code",
        500,
        "GET",
        "0702",
        "1.0",
        res
      );
    }
  };


}

export default ChequebookEntryController;
