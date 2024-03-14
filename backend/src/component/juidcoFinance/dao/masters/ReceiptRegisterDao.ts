import { Request } from "express";
import {
  Prisma,
  PrismaClient,
  receipt_registers,
  daily_receipt_balances,
} from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import {
  multiRequestData,
  requestData,
} from "../../requests/masters/receiptRegisterValidation";

/**
 * | Author- Sanjiv Kumar
 * | Created for- receipt_register Dao
 * | Status: open
 */

const prisma = new PrismaClient();

class ReceiptRegisterDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.receipt_registers.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited receipt_register
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

    const d = `AND(
      mc.ulbs ILIKE ${searchCondition} OR
      ac.code ILIKE ${searchCondition} OR
      rmodule.name ILIKE ${searchCondition} OR
      rmode.name ILIKE ${searchCondition}
    )`;

    const a: string =
      search && ulbId && date
        ? `${d} AND
            (
              mc.id = ${ulbId} AND
              DATE (rr.receipt_date) = '${date}'
            )`
        : search && !ulbId && !date
        ? `${d}`
        : search && ulbId && !date
        ? `${d} AND mc.id = ${ulbId}`
        : !search && ulbId && date
        ? `AND (
          mc.id = ${ulbId} AND
          DATE (rr.receipt_date) = '${date}'
        )`
        : search && !ulbId && date
        ? `${d} AND DATE (rr.receipt_date) = '${date}'`
        : !search && !ulbId && date
        ? `AND DATE (rr.receipt_date) = '${date}'`
        : !search && !date && ulbId ? `AND mc.id = ${ulbId}` : "";

    const opDate: string = date ? `AND DATE (drb.created_at) = '${date}'` : "";

    const [result, count, opening_balance] = await prisma.$transaction([
      prisma.$queryRawUnsafe<receipt_registers[]>(`SELECT
    rr.id,
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
    rr.created_at,
    rr.updated_at,
    mc.id as ulb_id,
    mc.ulbs,
    ac.id as primary_acc_code_id,
    ac.code as primary_acc_code,
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
    receipt_registers as rr
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
    WHERE (true ${a})
    ORDER BY
    rr.updated_at desc
    LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `),
      prisma.$queryRawUnsafe<receipt_registers[]>(`SELECT
  COUNT(*) as total,
  SUM (rr.cash_amount + rr.bank_amount) as total_amount
  FROM
  receipt_registers as rr
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

    // const response = {
    //   entered_by : {
    //     id: 'entered_by_id',
    //     name: 'entered_by_name',
    //     designation: {
    //       id: 'entered_by_designation_id',
    //       name: 'entered_by_designation_name',
    //     },
    //   },
    //   checked_by : {
    //     id: 'checked_by_id',
    //     name: 'checked_by_name',
    //     designation: {
    //       id: 'checked_by_designation_id',
    //       name: 'checked_by_designation_name',
    //     },
    //   },
    //   revenue_module : {
    //     id: 'revenue_module_id',
    //     name: 'revenue_module_name',
    //   },
    //   receipt_mode : {
    //     id: 'receipt_mode_id',
    //     name: 'receipt_mode_name',
    //   },
    //   primary_acc_code : {
    //     id: 'primary_acc_code_id',
    //     name: 'primary_acc_code_name',
    //   },
    //   ulb : {
    //     id: 'ulb_id',
    //     name: 'ulbs',
    //   }
    // }

    // function generate(){
    //   const resp = [];

    //   for (const data of result as any) {
    //     const elements: any = {...data}
    //   for(const item in response){
    //     elements[item] =
    //   }
    // }
    // }

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
    const query: Prisma.receipt_registersFindManyArgs = {
      where: { id },
      select: {
        id: true,
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
            designation: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        isChecked: true,
        entered_by_print_name: true,
        checked_by: {
          select: {
            id: true,
            name: true,
            designation: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        checked_by_print_name: true,
        created_at: true,
        updated_at: true,
      },
    };
    const data = await prisma.receipt_registers.findFirst(query);
    return generateRes(data);
  };

  // Update receipt_registers details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.receipt_registers.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };

  //Appropve or Check the receipt register
  approve = async (req: Request) => {
    const ids: [] = req.body.ids;

    return await prisma.receipt_registers.updateMany({
      where: {
        OR: ids,
      },
      data: {
        isChecked: true,
        checked_by_id: req.body.checked_by_id,
        checked_by_print_name: req.body.checked_by_print_name,
      },
    });
  };

  /////////// Create Opening Balance
  createOpeningBal = async(req: Request)=>{
    return await prisma.daily_receipt_balances.create({
      data:{
        opening_balance: req.body.opening_balance
      }
    })
  }

  /////////// Update Opening Balance
  updateOpeningBal = async(req: Request)=>{
    return await prisma.daily_receipt_balances.update({
      where:{
        id: req.body.id
      },
      data:{
        opening_balance: req.body.opening_balance
      }
    })
  }
}

export default ReceiptRegisterDao;
