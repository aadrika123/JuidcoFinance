import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/budgeting/openingBalancesValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created for- opening_balances Dao
 * | Status: open
 */


const prisma = new PrismaClient();

class OpeningBalancesDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.opening_balances.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited opening_balances
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    let order: number = Number(req.query.order);
    if (order != -1 && order != 1) {order = 1;}


    const query: Prisma.opening_balancesFindManyArgs = {
      orderBy: [{updated_at: order == -1?"desc":"asc"}],
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        fin_year: {
          select: {
            id: true,
            name: true
          },
        },
        dr_cr: true,
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        amount: true,
        created_at: true,
        updated_at: true,

      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            fin_year: {
              name: {
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

        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.opening_balances.findMany(query),
      prisma.opening_balances.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.opening_balancesFindManyArgs = {
      where: { id },
      select: {
        id: true,
        fin_year: {
          select: {
            id: true,
            name: true
          },
        },
        dr_cr: true,
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        amount: true,
        created_at: true,
        updated_at: true,

      },
    };
    const data = await prisma.opening_balances.findFirst(query);
    return generateRes(data);
  };

  // Update opening_balances details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.opening_balances.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default OpeningBalancesDao;
