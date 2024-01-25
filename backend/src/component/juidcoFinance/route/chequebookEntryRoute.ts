import { baseUrl } from "../../../util/common";
import express from "express";
import ChequebookEntryController from "../controller/chequebookEntryController";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status: closed
 */

class ChequeBookEntryRoute {
  private chequebookEntryController: ChequebookEntryController;
  private baseUrl = `${baseUrl}/chequebook-entry`;

  constructor() {
    this.chequebookEntryController = new ChequebookEntryController();
  }
  
  configure(app: express.Application): void {
    app.route(`${this.baseUrl}/create`).post(this.chequebookEntryController.create) //801;
    app.route(`${this.baseUrl}/get`).get(this.chequebookEntryController.get); //0802

    
  }
}

export default ChequeBookEntryRoute;
