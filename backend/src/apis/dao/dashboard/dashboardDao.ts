import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import {
  getCurrFinancialYear,
  getPrevFinancialYear,
} from "../../../util/helper/getCurrentFinancialYear";

const prisma = new PrismaClient();

class DashboardDao {
  public demandAmountFor4Years: any;
  public expenditureFor4Years: any;
  constructor() {
    this.demandAmountFor4Years = [2000, 1500, 1400, 1300];
    this.expenditureFor4Years = [400, 650, 543, 542];
  }

  getCollection = async () => {
    const { startDate, endDate } = getCurrFinancialYear();

    const collectionData: any[] = await prisma.$queryRaw`
    SELECT
    SUM(CASE WHEN cbrv.voucher_date::date BETWEEN ${startDate}::date AND ${endDate}::date then cbrv.amount else 0 end) as current_amount,
    SUM(CASE WHEN cbrv.voucher_date::date < ${startDate}::date then cbrv.amount else 0 end) as arrear_amount
    FROM
        cash_bank_receipt_vouchers AS cbrv`;

    const data = {
      currentAmount: collectionData[0]?.current_amount || 0,
      arrearAmount: collectionData[0]?.arrear_amount || 0,
    };

    return generateRes(data);
  };

  getTopRevenuModules = async () => {
    const { startDate, endDate } = getCurrFinancialYear();

    const revenueModules: any[] = await prisma.$queryRaw`
    select sum(rr.bank_amount + rr.cash_amount) as amount, rm.name
    from receipt_registers as rr 
    left join
    revenue_modules as rm on rm.id = rr.revenue_module_id
    where rr.is_checked = true and rr.receipt_date::date between ${startDate}::date and ${endDate}::date
    group by rm.name
    order by
    amount desc
    limit 6
   `;

    return generateRes(revenueModules);
  };

  getDemandForCurrAndPrev = async () => {
    const data = {
      current_amount: this.demandAmountFor4Years[0],
      previous_amount: this.demandAmountFor4Years[1],
    };
    return generateRes(data);
  };

  getDemandForCurrAndArrear = async () => {
    const data = {
      current_amount: this.demandAmountFor4Years[0],
      arrear_amount: this.demandAmountFor4Years.reduce(
        (acc: number, curr: number) => acc + curr,
        0
      ),
    };
    return generateRes(data);
  };

  getExpenditureForCurrAndPrev = () => {
    const expenditure = {
      current_amount: 400,
      previous_amount: 650,
    };
    return generateRes(expenditure);
  };

  getTopUlbs = async () => {
    const { startDate, endDate } = getCurrFinancialYear();

    const ulbs: any[] = await prisma.$queryRaw`
    select sum(rr.bank_amount + rr.cash_amount) as amount, mc.ulbs as name
    from receipt_registers as rr 
    left join
    municipality_codes as mc on mc.id = rr.ulb_id
    where rr.is_checked = true and  rr.receipt_date::date between ${startDate}::date and ${endDate}::date
    group by mc.ulbs
    order by
    amount desc
    limit 6
   `;

    return generateRes(ulbs);
  };

  getTopPaymentMode = async () => {
    const { startDate, endDate } = getCurrFinancialYear();

    const paymentModes: any[] = await prisma.$queryRaw`
    select sum(rr.bank_amount + rr.cash_amount) as amount, rm.name
    from receipt_registers as rr 
    left join
    receipt_modes as rm on rm.id = rr.receipt_mode_id
    where rr.is_checked = true and  rr.receipt_date::date between ${startDate}::date and ${endDate}::date
    group by rm.name
    order by
    amount desc
    limit 6
   `;

    return generateRes(paymentModes);
  };

  getTotalRevenueForCurrentPrevYear = async () => {
    const { startDate, endDate } = getCurrFinancialYear();
    const { prevStartDate, prevEndDate } = getPrevFinancialYear();

    const data = (await prisma.$queryRaw`
    select 
    sum(case when rr.is_checked = true and rr.receipt_date::date between ${startDate}::date and ${endDate}::date then rr.bank_amount + rr.cash_amount else 0 end) as current_amount,
    sum(case when rr.is_checked = true and rr.receipt_date::date between ${prevStartDate}::date and ${prevEndDate}::date then rr.bank_amount + rr.cash_amount else 0 end) as previous_amount
    from receipt_registers as rr
    `) as any;

    const demand = await this.getDemandForCurrAndPrev();
    const d = data[0];
    d.current_amount = d.current_amount + demand?.current_amount;
    d.previous_amount = d.previous_amount + demand?.previous_amount;

    return generateRes(d);
  };

  getRevenueExpenditureNetPositionYearlyFor8Year = async () => {
    const data = (await prisma.$queryRaw`
    select 
    sum(case when rr.is_checked = true and rr.receipt_date::date between '2024-04-01'::date and '2025-03-01'::date then rr.bank_amount + rr.cash_amount else 0 end) + ${this.demandAmountFor4Years[0]} as one,
    sum(case when rr.is_checked = true and rr.receipt_date::date between '2023-04-01'::date and '2024-03-01'::date then rr.bank_amount + rr.cash_amount else 0 end) + ${this.demandAmountFor4Years[1]} as two,
    sum(case when rr.is_checked = true and rr.receipt_date::date between '2022-04-01'::date and '2023-03-01'::date then rr.bank_amount + rr.cash_amount else 0 end) + ${this.demandAmountFor4Years[2]} as three,
    sum(case when rr.is_checked = true and rr.receipt_date::date between '2021-04-01'::date and '2023-03-01'::date then rr.bank_amount + rr.cash_amount else 0 end) + ${this.demandAmountFor4Years[3]} as foure
    from receipt_registers as rr
    `) as any;

    const d: any = [];
    for (const item in data[0]) {
      d.push(data[0][item]);
    }

    const netPosition = this.expenditureFor4Years.map(
      (item: number, index: number) =>
        d[index] - item
    );

    const calculatedData = {
      revenue: d,
      expenditure: this.expenditureFor4Years,
      netPosition,
    };

    return generateRes(calculatedData);
  };

  // getRevenuData = async () => {
  //   const { startDate, endDate } = getCurrFinancialYear();
  //   const { prevStartDate, prevEndDate } = getPrevFinancialYear();

  //   const data = await prisma.$queryRaw`
  //   SELECT
  //   SUM(CASE WHEN cbrv.voucher_date::date BETWEEN ${startDate}::date AND ${endDate}::date then cbrv.amount else 0 end) as currentAmount,
  //   SUM(CASE WHEN cbrv.voucher_date::date < ${startDate}::date then cbrv.amount else 0 end) as arrearAmount
  //   FROM
  //   cash_bank_receipt_vouchers AS cbrv
  //   UNION
  //   select sum(rr.bank_amount + rr.cash_amount) as amount, rm.name
  //   from receipt_registers as rr
  //   left join
  //   receipt_modes as rm on rm.id = rr.receipt_mode_id
  //   where rr.is_checked = true and  rr.receipt_date::date between ${startDate}::date and ${endDate}::date
  //   group by rm.name
  //   order by
  //   amount desc
  //   limit 6
  //   `;
  // };
}

export default DashboardDao;
