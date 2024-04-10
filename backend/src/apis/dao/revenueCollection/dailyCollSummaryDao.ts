import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

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
        mc.ulbs ILIKE ${searchCondition} OR
        ac.code ILIKE ${searchCondition} OR
      )`;
    }

    if (ulbId) {
      a += ` AND mc.id = ${ulbId}`;
    }

    if (date) {
      a += ` AND DATE(rr.receipt_date) = '${date}'`;
    }

    // const opDate: string = date ? `AND DATE (drb.created_at) = '${date}'` : "";
    const b = a + ` AND rm.id = 1`;
    const c = a + ` AND rm.id = 2`;

    const [result, count, cash_amount, cheque_amount] =
      await prisma.$transaction([
        prisma.$queryRawUnsafe(`
    SELECT
    SUM(rr.bank_amount + rr.cash_amount) as amount,
    ac.description as descri,
    acg.description as gledger,
    rat.name as revenue_accounted_type_name,
    rr.bank_acc_no
    FROM 
    daily_coll_summaries as dcs
    LEFT JOIN
    receipt_registers as rr ON rr.id = dcs.receipt_register_id
    LEFT JOIN
    account_codes as ac ON rr.primary_acc_code_id = ac.id
    LEFT JOIN
    account_codes as acg ON ac.parent_id = acg.id
    LEFT JOIN 
    revenue_accounted_types as rat ON rat.id = rr.revenue_accounted_type_id
    LEFT JOIN 
    municipality_codes as mc ON rr.ulb_id = mc.id
  WHERE (true ${a})
  GROUP BY descri, gledger, revenue_accounted_type_name, bank_acc_no
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
`),
        prisma.$queryRawUnsafe(`
SELECT
COUNT(*) as total
FROM 
(SELECT
  SUM(rr.bank_amount + rr.cash_amount) as amount,
  ac.description as descri,
  acg.description as gledger,
  rat.name as revenue_accounted_type_name,
  rr.bank_acc_no
  FROM 
  daily_coll_summaries as dcs
  LEFT JOIN
  receipt_registers as rr ON rr.id = dcs.receipt_register_id
  LEFT JOIN
  account_codes as ac ON rr.primary_acc_code_id = ac.id
  LEFT JOIN
  account_codes as acg ON ac.parent_id = acg.id
  LEFT JOIN 
  revenue_accounted_types as rat ON rat.id = rr.revenue_accounted_type_id
  LEFT JOIN 
  municipality_codes as mc ON rr.ulb_id = mc.id
WHERE (true ${a})
GROUP BY descri, gledger, revenue_accounted_type_name, bank_acc_no) as tcount
`) as any,

        prisma.$queryRawUnsafe(`
SELECT
SUM(rr.bank_amount + rr.cash_amount) as cash_amount
FROM 
daily_coll_summaries as dcs
LEFT JOIN
receipt_registers as rr ON rr.id = dcs.receipt_register_id
LEFT JOIN
municipality_codes as mc ON rr.ulb_id = mc.id
LEFT JOIN
receipt_modes as rm ON rr.receipt_mode_id = rm.id
WHERE (true ${b})
`) as any,
        prisma.$queryRawUnsafe(`
SELECT
SUM(rr.bank_amount + rr.cash_amount) as cheque_amount
FROM 
daily_coll_summaries as dcs
LEFT JOIN
receipt_registers as rr ON rr.id = dcs.receipt_register_id
LEFT JOIN
municipality_codes as mc ON rr.ulb_id = mc.id
LEFT JOIN
receipt_modes as rm ON rr.receipt_mode_id = rm.id
WHERE (true ${c})
`) as any,
      ]);

    count[0].cash_amount = cash_amount[0]?.cash_amount;
    count[0].cheque_amount = cheque_amount[0]?.cheque_amount;

    return generateRes(
      result,
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
        receipt_register: {
          select: {
            receipt_no: true,
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
            revenue_module: {
              select: {
                id: true,
                name: true,
              },
            },
            paid_by: true,
            receipt_mode: {
              select: {
                id: true,
                name: true,
              },
            },
            revenue_accounted_type: {
              select: {
                id: true,
                name: true,
              },
            },
            receipt_date: true,
            cheque_or_draft_no: true,
            bank_amount: true,
            cash_amount: true,
            bank_acc_no: true,
            deposit_date: true,
            realisation_date: true,
            wheather_returned: true,
            remarks: true,
            entered_by: {
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
            entered_by_print_name: true,
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
    let data: any = await prisma.daily_coll_summaries.findFirst(query);

    if (data) {
      data = { ...data, ...data?.receipt_register };
      delete data.receipt_register;
    }

    return generateRes(data);
  };

  //Appropve or Check the receipt register
  approve = async (req: Request) => {
    const ids: IdItem[] = req.body.data.ids;
    const idItems = ids.map((item: { id: number }) => item.id);

    const [, rR] = await prisma.$transaction([
      prisma.$queryRaw`
        INSERT INTO daily_coll_summariesnext (collection_register_id, receipt_register_id)
        SELECT id, receipt_register_id
        FROM collection_registers
        WHERE id IN (${Prisma.join(idItems)}) AND is_checked = false
        ON CONFLICT DO NOTHING;
      `,

      prisma.daily_coll_summaries.updateMany({
        where: {
          OR: ids,
          is_checked: false,
        },
        data: {
          is_checked: true,
          checked_by_id: req.body.data.checked_by_id,
          checked_by_print_name: req.body.data.checked_by_print_name,
        },
      }),
    ]);

    return rR;
  };
}

export default DailyCollSummaryDao;
