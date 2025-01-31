import { Request } from "express";
import { PrismaClient, Prisma } from ".prisma/client";
import { generateRes } from "../../../../util/generateRes";
import {
  multiRequestData,
  requestData,
} from "../../requests/documentation/voucherEntryValidation";

const prisma = new PrismaClient();

class VoucherEntryDao {
  // store voucher entries on db;
  store = async (req: Request) => {
    return await prisma.voucher_entries.createMany({
      data: multiRequestData(req),
    });
  };

  // get limited voucher entries
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);
    const skip = (page - 1) * limit;
    let order: number = Number(req.query.order);

    if (order != -1 && order != 1) {
      order = 1;
    }


    const query: Prisma.voucher_entriesFindManyArgs = {
      orderBy: [
        {updated_at: order == -1?"desc":"asc"}        
      ],
      
      skip: skip,
      take: limit,
      select: {
        id: true,
        voucher_no: true,
        voucher_date: true,
        voucher_type: {
          select: {
            id: true,
            name: true,
          },
        },
        narration: true,
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

        voucher_sub_type: {
          select: {
            id: true,
            name: true,
          },
        },
        sub_ledger: {
          select: {
            id: true,
            name: true,
          },
        },
        amount: true,
        dr_cr: true,
        created_at: true,
        updated_at: true,
      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            voucher_type: {
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
      prisma.voucher_entries.findMany(query),
      prisma.voucher_entries.count({ where: query.where }),
    ]);

    return generateRes(data, count, page, limit);
  };

  // get single voucher entries
  getById = async (id: number) => {
    const query: Prisma.voucher_entriesFindManyArgs = {
      where: { id },
      select: {
        id: true,
        voucher_no: true,
        voucher_date: true,
        voucher_type: {
          select: {
            id: true,
            name: true,
          },
        },
        narration: true,
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

        voucher_sub_type: {
          select: {
            id: true,
            name: true,
          },
        },
        sub_ledger: {
          select: {
            id: true,
            name: true,
          },
        },
        amount: true,
        dr_cr: true,
        created_at: true,
        updated_at: true,
      },
    };

    const data = prisma.voucher_entries.findFirst(query);
    return generateRes(data);
  };

  // update voucher details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.voucher_entries.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };

  getVoucherNumber = async () => {
    const query: Prisma.voucher_entriesFindManyArgs = {
      select: {
        id: true,
        voucher_no: true,
      },
    };
    const data = prisma.voucher_entries.findMany(query);
    return generateRes(data);
  };
}

export default VoucherEntryDao;
