import { Request } from "express";
import {
  Prisma,
  PrismaClient,
  daily_receipt_balances,
  collection_registers,
} from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

/**
 * | Author- Sanjiv Kumar
 * | Created for- collection register Dao
 * | Status: open
 */

const prisma = new PrismaClient();

interface IdItem {
  id: number;
}

class CollectionRegisterDao {
  constructor() {
    //////
  }

  // Get limited collection_register
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

    const moduleId =
      req.query.module !== undefined && req.query.module !== ""
        ? Number(req.query.module)
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
        rmodule.name ILIKE ${searchCondition} OR
        rmode.name ILIKE ${searchCondition}
      )`;
    }

    if (ulbId) {
      a += ` AND mc.id = ${ulbId}`;
    }

    if (moduleId) {
      a += ` AND rmodule.id = ${moduleId}`;
    }

    if (date) {
      a += ` AND DATE(rr.receipt_date) = '${date}'`;
    }

    const opDate: string = date ? `AND DATE (drb.created_at) = '${date}'` : "";

    const [result, count, opening_balance] = await prisma.$transaction([
      prisma.$queryRawUnsafe<collection_registers[]>(`SELECT
      cr.id,
    rr.receipt_no,
    rr.paid_by,
    rr.receipt_date,
    rr.cheque_or_draft_no,
    rr.bank_amount,
    rr.cash_amount,
    rr.bank_acc_no,
    rr.deposit_date,
    rr.realisation_date,
    rr.wheather_returned,
    rr.remarks,
    cr.created_at,
    cr.updated_at,
    racctype.id as revenue_accounted_type_id,
    racctype.name as revenue_accounted_type_name,
    mc.id as ulb_id,
    mc.ulbs,
    ac.id as primary_acc_code_id,
    ac.code as primary_acc_code_name,
    rmodule.id as revenue_module_id,
    rmodule.name as revenue_module_name,
    rmode.id as receipt_mode_id,
    rmode.name as receipt_mode_name,
    emp.id as entered_by_id,
    emp.name as entered_by_name,
    checkedemp.name as checked_by_name,
    checkedemp.id as checked_by_id,
    desi.id as entered_by_designation_id,
    desi.name as entered_by_designation_name,
    checkedesi.id as checked_by_designation_id,
    checkedesi.name as checked_by_designation_name,
    rr.cash_amount + rr.bank_amount as total_amount   
    FROM
    collection_registers as cr
    LEFT JOIN
    receipt_registers as rr ON rr.id = cr.receipt_register_id
    LEFT JOIN 
    revenue_accounted_types as racctype ON rr.revenue_accounted_type_id = racctype.id
    LEFT JOIN
    municipality_codes as mc ON rr.ulb_id = mc.id
    LEFT JOIN
    account_codes as ac ON rr.primary_acc_code_id = ac.id
    LEFT JOIN
    revenue_modules as rmodule ON rr.revenue_module_id = rmodule.id
    LEFT JOIN
    receipt_modes as rmode ON rr.receipt_mode_id = rmode.id
    LEFT JOIN
    employees as emp ON rr.entered_by_id = emp.id
    LEFT JOIN 
    employees as checkedemp ON cr.checked_by_id = checkedemp.id
    LEFT JOIN 
    designations as checkedesi ON checkedemp.designation_id = checkedesi.id
    LEFT JOIN 
    designations as desi ON emp.designation_id = desi.id
    WHERE (true ${a})
    ORDER BY
    rr.updated_at desc
    LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `),
      prisma.$queryRawUnsafe<collection_registers[]>(`SELECT
  COUNT(*) as total,
  SUM (rr.cash_amount + rr.bank_amount) as total_amount
  FROM
  collection_registers as cr
  LEFT JOIN
  receipt_registers as rr ON rr.id = cr.receipt_register_id
    LEFT JOIN 
    revenue_accounted_types as racctype ON rr.revenue_accounted_type_id = racctype.id
    LEFT JOIN
    municipality_codes as mc ON rr.ulb_id = mc.id
    LEFT JOIN
    account_codes as ac ON rr.primary_acc_code_id = ac.id
    LEFT JOIN
    revenue_modules as rmodule ON rr.revenue_module_id = rmodule.id
    LEFT JOIN
    receipt_modes as rmode ON rr.receipt_mode_id = rmode.id
    LEFT JOIN
    employees as emp ON rr.entered_by_id = emp.id
    LEFT JOIN 
    employees as checkedemp ON rr.checked_by_id = checkedemp.id
    LEFT JOIN 
    designations as checkedesi ON checkedemp.designation_id = checkedesi.id
    LEFT JOIN 
    designations as desi ON emp.designation_id = desi.id
  WHERE (true ${a})`) as any,
      prisma.$queryRawUnsafe<daily_receipt_balances[]>(`SELECT
  drb.id,
  drb.opening_balance
  FROM
  daily_receipt_balances as drb
  WHERE (true ${opDate})`) as any,
    ]);

    count[0].opening_balance = opening_balance[0];

    const allData = [];

    for (const data of result as any) {
      const items: any = { ...data };
      items.entered_by = {
        id: data.entered_by_id,
        name: data.entered_by_name,
        designation: {
          id: data.entered_by_designation_id,
          name: data.entered_by_designation_name,
        },
      };
      items.checked_by = {
        id: data.checked_by_id,
        name: data.checked_by_name,
        designation: {
          id: data.checked_by_designation_id,
          name: data.checked_by_designation_name,
        },
      };
      items.revenue_module = {
        id: data.revenue_module_id,
        name: data.revenue_module_name,
      };
      items.receipt_mode = {
        id: data.receipt_mode_id,
        name: data.receipt_mode_name,
      };
      items.primary_acc_code = {
        id: data.primary_acc_code_id,
        name: data.primary_acc_code_name,
      };
      items.ulb = {
        id: data.ulb_id,
        name: data.ulbs,
      };
      items.revenue_accounted_type = {
        id: data.revenue_accounted_type_id,
        name: data.revenue_accounted_type_name,
      };

      delete items.revenue_accounted_type_id;
      delete items.revenue_accounted_type_name;
      delete items.ulb_id;
      delete items.ulbs;
      delete items.primary_acc_code_id;
      delete items.primary_acc_code_name;
      delete items.revenue_module_id;
      delete items.receipt_mode_name;
      delete items.revenue_module_id;
      delete items.revenue_module_name;
      delete items.checked_by_id;
      delete items.checked_by_name;
      delete items.entered_by_id;
      delete items.entered_by_name;
      delete items.checked_by_designation_name;
      delete items.checked_by_designation_id;
      delete items.entered_by_designation_name;
      delete items.entered_by_designation_id;

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
    const data: any = await prisma.collection_registers.findFirst(query);

    const data1 = { ...data, ...data.receipt_register };
    delete data1.receipt_register;

    return generateRes(data1);
  };

  //Appropve or Check the receipt register
  approve = async (req: Request) => {
    const ids: IdItem[] = req.body.data.ids;
    const idItems = ids.map((item: { id: number }) => item.id);

    const [, rR] = await prisma.$transaction([
      prisma.$queryRaw`
        INSERT INTO daily_coll_summaries (collection_register_id, receipt_register_id)
        SELECT id, receipt_register_id
        FROM collection_registers
        WHERE id IN (${Prisma.join(idItems)}) AND is_checked = false
        ON CONFLICT DO NOTHING;
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

export default CollectionRegisterDao;
