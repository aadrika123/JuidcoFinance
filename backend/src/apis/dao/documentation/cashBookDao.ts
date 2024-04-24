import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import BalanceTrackingsDao from "../budgeting/BalanceTrackingsDao";

/**
 * | Author- Sanjiv Kumar
 * | Created for- cash book Dao
 * | Status: open
 */

const prisma = new PrismaClient();

class CashBookDao {
  private balanceTrackingDao: BalanceTrackingsDao;
  constructor() {
    this.balanceTrackingDao = new BalanceTrackingsDao();
  }

  // Get limited cash bank receipt voucher
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: any =
      req.query.search !== undefined && req.query.search !== ""
        ? String(req.query.search)
        : false;
    let order: number = Number(req.query.order);

    const date =
      req.query.date !== undefined && req.query.date !== ""
        ? String(req.query.date)
        : false;

    if (order != -1 && order != 1) {
      order = 1;
    }

    const searchCondition = `'%${search}%'`;

    let a = "";
    if (search) {
      a += ` AND(
        ac.code ILIKE ${searchCondition} OR
        cb.receipt_voucher_no ILIKE ${searchCondition} OR
        ac.description ILIKE ${searchCondition}
      )`;
    }

    if (date) {
      a += ` AND DATE(cb.date) = '${date}'`;
    }

    const [result, count] = await prisma.$transaction([
      prisma.$queryRawUnsafe<[]>(`SELECT
      cb.id,
      cb.receipt_voucher_no,
      cb.date,
      cb.lf_no,
      cb.amount,
      ac.id as primary_acc_code_id,
      CONCAT(ac.code, '-', ac.description) as primary_acc_code_name
    FROM
    cash_books as cb
    LEFT JOIN
    account_codes as ac ON cb.primary_acc_code_id = ac.id
    WHERE (true ${a})
    ORDER BY
    cb.updated_at desc
    LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `),

      prisma.$queryRawUnsafe<[]>(`SELECT
      COUNT(*) as total
      FROM
      cash_books as cb
    LEFT JOIN
    account_codes as ac ON cb.primary_acc_code_id = ac.id
    WHERE (true ${a})`) as any,
    ]);

    const allData = [];

    for (const data of result as any) {
      const items: any = { ...data };
      items.primary_acc_code = {
        id: data.primary_acc_code_id,
        name: data.primary_acc_code_name,
      };

      delete items.primary_acc_code_id;
      delete items.primary_acc_code_name;

      allData.push(items);
    }

    return generateRes(
      allData,
      Number(BigInt(count[0].total)),
      page,
      limit,
      count[0]
    );
  };

  // Get single cash bank receipt voucher details
  getById = async (id: number) => {
    const query: Prisma.cash_booksFindManyArgs = {
      where: { id },
      select: {
        id: true,
        primary_acc_code: {
          select: {
            id: true,
            code: true,
            description: true,
          },
        },
        receipt_voucher_no: true,
        lf_no: true,
        date: true,
        amount: true,
        created_at: true,
        updated_at: true,
      },
    };

    const data: any = await prisma.cash_books.findFirst(query);

    return generateRes(data);
  };
}

export default CashBookDao;
