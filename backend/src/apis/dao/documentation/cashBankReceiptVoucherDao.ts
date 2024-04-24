import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import BalanceTrackingsDao from "../budgeting/BalanceTrackingsDao";

/**
 * | Author- Sanjiv Kumar
 * | Created for- cash bank receipt voucher Dao
 * | Status: open
 */

const prisma = new PrismaClient();

interface IdItem {
  id: number;
}

class CashBankReceiptVoucherDao {
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
    const ulbId =
      req.query.ulb !== undefined && req.query.ulb !== ""
        ? Number(req.query.ulb)
        : false;

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
        bm.bank_acc_no ILIKE ${searchCondition}
      )`;
    }

    if (ulbId) {
      a += ` AND mc.id = ${ulbId}`;
    }

    if (date) {
      a += ` AND DATE(cbrv.voucher_date) = '${date}'`;
    }

    const [result, count] = await prisma.$transaction([
      prisma.$queryRawUnsafe<[]>(`SELECT
      cbrv.id,
      cbrv.crv_brv_no,
      cbrv.voucher_date,
      cbrv.pay_in_slip_ref_no,
      cbrv.pay_in_slip_date,
      cbrv.amount,
      mc.id as ulb_id,
      mc.ulbs,
      bm.id as bank_id,
      bm.bank_acc_no,
      ac.id as primary_acc_code_id,
      CONCAT(ac.code, '-', ac.description) as primary_acc_code_name,
      cbrv.is_approved
    FROM
    cash_bank_receipt_vouchers as cbrv
    LEFT JOIN
    municipality_codes as mc ON cbrv.ulb_id = mc.id
    LEFT JOIN
    account_codes as ac ON cbrv.primary_acc_code_id = ac.id
    LEFT JOIN
    bank_masters as bm ON cbrv.bank_id = bm.id
    WHERE (true ${a})
    ORDER BY
    cbrv.updated_at desc
    LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `),

      prisma.$queryRawUnsafe<[]>(`SELECT
      COUNT(*) as total
      FROM
      cash_bank_receipt_vouchers as cbrv
    LEFT JOIN
    municipality_codes as mc ON cbrv.ulb_id = mc.id
    LEFT JOIN
    account_codes as ac ON cbrv.primary_acc_code_id = ac.id
    LEFT JOIN
    bank_masters as bm ON cbrv.bank_id = bm.id
    WHERE (true ${a})`) as any,
    ]);

    const allData = [];

    for (const data of result as any) {
      const items: any = { ...data };
      items.primary_acc_code = {
        id: data.primary_acc_code_id,
        name: data.primary_acc_code_name,
      };
      items.ulb = {
        id: data.ulb_id,
        name: data.ulbs,
      };
      items.bank = {
        id: data.bank_id,
        name: data.bank_acc_no,
      };

      delete items.bank_id;
      delete items.bank_acc_no;
      delete items.ulb_id;
      delete items.ulbs;
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
    const query: Prisma.cash_bank_receipt_vouchersFindManyArgs = {
      where: { id },
      select: {
        id: true,
        crv_brv_no: true,
        ulb: {
          select: {
            id: true,
            ulbs: true,
          },
        },
        primary_acc_code: {
          select: {
            id: true,
            code: true,
            description: true,
          },
        },
        bank: {
          select: {
            id: true,
            bank_acc_no: true,
            bank: true,
            bank_type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        pay_in_slip_ref_no: true,
        pay_in_slip_date: true,
        voucher_date: true,
        amount: true,
        approved_by: {
          select: {
            id: true,
            name: true,
            wf_roleusermaps: {
              select: {
                wf_role: {
                  select: {
                    id: true,
                    role_name: true,
                  },
                },
              },
            },
          },
        },
        approved_by_print_name: true,
        checked_by: {
          select: {
            id: true,
            name: true,
            wf_roleusermaps: {
              select: {
                wf_role: {
                  select: {
                    id: true,
                    role_name: true,
                  },
                },
              },
            },
          },
        },
        checked_by_print_name: true,
        is_approved: true,
        created_at: true,
        updated_at: true,
      },
    };

    const data: any = await prisma.cash_bank_receipt_vouchers.findFirst(query);

    return generateRes(data);
  };

  //Appropve or Check the cash bank receipt voucher
  approve = async (req: Request) => {
    const ids: IdItem[] = req.body.data.ids;
    const idItems = ids.map((item: { id: number }) => item.id);
    const ulbId = Number(req.body.data.ulb_id);
    const date = req.body.data.date;
    const lf_no = `lf-${new Date().getDate()}-${new Date().getMonth()}-1`;

    await prisma.$transaction(async (tx) => {
      const dr = (await tx.$queryRaw`
      SELECT bt.primary_acc_code_id as bank_type_id, cbrv.primary_acc_code_id,  cbrv.amount
      FROM
      cash_bank_receipt_vouchers as cbrv
      LEFT JOIN
      bank_masters as bm ON cbrv.bank_id = bm.id
      LEFT JOIN
      bank_types as bt ON bm.bank_type_id = bt.id
      LEFT JOIN 
      municipality_codes as mc ON cbrv.ulb_id = mc.id
      WHERE (mc.id = ${ulbId} AND cbrv.voucher_date::date = ${date}::date AND cbrv.id IN (${Prisma.join(
        idItems
      )}) AND is_approved = false)
      `) as any;

      for (const item of dr) {
        await this.balanceTrackingDao.updateBalances(
          ulbId,
          item.bank_type_id,
          -1 * item.amount
        );
        await this.balanceTrackingDao.updateBalances(
          ulbId,
          item.primary_acc_code_id,
          item.amount
        );
      }

      await tx.$queryRaw`
      INSERT INTO cash_books (receipt_voucher_no, lf_no, primary_acc_code_id, amount)
      SELECT cbrv.crv_brv_no, ${lf_no}, cbrv.primary_acc_code_id, cbrv.amount
      FROM 
      cash_bank_receipt_vouchers as cbrv
      LEFT JOIN 
      municipality_codes as mc ON cbrv.ulb_id = mc.id
      WHERE (mc.id = ${ulbId} AND cbrv.voucher_date::date = ${date}::date AND cbrv.id IN (${Prisma.join(
        idItems
      )}) AND is_approved = false)
      `;

      return await tx.cash_bank_receipt_vouchers.updateMany({
        where: {
          OR: ids,
          is_approved: false,
        },
        data: {
          is_approved: true,
          checked_by_id: req.body.data.checked_by_id,
          checked_by_print_name: req.body.data.checked_by_print_name,
        },
      });
    });

    const [dr, , rR] = await prisma.$transaction([
      prisma.$queryRaw`
      SELECT bt.primary_acc_code_id as bank_type_id, cbrv.primary_acc_code_id,  cbrv.amount
      FROM
      cash_bank_receipt_vouchers as cbrv
      LEFT JOIN
      bank_masters as bm ON cbrv.bank_id = bm.id
      LEFT JOIN
      bank_types as bt ON bm.bank_type_id = bt.id
      LEFT JOIN 
      municipality_codes as mc ON cbrv.ulb_id = mc.id
      WHERE (mc.id = ${ulbId} AND cbrv.voucher_date::date = ${date}::date AND cbrv.id IN (${Prisma.join(
        idItems
      )}) AND is_approved = false)
      ` as any,

      prisma.$queryRaw`
INSERT INTO cash_books (receipt_voucher_no, lf_no, primary_acc_code_id, amount)
SELECT cbrv.crv_brv_no, ${lf_no}, cbrv.primary_acc_code_id, cbrv.amount
FROM 
cash_bank_receipt_vouchers as cbrv
LEFT JOIN 
municipality_codes as mc ON cbrv.ulb_id = mc.id
WHERE (mc.id = ${ulbId} AND cbrv.voucher_date::date = ${date}::date AND cbrv.id IN (${Prisma.join(
        idItems
      )}) AND is_approved = false)
`,
      prisma.cash_bank_receipt_vouchers.updateMany({
        where: {
          OR: ids,
          is_approved: false,
        },
        data: {
          is_approved: true,
          checked_by_id: req.body.data.checked_by_id,
          checked_by_print_name: req.body.data.checked_by_print_name,
        },
      }),
    ]);

    for (const item of dr) {
      await this.balanceTrackingDao.updateBalances(
        ulbId,
        item.bank_type_id,
        -1 * item.amount
      );
      await this.balanceTrackingDao.updateBalances(
        ulbId,
        item.primary_acc_code_id,
        item.amount
      );
    }

    return rR;

    // const [dr, ,rR] = await prisma.$transaction([
    //   prisma.$queryRaw`
    //   SELECT bm.bank_type_id, cbrv.primary_acc_code_id,  cbrv.amount
    //   FROM
    //   cash_bank_receipt_vouchers as cbrv
    //   LEFT JOIN
    //   bank_masters as bm ON cbrv.bank_id = bm.id
    //   LEFT JOIN
    //   municipality_codes as mc ON cbrv.ulb_id = mc.id
    //   WHERE (mc.id = ${ulbId} AND cbrv.voucher_date::date = ${date}::date AND cbrv.id IN (${Prisma.join(
    //     idItems
    //   )}) AND is_approved = false)
    //   ` as any,

    //   // prisma.$queryRaw`
    //   // SELECT cbrv.primary_acc_code_id, cbrv.amount
    //   // FROM
    //   // cash_bank_receipt_vouchers as cbrv
    //   // LEFT JOIN
    //   // municipality_codes as mc ON cbrv.ulb_id = mc.id
    //   // WHERE (mc.id = ${ulbId} AND cbrv.voucher_date::date = ${date}::date AND cbrv.id IN (${Prisma.join(
    //   //   idItems
    //   // )}) AND is_approved = false)
    //   // ` as any,

    //   prisma.$queryRaw`
    //   INSERT INTO cash_boos (date, receipt_voucher_no, lf_no, primary_acc_code_id, amount)
    //   SELECT ${currentData}, cbrv.crv_brv_no, ${lf_no}, cbrv.primary_acc_code_id, cbrv.amount
    //   FROM
    //   cash_bank_receipt_vouchers as cbrv
    //   LEFT JOIN
    //   municipality_codes as mc ON cbrv.ulb_id = mc.id
    //   WHERE (mc.id = ${ulbId} AND cbrv.voucher_date::date = ${date}::date AND cbrv.id IN (${Prisma.join(
    //     idItems
    //   )}) AND is_approved = false)
    //   `,

    //   prisma.cash_bank_receipt_vouchers.updateMany({
    //     where: {
    //       OR: ids,
    //       is_approved: false,
    //     },
    //     data: {
    //       is_approved: true,
    //       checked_by_id: req.body.data.checked_by_id,
    //       checked_by_print_name: req.body.data.checked_by_print_name,
    //     },
    //   }),
    // ]);

    // for (const item of dr) {
    //   await this.balanceTrackingDao.updateBalances(
    //     ulbId,
    //     item.bank_type_id,
    //     -item.amount
    //   );
    //   await this.balanceTrackingDao.updateBalances(
    //     ulbId,
    //     item.primary_acc_code_id,
    //     item.amount
    //   );
    // }

    // for (const item of cr) {
    //   await this.balanceTrackingDao.updateBalances(
    //     ulbId,
    //     item.primary_acc_code_id,
    //     item.amount
    //   );
    // }

    // return rR;
  };

  ///// Get One Checked Data
  getCheckedData = async (req: Request) => {
    const date: string = req.params.date;
    const ulbId: number = Number(req.params.ulbId);

    const data: any = await prisma.$queryRaw`
    SELECT id
    FROM
    cash_bank_receipt_vouchers
    WHERE voucher_date::date = ${date}::date AND ulb_id = ${ulbId} AND is_approved = true
    LIMIT 1
    `;

    return generateRes(data[0]);
  };
}

export default CashBankReceiptVoucherDao;
