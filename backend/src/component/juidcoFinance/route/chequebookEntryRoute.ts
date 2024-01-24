import { baseUrl } from "../../../util/common";
import express from "express";
import ChequebookEntryController from "../controller/chequebookEntryController";

class ChequeBookEntryRoute {
  private chequebookEntryController: ChequebookEntryController;
  private baseUrl = `${baseUrl}/chequebook-entry`;

  constructor() {
    this.chequebookEntryController = new ChequebookEntryController();
  }
  
  configure(app: express.Application): void {
    app.route(`${this.baseUrl}/get`).get(this.chequebookEntryController.get); //0702

    
  }
}

export default ChequeBookEntryRoute;
