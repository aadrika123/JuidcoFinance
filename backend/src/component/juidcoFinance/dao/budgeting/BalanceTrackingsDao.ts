import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData } from "../../requests/budgeting/balanceTrackingsValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created for- balance_trackings Dao
 * | Status: open
 */


const prisma = new PrismaClient();

class BalanceTrackingsDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.balance_trackings.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited balance_trackings
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.balance_trackingsFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        balance_amount: true,
        created_at: true,
        updated_at: true,

      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            primary_acc_code: {
              code: {
                contains: search, mode: "insensitive",
              },
            },
          },

        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.balance_trackings.findMany(query),
      prisma.balance_trackings.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.balance_trackingsFindManyArgs = {
      where: { id },
      select: {
        id: true,
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        balance_amount: true,
        created_at: true,
        updated_at: true,

      },
    };
    const data = await prisma.balance_trackings.findFirst(query);
    return generateRes(data);
  };


  getBalance = async (id: number) => {

    const query: Prisma.balance_trackingsFindManyArgs = {
      where: { primary_acc_code_id: id },
      select: {
        id: true,
        balance_amount: true,
        created_at: true,
        updated_at: true,
      },
    };
    const data = await prisma.balance_trackings.findFirst(query);
    return generateRes(data);    
  }
 
}

export default BalanceTrackingsDao;
