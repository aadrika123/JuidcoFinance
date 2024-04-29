import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import {
  getCurrFinancialYear,
  getPrevFinancialYear,
} from "../../../util/helper/getCurrentFinancialYear";

const prisma = new PrismaClient();

class DashboardDao {
  getCollection = async () => {
    const { startDate, endDate } = getCurrFinancialYear();

    const collectionData: any[] = await prisma.$queryRaw`
    SELECT
    SUM(CASE WHEN cbrv.voucher_date::date BETWEEN ${startDate}::date AND ${endDate}::date then cbrv.amount else 0 end) as currentAmount,
    SUM(CASE WHEN cbrv.voucher_date::date < ${startDate}::date then cbrv.amount else 0 end) as arrearAmount
    FROM
        cash_bank_receipt_vouchers AS cbrv`;

    const data = {
      currentAmount: collectionData[0]?.currentAmount || 0,
      arrearAmount: collectionData[0]?.arrearAmount || 0,
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

    return generateRes(data[0]);
  };

  getRevenueExpenditureNetPositionYearlyFor8Year = async () => {
    const data = (await prisma.$queryRaw`
    select 
    sum(case when rr.is_checked = true and rr.receipt_date::date between '2023-04-01'::date and '2024-03-01'::date then rr.bank_amount + rr.cash_amount else 0 end) as one,
    sum(case when rr.is_checked = true and rr.receipt_date::date between '2022-04-01'::date and '2023-03-01'::date then rr.bank_amount + rr.cash_amount else 0 end) as two,
    sum(case when rr.is_checked = true and rr.receipt_date::date between '2021-04-01'::date and '2023-03-01'::date then rr.bank_amount + rr.cash_amount else 0 end) as three,
    sum(case when rr.is_checked = true and rr.receipt_date::date between '2020-04-01'::date and '2021-03-01'::date then rr.bank_amount + rr.cash_amount else 0 end) as foure
    from receipt_registers as rr
    `) as any;

    const d: any = [];
    for (const item in data[0]) {
      d.push(data[0][item]);
    }

    const expenditure = [400, 650, 543, 542];

    const netPosition = expenditure.map((item, index) => d[index] - item);

    const calculatedData = {
      revenue: d,
      expenditure,
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
