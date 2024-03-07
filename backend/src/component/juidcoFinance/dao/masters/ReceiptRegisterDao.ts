import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/masters/receiptRegisterValidation";

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
    const search: string = String(req.query.search);
    let order: number = Number(req.query.order);

    if (order != -1 && order != 1) {
      order = 1;
    }

    const query: Prisma.receipt_registersFindManyArgs = {
      orderBy: [{ updated_at: order == -1 ? "desc" : "asc" }],
      skip: (page - 1) * limit,
      take: limit,
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
        bank: {
          select: {
            id: true,
            name: true,
          },
        },
        cash_amount: true,
        bank_acc_no: true,
        deposit_date: true,
        realisation_date: true,
        wheather_returned: true,
        remarks: true,
        entered_by: {
          select:{
            id: true,
            name: true
          }
        },
        entered_by_print_name: true,
        checked_by: {
          select:{
            id: true,
            name: true
          }
        },
        checked_by_print_name: true,
        created_at: true,
        updated_at: true,
      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            ulb: {
              ulbs: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            primary_acc_code: {
              code: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            revenue_module: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            receipt_mode: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            bank: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.receipt_registers.findMany(query),
      prisma.receipt_registers.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
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
        bank: {
          select: {
            id: true,
            name: true,
          },
        },
        cash_amount: true,
        bank_acc_no: true,
        deposit_date: true,
        realisation_date: true,
        wheather_returned: true,
        remarks: true,
        entered_by: {
          select:{
            id: true,
            name: true
          }
        },
        entered_by_print_name: true,
        checked_by: {
          select:{
            id: true,
            name: true
          }
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
}

export default ReceiptRegisterDao;
