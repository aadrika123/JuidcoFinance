import { Request } from "express";
import { PrismaClient, Prisma } from ".prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { requestData } from "../../requests/documentation/voucherEntryValidation";

const prisma = new PrismaClient();

class VoucherEntryDao {
  // store voucher entries on db;
  store = async (req: Request) => {
    return await prisma.voucher_entries.create({
      data: requestData(req),
    });
  };

  // get limited voucher entries
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.voucher_entriesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        voucher_no: true,
        voucher_date: true,
        voucher_type: {
          select: {
            id: true,
            type: true,
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
            type: true,
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
              type: {
                equals: search,
                mode: "insensitive",
              },
            },
          },
          { voucher_no: { equals: Number(search) } },
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.voucher_entries.findMany(query),
      prisma.voucher_entries.count({ where: query.where }),
    ]);

    return generateRes(data, count, page, limit);
  };
}

export default VoucherEntryDao;
