import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";



/**
 * | Author- Bijoy Paitandi
 * | Created for- receipt_budgets Dao
 * | Status: open
 */


const prisma = new PrismaClient();

class ReceiptBudgetsDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.receipt_budgets.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited receipt_budgets
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);
    let order: number = Number(req.query.order);

      if (order != -1 && order != 1) {
        order = 1;
      }


    const query: Prisma.receipt_budgetsFindManyArgs = {
      orderBy: [
        {updated_at: order == -1?"desc":"asc"}        
      ],
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
fin_year:{
select:{
id: true,
name: true
},
},
primary_acc_code:{
select:{
id: true,
name: true
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
fin_year:{
name:{
contains: search, mode: "insensitive",
},
},
},
{
primary_acc_code:{
name:{
contains: search, mode: "insensitive",
},
},
},

        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.receipt_budgets.findMany(query),
      prisma.receipt_budgets.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.receipt_budgetsFindManyArgs = {
      where: { id },
      select: {
        id: true,
fin_year:{
select:{
id: true,
name: true
},
},
primary_acc_code:{
select:{
id: true,
name: true
},
},
amount: true,
created_at: true,
updated_at: true,

      },
    };
    const data = await prisma.receipt_budgets.findFirst(query);
    return generateRes(data);
  };

  // Update receipt_budgets details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.receipt_budgets.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default ReceiptBudgetsDao;
