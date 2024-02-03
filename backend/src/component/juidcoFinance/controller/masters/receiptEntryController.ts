import { Request, Response } from "express";
import { sendResponse } from "../../../../util/sendResponse";
import ReceiptEntryDao from "../../dao/transactions/receiptEntryDao";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 31-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */

class ReceiptEntryController {
  private receiptEntryDao: ReceiptEntryDao;
  constructor() {
    this.receiptEntryDao = new ReceiptEntryDao();
  }

  // get all chequebooks
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.receiptEntryDao.get(req);

      if (!data)
        return sendResponse(
          true,
          "No Receipts Found",
          data,
          200,
          "GET",
          "0802",
          "1.0",
          res
        );

      return sendResponse(
        true,
        "Receipt Data fetched successfully",
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
        "error.code",
        500,
        "GET",
        "0802",
        "1.0",
        res
      );
    }
  };

}

export default ReceiptEntryController;
