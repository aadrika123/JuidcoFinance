import express from "express";
import { APIv1 } from "../../APIv1";
import DashboardController from "../../controller/dashboard/dashboardController";

class DashboardRoute extends APIv1 {
  private controller: DashboardController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "dashboard");
    this.controller = new DashboardController();
  }

  configure(): void {
    this.addGetRoute(`collection/get`, this.controller.getCollection);
    this.addGetRoute(
      `revenue-modules/get`,
      this.controller.getTopRevenueModules
    );
    this.addGetRoute(`ulbs/get`, this.controller.getTopUlbs);
    this.addGetRoute(`payment-modes/get`, this.controller.getTopPaymentModes);
    this.addGetRoute(
      `total-revenue/get`,
      this.controller.getTotalRevenueForCurrentPrevYear
    );
    this.addGetRoute(
      `revenue-expenditure-netPosition/get`,
      this.controller.getRevenueExpenditureNetPositionYearlyFor8Year
    );
    this.addGetRoute(`get`, this.controller.getDashboardData);
  }
}

export default DashboardRoute;
