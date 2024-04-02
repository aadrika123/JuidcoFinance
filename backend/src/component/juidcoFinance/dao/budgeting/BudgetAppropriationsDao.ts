import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/documentation/budgetAppropriationsValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created for- budget_appropriations Dao
 * | Status: open
 */


const prisma = new PrismaClient();

class BudgetAppropriationsDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.budget_appropriations.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited budget_appropriations
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);
    let order: number = Number(req.query.order);

    if (order != -1 && order != 1) {
      order = 1;
    }


    const query: Prisma.budget_appropriationsFindManyArgs = {
      orderBy: [
        {updated_at: order == -1?"desc":"asc"}        
      ],
      
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
        remark: true,
        from_primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        approved_amount: true,
        transfer_amount: true,
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
      prisma.budget_appropriations.findMany(query),
      prisma.budget_appropriations.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.budget_appropriationsFindManyArgs = {
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
        remark: true,
        from_primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        approved_amount: true,
        transfer_amount: true,
        created_at: true,
        updated_at: true,

      },
    };
    const data = await prisma.budget_appropriations.findFirst(query);
    return generateRes(data);
  };

  // Update budget_appropriations details
  update = async (req: Request) => {
    const id: number = req.body.data.id;
    return await prisma.budget_appropriations.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };


  getCurrentAmounts = async () => {
    const acc = await prisma.$queryRaw`SELECT a.primary_acc_code_id as id, a.approved_amount, b.balance_amount FROM budget_appropriations a left join balance_trackings b on a.primary_acc_code_id = b.primary_acc_code_id limit 1`;
    if (!acc){
      return generateRes(null);
    }    

    return generateRes(acc);
  }
}

export default BudgetAppropriationsDao;
