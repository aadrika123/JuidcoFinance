import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData, requestData } from "../../requests/budgeting/investmentsValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created for- investments Dao
 * | Status: open
 */


const prisma = new PrismaClient();

class InvestmentsDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.investments.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited investments
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    let order: number = Number(req.query.order);
    if (order != -1 && order != 1) {order = 1;}


    const query: Prisma.investmentsFindManyArgs = {
      orderBy: [{updated_at: order == -1?"desc":"asc"}],
      
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
        investment_no: true,
        authorization_date: true,
        investment_date: true,
        particulars: true,
        investment_type: {
          select: {
            id: true,
            name: true
          },
        },
        purchase_amount: true,
        face_value_amount: true,
        interest_due_date: true,
        interest_due_amount: true,
        user: {
          select: {
            id: true,
            name: true
          },
        },
        interest_recovered_amount: true,
        interest_recovery_date: true,
        acc_adj_recovery_date: true,
        realization_final_amount: true,
        realization_date: true,
        acc_adj_realization_date: true,
        remarks: true,
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
            investment_type: {
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
      prisma.investments.findMany(query),
      prisma.investments.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.investmentsFindManyArgs = {
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
        investment_no: true,
        authorization_date: true,
        investment_date: true,
        particulars: true,
        investment_type: {
          select: {
            id: true,
            name: true
          },
        },
        purchase_amount: true,
        face_value_amount: true,
        interest_due_date: true,
        interest_due_amount: true,
        user: {
          select: {
            id: true,
            name: true
          },
        },
        interest_recovered_amount: true,
        interest_recovery_date: true,
        acc_adj_recovery_date: true,
        realization_final_amount: true,
        realization_date: true,
        acc_adj_realization_date: true,
        remarks: true,
        created_at: true,
        updated_at: true,

      },
    };
    const data = await prisma.investments.findFirst(query);
    return generateRes(data);
  };

  // Update investments details
  update = async (req: Request) => {
    const id: number = req.body.id;
    return await prisma.investments.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default InvestmentsDao;
