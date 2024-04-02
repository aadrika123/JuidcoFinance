import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/documentation/budgetReappropriationsValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created for- budget_reappropriations Dao
 * | Status: open
 */


const prisma = new PrismaClient();

class BudgetReappropriationsDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.budget_reappropriations.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited budget_reappropriations
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    let order: number = Number(req.query.order);
    if (order != -1 && order != 1) {order = 1;}


    const query: Prisma.budget_reappropriationsFindManyArgs = {
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
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        transaction_date: true,
        budget_name: {
          select: {
            id: true,
            name: true
          },
        },
        actual_amount: true,
        from_primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        approved_amount: true,
        balance_amount: true,
        transfer_amount: true,
        remark: true,
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
          {
            budget_name: {
              name: {
                contains: search, mode: "insensitive",
              },
            },
          },
          {
            from_primary_acc_code: {
              code: {
                contains: search, mode: "insensitive",
              },
            },
          },

        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.budget_reappropriations.findMany(query),
      prisma.budget_reappropriations.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.budget_reappropriationsFindManyArgs = {
      where: { id },
      select: {
        id: true,
        fin_year: {
          select: {
            id: true,
            name: true
          },
        },
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        transaction_date: true,
        budget_name: {
          select: {
            id: true,
            name: true
          },
        },
        actual_amount: true,
        from_primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        approved_amount: true,
        balance_amount: true,
        transfer_amount: true,
        remark: true,
        created_at: true,
        updated_at: true,

      },
    };
    const data = await prisma.budget_reappropriations.findFirst(query);
    return generateRes(data);
  };

  // Update budget_reappropriations details
  update = async (req: Request) => {
    const id: number = req.body.data.id;
    return await prisma.budget_reappropriations.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };


  
}

export default BudgetReappropriationsDao;
