import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import {
  generateUniquePaymentNo,
} from "../../../util/helper/generateUniqueNo";

/**
 * | Author- Sanjiv Kumar
 * | Created for- daily collection summary Dao
 * | Status: open
 */

const prisma = new PrismaClient();

interface IdItem {
  id: number;
}

class DailyCollSummaryDao {
  constructor() {
    //////
  }

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
        ac.description ILIKE ${searchCondition} OR
        acg.description ILIKE ${searchCondition}
      )`;
    }

    if (ulbId) {
      a += ` AND mc.id = ${ulbId}`;
    }

    if (date) {
      a += ` AND DATE(dcs.receipt_date) = '${date}'`;
    }

    // const opDate: string = date ? `AND DATE (drb.created_at) = '${date}'` : "";
    const b = a + ` AND rm.id = 1`;
    const c = a + ` AND rm.id = 2 OR rm.id = 3`;

    const d = ` (bm.ulb_id = ${ulbId} AND bm.primary_acc_code_id = ac.id)`;

    const [result, count, cash_amount, cheque_amount] =
      await prisma.$transaction([
        prisma.$queryRawUnsafe(`
    SELECT
    dcs.id,
    dcs.amount,
    dcs.is_checked,
    dcs.receipt_date,
    ac.id as primary_acc_code_id,
    ac.description as primary_acc_code_name,
    acg.description as gledger,
    rat.name as revenue_accounted_type_name,
    rat.id as revenue_accounted_type_id,
    bm.id as bank_id,
    bm.bank_acc_no,
    rm.id as receipt_mode_id,
    rm.name as receipt_mode_name,
    mc.id as ulb_id,
    mc.ulbs as ulb_name
    FROM 
    daily_coll_summaries as dcs
    LEFT JOIN
    account_codes as ac ON dcs.primary_acc_code_id = ac.id
    LEFT JOIN
    account_codes as acg ON ac.parent_id = acg.id
    LEFT JOIN 
    revenue_accounted_types as rat ON rat.id = dcs.revenue_accounted_type_id
    LEFT JOIN 
    municipality_codes as mc ON dcs.ulb_id = mc.id
    LEFT JOIN 
    bank_masters as bm ON ${d}
    LEFT JOIN 
    receipt_modes as rm ON rm.id = dcs.receipt_mode_id
  WHERE (true ${a})
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
`),

        prisma.$queryRawUnsafe(`
SELECT
COUNT(*) as total
FROM 
daily_coll_summaries as dcs
LEFT JOIN
    account_codes as ac ON dcs.primary_acc_code_id = ac.id
    LEFT JOIN
    account_codes as acg ON ac.parent_id = acg.id
    LEFT JOIN 
    revenue_accounted_types as rat ON rat.id = dcs.revenue_accounted_type_id
    LEFT JOIN 
    municipality_codes as mc ON dcs.ulb_id = mc.id
WHERE (true ${a})
`) as any,

        prisma.$queryRawUnsafe(`
    SELECT
    SUM(amount) as cash_amount
    FROM
    daily_coll_summaries as dcs
    LEFT JOIN
    account_codes as ac ON dcs.primary_acc_code_id = ac.id
    LEFT JOIN
    account_codes as acg ON ac.parent_id = acg.id
    LEFT JOIN 
    revenue_accounted_types as rat ON rat.id = dcs.revenue_accounted_type_id
    LEFT JOIN 
    municipality_codes as mc ON dcs.ulb_id = mc.id
    LEFT JOIN 
    receipt_modes as rm ON rm.id = dcs.receipt_mode_id
WHERE (true ${b})
    `) as any,

        prisma.$queryRawUnsafe(`
    SELECT
    SUM(amount) as cheque_amount
    FROM
    daily_coll_summaries as dcs
    LEFT JOIN
    account_codes as ac ON dcs.primary_acc_code_id = ac.id
    LEFT JOIN
    account_codes as acg ON ac.parent_id = acg.id
    LEFT JOIN 
    revenue_accounted_types as rat ON rat.id = dcs.revenue_accounted_type_id
    LEFT JOIN 
    municipality_codes as mc ON dcs.ulb_id = mc.id
    LEFT JOIN 
    receipt_modes as rm ON rm.id = dcs.receipt_mode_id
WHERE (true ${c})
    `) as any,
      ]);

    count[0].cash_amount = cash_amount[0]?.cash_amount;
    count[0].cheque_amount = cheque_amount[0]?.cheque_amount;

    const allData = [];

    for (const data of result as any) {
      const items: any = { ...data };
      items.receipt_mode = {
        id: data.receipt_mode_id,
        name: data.receipt_mode_name,
      };
      items.primary_acc_code = {
        id: data.primary_acc_code_id,
        name: data.primary_acc_code_name,
      };
      items.revenue_accounted_type = {
        id: data.revenue_accounted_type_id,
        name: data.revenue_accounted_type_name,
      };
      items.ulb = {
        id: data.ulb_id,
        name: data.ulb_name,
      };

      delete items.revenue_accounted_type_id;
      delete items.revenue_accounted_type_name;
      delete items.primary_acc_code_id;
      delete items.primary_acc_code_name;
      delete items.receipt_mode_id;
      delete items.receipt_mode_name;
      delete items.ulb_id;
      delete items.ulb_name;

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

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.daily_coll_summariesFindManyArgs = {
      where: { id },
      select: {
        id: true,
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
          },
        },
        bank: {
          select: {
            id: true,
            bank_acc_no: true,
          },
        },
        amount: true,
        receipt_mode: {
          select: {
            id: true,
            name: true,
          },
        },
        receipt_date: true,
        revenue_accounted_type: {
          select: {
            id: true,
            name: true,
          },
        },
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
        is_checked: true,
        created_at: true,
        updated_at: true,
      },
    };
    const data: any = await prisma.daily_coll_summaries.findFirst(query);

    return generateRes(data);
  };

  //Appropve or Check the receipt register
  approve = async (req: Request) => {
    const ids: IdItem[] = req.body.data.ids;
    const idItems = ids.map((item: { id: number }) => item.id);
    const checked_by_id = Number(req.body.data.checked_by_id);
    const checked_by_print_name = req.body.data.checked_by_print_name;

    // Call generateUniqueNos once to get unique numbers for all entries
    // const uniqueNos = generateMultiUniqueNo("crv-brv", idItems.length);

    // const [, rR] = await prisma.$transaction([
    //   prisma.$queryRaw`
    //     INSERT INTO cash_bank_receipt_vouchers (crv_brv_no, ulb_id, bank_id, primary_acc_code_id, amount, checked_by_id, checked_by_print_name)
    //     SELECT ${Prisma.join(
    //       uniqueNos
    //     )}, ulb_id, bank_id, primary_acc_code_id, amount, ${checked_by_id}, ${checked_by_print_name}
    //     FROM daily_coll_summaries
    //     WHERE id IN (${Prisma.join(idItems)}) AND is_checked = false
    //     ON CONFLICT DO NOTHING;
    //   `,

    //   prisma.daily_coll_summaries.updateMany({
    //     where: {
    //       OR: ids,
    //       is_checked: false,
    //     },
    //     data: {
    //       is_checked: true,
    //       checked_by_id,
    //       checked_by_print_name,
    //     },
    //   }),
    // ]);

    // return rR;

    const transactions = [];

    for (let i = 0; i < idItems.length; i++) {
      const uniqueNo = generateUniquePaymentNo("crv-brv");
      const [, rR] = await prisma.$transaction([
        prisma.$queryRaw`
            INSERT INTO cash_bank_receipt_vouchers (crv_brv_no, ulb_id, bank_id, primary_acc_code_id, amount, checked_by_id, checked_by_print_name)
            SELECT ${uniqueNo}, ulb_id, bank_id, primary_acc_code_id, amount, ${checked_by_id}, ${checked_by_print_name}
            FROM daily_coll_summaries
            WHERE id = ${idItems[i]} AND is_checked = false
            ON CONFLICT DO NOTHING;
        `,

        prisma.daily_coll_summaries.updateMany({
          where: {
            id: idItems[i],
            is_checked: false,
          },
          data: {
            is_checked: true,
            checked_by_id,
            checked_by_print_name,
          },
        }),
      ]);

      transactions.push(rR);
    }

    // Execute all transactions together
    return await Promise.all(transactions);
  };

  ///// Get One Checked Data
  getCheckedData = async (req: Request) => {
    const date: string = req.params.date;
    const ulbId: number = Number(req.params.ulbId);

    const data: any = await prisma.$queryRaw`
    SELECT id
    FROM
    daily_coll_summaries
    WHERE receipt_date::date = ${date}::date AND ulb_id = ${ulbId} AND is_checked = true
    LIMIT 1
    `;

    return generateRes(data[0]);
  };
}

export default DailyCollSummaryDao;
