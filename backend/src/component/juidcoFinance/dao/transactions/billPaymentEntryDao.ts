import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { requestData } from "../../requests/transactions/dirPaymentEntryValidation";
import { multiRequestData } from "../../requests/transactions/billPaymentEntryValidation";

const prisma = new PrismaClient();

class BillPaymentEntryDao {
  constructor() {
    //////
  }

  // store payment entry details in DB
  store = async (req: Request) => {
    return await prisma.bill_payment_entries.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited bill payment entry
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.bill_payment_entriesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        vendor_name: true,
        bill_no: true,
        bill_entry_date: true,
        payee_name: {
          select: {
            id: true,
            name: true,
          },
        },
        bill_type: {
          select: {
            id: true,
            type: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        bill_amount: true,
        is_approved: true,
        earlier_payment: true,
        payable_amount: true,
        deductions_amount: true,
        net_amount: true
      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            payee_name: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          { bill_no: { contains: search } },
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.bill_payment_entries.findMany(query),
      prisma.bill_payment_entries.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single bill payment entry details
  getById = async (id: number) => {
    const query: Prisma.bill_payment_entriesFindManyArgs = {
      where: { id },
      select: {
        id: true,
        vendor_name: true,
        bill_no: true,
        bill_entry_date: true,
        payee_name: {
          select: {
            id: true,
            name: true,
          },
        },
        bill_type: {
          select: {
            id: true,
            type: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        adminis_ward: {
          select: {
            id: true,
            name: true,
          },
        },
        address: true,
        bill_amount: true,
        advance: true,
        deposit: true,
        deductions_amount: true
      },
    };
    const data = await prisma.bill_payment_entries.findFirst(query);
    return generateRes(data);
  };

  // Update bill payment entry details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.bill_payment_entries.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default BillPaymentEntryDao;
