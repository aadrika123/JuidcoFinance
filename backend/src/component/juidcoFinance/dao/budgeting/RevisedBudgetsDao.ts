import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/budgeting/revisedBudgetsValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created for- revised_budgets Dao
 * | Status: open
 */


const prisma = new PrismaClient();

class RevisedBudgetsDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.revised_budgets.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited revised_budgets
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.revised_budgetsFindManyArgs = {
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
        approved_amount: true,
        revised_amount: true,
        remarks: true,
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
      prisma.revised_budgets.findMany(query),
      prisma.revised_budgets.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.revised_budgetsFindManyArgs = {
      where: { id },
      select: {
        id: true,
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        approved_amount: true,
        revised_amount: true,
        remarks: true,
        created_at: true,
        updated_at: true,

      },
    };
    const data = await prisma.revised_budgets.findFirst(query);
    return generateRes(data);
  };

  // Update revised_budgets details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.revised_budgets.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default RevisedBudgetsDao;
