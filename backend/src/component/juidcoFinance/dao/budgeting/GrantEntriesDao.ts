import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/budgeting/grantEntriesValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created for- grant_entries Dao
 * | Status: open
 */


const prisma = new PrismaClient();

class GrantEntriesDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.grant_entries.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited grant_entries
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.grant_entriesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        ulb: {
          select: {
            id: true,
            code: true
          },
        },
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        grant: {
          select: {
            id: true,
            name: true
          },
        },
        sanction_number: true,
        grant_nature: {
          select: {
            id: true,
            name: true
          },
        },
        grant_from_date: true,
        grant_to_date: true,
        sanctioned_amount: true,
        advance_rcving_date: true,
        advance_amount: true,
        expenditure_date: true,
        voucher: {
          select: {
            id: true,
            voucher_no: true
          },
        },
        expndtre_nature: {
          select: {
            id: true,
            name: true
          },
        },
        blnce_trckng: {
          select: {
            id: true,
            total_balance: true
          },
        },
        refund_date: true,
        refund_amount: true,
        user: {
          select: {
            id: true,
            name: true,
            // designation: true,
          },
        },
        signature: true,
        created_at: true,
        updated_at: true,

      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            ulb: {
              code: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            primary_acc_code: {
              code: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            grant: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            grant_nature: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            voucher: {
              narration: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            expndtre_nature: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            user: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },

        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.grant_entries.findMany(query),
      prisma.grant_entries.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.grant_entriesFindManyArgs = {
      where: { id },
      select: {
        id: true,
        ulb: {
          select: {
            id: true,
            code: true
          },
        },
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        grant: {
          select: {
            id: true,
            name: true
          },
        },
        sanction_number: true,
        grant_nature: {
          select: {
            id: true,
            name: true
          },
        },
        grant_from_date: true,
        grant_to_date: true,
        sanctioned_amount: true,
        advance_rcving_date: true,
        advance_amount: true,
        expenditure_date: true,
        voucher: {
          select: {
            id: true,
            voucher_no: true
          },
        },
        expndtre_nature: {
          select: {
            id: true,
            name: true
          },
        },
        blnce_trckng: {
          select: {
            id: true,
            total_balance: true
          },
        },
        refund_date: true,
        refund_amount: true,
        user: {
          select: {
            id: true,
            name: true
          },
        },
        signature: true,
        created_at: true,
        updated_at: true,

      },
    };
    const data = await prisma.grant_entries.findFirst(query);
    return generateRes(data);
  };

  // Update grant_entries details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.grant_entries.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default GrantEntriesDao;
