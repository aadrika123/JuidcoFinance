import { Request } from "express";
import {
  Prisma,
  PrismaClient,
  collection_registers,
} from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

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
  constructor() {
    //////
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
        mc.ulbs ILIKE ${searchCondition} OR
        ac.code ILIKE ${searchCondition}
      )`;
    }

    if (ulbId) {
      a += ` AND mc.id = ${ulbId}`;
    }

    if (date) {
      a += ` AND DATE(cbrv.voucher_date) = '${date}'`;
    }

    const [result, count] = await prisma.$transaction([
      prisma.$queryRawUnsafe<collection_registers[]>(`SELECT
      cbrv.id,
      cbrv.crv_brv_no,
      cbrv.voucher_date,
      cbrv.pay_in_slip_ref_no,
      cbrv.pay_in_slip_date,
      cbrv.amount,
      mc.ulb_id,
      mc.ulbs,
      bm.id as bank_id,
      bm.bank_acc_no,
      ac.id as primary_acc_code_id,
      ac.description as primary_acc_code_name
    FROM
    cash_bank_receipt_vouchers as cbrv
    LEFT JOIN
    municipality_codes as mc ON cbrv.ulb_id = mc.id
    LEFT JOIN
    account_codes as ac ON cbrv.primary_acc_code_id = ac.id
    LEFT JOIN
    bank_master as bm ON cbrv.bank_id = bm.id
    WHERE (true ${a})
    ORDER BY
    cbrv.updated_at desc
    LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `),

      prisma.$queryRawUnsafe<collection_registers[]>(`SELECT
      COUNT(*) as total
      FROM
      cash_bank_receipt_vouchers as cbrv
    LEFT JOIN
    municipality_codes as mc ON cbrv.ulb_id = mc.id
    LEFT JOIN
    account_codes as ac ON cbrv.primary_acc_code_id = ac.id
    LEFT JOIN
    bank_master as bm ON cbrv.bank_id = bm.id
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
    const query: Prisma.collection_registersFindManyArgs = {
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
    let data: any = await prisma.collection_registers.findFirst(query);

    if (data) {
      data = { ...data, ...data?.receipt_register };
      delete data.receipt_register;
    }

    return generateRes(data);
  };

  //Appropve or Check the cash bank receipt voucher
  approve = async (req: Request) => {
    const ids: IdItem[] = req.body.data.ids;
    const idItems = ids.map((item: { id: number }) => item.id);
    const ulbId = Number(req.body.data.ulb_id);
    const date = req.body.data.date;

    const [, rR] = await prisma.$transaction([
      prisma.$queryRaw`
        INSERT INTO calc_daily_coll_summariesxxx (ulb_id, bank_id, primary_acc_code_id, amount, revenue_accounted_type_id, receipt_date, receipt_mode_id)
        SELECT ${ulbId}, calc_summ.bank_id, calc_summ.ledger_id, calc_summ.amount, calc_summ.revenue_accounted_type_id, receipt_date, receipt_mode_id
        FROM (SELECT
        SUM(rr.bank_amount + rr.cash_amount) as amount,
        ac.description as descri,
        ac.id as ledger_id,
        acg.description as gledger,
        rat.id as revenue_accounted_type_id,
        bm.id as bank_id,
        rr.receipt_date,
        rr.receipt_mode_id
        FROM 
        collection_registers as dcs
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
        LEFT JOIN 
        bank_masters as bm ON (bm.ulb_id = ${ulbId} AND bm.primary_acc_code_id = ac.id)
        WHERE (mc.id = ${ulbId} AND rr.receipt_date::date = ${date}::date AND dcs.id IN (${Prisma.join(
        idItems
      )}) AND dcs.is_checked = false)
        GROUP BY descri, gledger, rat.id, ledger_id, bm.id, receipt_date, receipt_mode_id) AS calc_summ
      `,

      prisma.collection_registers.updateMany({
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

export default CashBankReceiptVoucherDao;
