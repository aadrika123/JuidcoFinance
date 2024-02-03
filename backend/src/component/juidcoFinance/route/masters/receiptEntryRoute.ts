import { baseUrl } from "../../../../util/common";
import express from "express";
import ReceiptEntryController from "../../controller/masters/receiptEntryController";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 31-01-2024
 * | Created for- Receipt Entry
 * | Status: closed
 */

class ReceiptEntryRoute {
  private receiptEntryController: ReceiptEntryController;
  private baseUrl = `${baseUrl}/receipt-entry`;

  constructor() {
    this.receiptEntryController = new ReceiptEntryController();
  }
  
  configure(app: express.Application): void {
    app.route(`${this.baseUrl}/get`).get(this.receiptEntryController.get); //0802
    
  }
}

export default ReceiptEntryRoute;
