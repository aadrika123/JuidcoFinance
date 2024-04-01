import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import {
  multiRequestData,
  requestData,
} from "../../requests/budgeting/loanManagementValidation";

/**
 * | Author- Sanjiv Kumar
 * | Created for- loan_managements Dao
 * | Status: open
 */

const prisma = new PrismaClient();

class LoanManagementDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.loan_managements.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited loan_managements
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);
    let order: number = Number(req.query.order);

    if (order != -1 && order != 1) {
      order = 1;
    }

    const query: Prisma.loan_managementsFindManyArgs = {
      orderBy: [{ updated_at: order == -1 ? "desc" : "asc" }],
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        ulb: {
          select: {
            id: true,
            code: true,
          },
        },
        primary_acc_code: {
          select: {
            id: true,
            code: true,
          },
        },
        purpose_of_loan: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        resolution_date: true,
        loan_no: true,
        loan_sanctioned_amount: true,
        interest_rate: true,
        instalments_no: true,
        instalment_amount: true,
        receipt_date: true,
        received_amount: true,
        total_received_amount: true,
        repayment_due_date: true,
        principal_amount: true,
        interest_amount: true,
        total_due_amount_to_repayment: true,
        officer: {
          select: {
            id: true,
            name: true,
          },
        },
        repaid_repayment_date: true,
        repaid_principal_amount: true,
        repaid_interest: true,
        repaid_total_amount: true,
        balance_principal_amount: true,
        balance_interest: true,
        balance_total_amount: true,
        balance_remarks: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        designation: {
          select: {
            id: true,
            name: true,
          },
        },
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
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            primary_acc_code: {
              code: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            department: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            loan_no: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.loan_managements.findMany(query),
      prisma.loan_managements.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.loan_managementsFindManyArgs = {
      where: { id },
      select: {
        id: true,
        ulb: {
          select: {
            id: true,
            code: true,
          },
        },
        primary_acc_code: {
          select: {
            id: true,
            code: true,
          },
        },
        purpose_of_loan: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        resolution_date: true,
        loan_no: true,
        loan_sanctioned_amount: true,
        interest_rate: true,
        instalments_no: true,
        instalment_amount: true,
        receipt_date: true,
        received_amount: true,
        total_received_amount: true,
        repayment_due_date: true,
        principal_amount: true,
        interest_amount: true,
        total_due_amount_to_repayment: true,
        officer: {
          select: {
            id: true,
            name: true,
          },
        },
        repaid_repayment_date: true,
        repaid_principal_amount: true,
        repaid_interest: true,
        repaid_total_amount: true,
        balance_principal_amount: true,
        balance_interest: true,
        balance_total_amount: true,
        balance_remarks: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        designation: {
          select: {
            id: true,
            name: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    };
    const data = await prisma.loan_managements.findFirst(query);
    return generateRes(data);
  };

  // Update loan_managements details
  update = async (req: Request) => {
    const id: number = req.body.data.id;
    return await prisma.loan_managements.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default LoanManagementDao;
