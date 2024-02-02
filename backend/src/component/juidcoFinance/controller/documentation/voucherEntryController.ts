import { Request, Response } from "express";
import VoucherEntryDao from "../../dao/documentation/voucherEntryDao";
import { sendResponse } from "../../../../util/sendResponse";
import { resMessage } from "../../../../util/common";
import { voucherEntryValidation } from "../../requests/documentation/voucherEntryValidation";

/**
 * | Author- Krish
 * | Created On- 01-02-2024
 * | Created for- Voucher Entry Controller
 * | Common apiId- 18
 */

class VoucherEntryController {
  private voucherEntryDao: VoucherEntryDao;

  constructor() {
    this.voucherEntryDao = new VoucherEntryDao();
  }

  // Create
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error } = voucherEntryValidation.validate(req.body);

      if (error)
        return sendResponse(false, error, "", 403, "POST", "1801", "1.0", res);

      const data = await this.voucherEntryDao.store(req);
      return sendResponse(
        true,
        resMessage("Voucher Entry").CREATED,
        data,
        201,
        "POST",
        "1801",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(false, error, "", 500, "POST", "1801", "1.0", res);
    }
  };

  // Get limited Voucher entry list
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.voucherEntryDao.get(req);

      if (!data)
        return sendResponse(
          true,
          resMessage("Voucher entry").NOT_FOUND,
          data,
          200,
          "GET",
          "1802",
          "1.0",
          res
        );

      return sendResponse(
        true,
        resMessage("Voucher entry").FOUND,
        data,
        200,
        "GET",
        "1802",
        "1.0",
        res
      );
    } catch (error: any) {
      return sendResponse(false, error, "", 500, "GET", "1802", "1.0", res);
    }
  };
}

export default VoucherEntryController;
