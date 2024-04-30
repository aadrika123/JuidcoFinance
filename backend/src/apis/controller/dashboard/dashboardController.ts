import { APIv1Response } from "../../APIv1";
import DashboardDao from "../../dao/dashboard/dashboardDao";

/**
 * | Author- Sanjiv
 * | Created On- 28-04-2024
 */

class DashboardController {
  private dao: DashboardDao;
  constructor() {
    this.dao = new DashboardDao();
  }

  getCollection = async (): Promise<APIv1Response> => {
    const data = await this.dao.getCollection();

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };

  getTopRevenueModules = async (): Promise<APIv1Response> => {
    const data = await this.dao.getTopRevenuModules();

    if (!data)
      return {
        status: true,
        code: 200,
        message: "Revenue Module Not Found",
        data: data,
      };
    return {
      status: true,
      code: 200,
      message: "Revenue Module Found",
      data: data,
    };
  };

  getTopUlbs = async (): Promise<APIv1Response> => {
    const data = await this.dao.getTopUlbs();

    if (!data)
      return { status: true, code: 200, message: "Ulb Not Found", data: data };
    return { status: true, code: 200, message: "Ulb Found", data: data };
  };

  getTopPaymentModes = async (): Promise<APIv1Response> => {
    const data = await this.dao.getTopPaymentMode();

    if (!data)
      return {
        status: true,
        code: 200,
        message: "Payment Mode Not Found",
        data: data,
      };
    return {
      status: true,
      code: 200,
      message: "Payment Mode Found",
      data: data,
    };
  };

  getTotalRevenueForCurrentPrevYear = async (): Promise<APIv1Response> => {
    const data = await this.dao.getTotalRevenueForCurrentPrevYear();

    if (!data)
      return {
        status: true,
        code: 200,
        message: "Total Revenue Not Found",
        data: data,
      };
    return {
      status: true,
      code: 200,
      message: "Total Revenue Found",
      data: data,
    };
  };

  getRevenueExpenditureNetPositionYearlyFor8Year =
    async (): Promise<APIv1Response> => {
      const data =
        await this.dao.getRevenueExpenditureNetPositionYearlyFor8Year();

      if (!data)
        return {
          status: true,
          code: 200,
          message: "Revenue/Expenditure/NetPosition Not Found",
          data: data,
        };
      return {
        status: true,
        code: 200,
        message: "Revenue/Expenditure/NetPosition Found",
        data: data,
      };
    };

  getDashboardData = async (): Promise<APIv1Response> => {
    const revExpNetPosition =
      await this.dao.getRevenueExpenditureNetPositionYearlyFor8Year();
    const collection = await this.dao.getCollection();
    const revenueModules = await this.dao.getTopRevenuModules();
    const ulbs = await this.dao.getTopUlbs();
    const paymentModes = await this.dao.getTopPaymentMode();
    const totalRevenue = await this.dao.getTotalRevenueForCurrentPrevYear();

    const expenditure = this.dao.getExpenditureForCurrAndPrev();
    const demand = await this.dao.getDemandForCurrAndArrear();

    const netPosition = {
      current_amount: totalRevenue?.current_amount - expenditure.current_amount,
      previous_amount: totalRevenue?.previous_amount - expenditure.previous_amount,
    }

    const data = {
      collection,
      paymentModes,
      revenueModules,
      totalRevenue,
      ulbs,
      revExpNetPosition,
      expenditure,
      netPosition,
      demand
    };

    if (
      !revExpNetPosition &&
      !collection &&
      !revenueModules &&
      !ulbs &&
      !paymentModes &&
      !totalRevenue &&
      !netPosition &&
      !demand
    )
      return {
        status: true,
        code: 200,
        message: "dashboard data Not Found",
        data: null,
      };
    return {
      status: true,
      code: 200,
      message: "dashboard data Found",
      data: data,
    };
  };
}

export default DashboardController;
