import express, { Request, Response } from "express";
import { baseUrl } from "../../../util/common";
import DailyCollSummaryController from "../../controller/revenueCollection/dailyCollSummaryController";

/**
 * | Author- Sanjiv Kumar
 * | Created for- Daily Collection Summary Route
 * | Status: Done
 */

class DailyCollSummaryRoute {
  private controller: DailyCollSummaryController;
  private baseUrl: string = `${baseUrl}/daily-coll-summary`;
  constructor() {
    this.controller = new DailyCollSummaryController();
  }

  configure(app: express.Application, apiId: string): void {
    app
      .route(`${this.baseUrl}/get-all`)
      .get((req: Request, res: Response) =>
        this.controller.get(req, res, apiId + "01")
      );
    app
      .route(`${this.baseUrl}/get-by-id/:id`)
      .get((req: Request, res: Response) =>
        this.controller.getById(req, res, apiId + "02")
      );
    app
      .route(`${this.baseUrl}/approve`)
      .post((req: Request, res: Response) =>
        this.controller.approve(req, res, apiId + "03")
      );
  }
}

export default DailyCollSummaryRoute;
