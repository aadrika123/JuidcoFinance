import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import {
  multiRequestData,
  requestData,
} from "../../requests/budgeting/advanceManagementValidation";

/**
 * | Author- Sanjiv Kumar
 * | Created for- advance_managements Dao
 * | Status: open
 */

const prisma = new PrismaClient();

class AdvanceManagementDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.advance_managements.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited advance_management
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);
    let order: number = Number(req.query.order);

    if (order != -1 && order != 1) {
      order = 1;
    }

    const query: Prisma.advance_managementsFindManyArgs = {
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
        serial_no_of_estimate: true,
        work_order_no: true,
        work_name: true,
        work_nature: true,
        contract_amount: true,
        contractor_name: true,
        order_sanctioning_the_contract_no: true,
        order_sanctioning_the_contract_resolution_date: true,
        order_sanctioning_the_estimate_no: true,
        order_sanctioning_the_estimate_date: true,
        voucher_no: true,
        date: true,
        amount: true,
        officer: {
          select: {
            id: true,
            name: true,
          },
        },
        bill_no: true,
        bill_date: true,
        payable_amount: true,
        approved_amount: true,
        cumulative_approved_amount: true,
        pwd_officer: {
          select: {
            id: true,
            name: true,
          },
        },
        security_deposit_deducted_amount: true,
        tds_amount: true,
        work_contract_tax_amount: true,
        material_issued_recovery_amount: true,
        advance_provided_recovery_amount: true,
        other_deduction_amount: true,
        net_paid_amount: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
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
            work_name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            work_nature: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            officer: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            pwd_officer: {
              name: {
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
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.advance_managements.findMany(query),
      prisma.advance_managements.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.advance_managementsFindManyArgs = {
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
        serial_no_of_estimate: true,
        work_order_no: true,
        work_name: true,
        work_nature: true,
        contract_amount: true,
        contractor_name: true,
        order_sanctioning_the_contract_no: true,
        order_sanctioning_the_contract_resolution_date: true,
        order_sanctioning_the_estimate_no: true,
        order_sanctioning_the_estimate_date: true,
        voucher_no: true,
        date: true,
        amount: true,
        officer: {
          select: {
            id: true,
            name: true,
          },
        },
        bill_no: true,
        bill_date: true,
        payable_amount: true,
        approved_amount: true,
        cumulative_approved_amount: true,
        pwd_officer: {
          select: {
            id: true,
            name: true,
          },
        },
        security_deposit_deducted_amount: true,
        tds_amount: true,
        work_contract_tax_amount: true,
        material_issued_recovery_amount: true,
        advance_provided_recovery_amount: true,
        other_deduction_amount: true,
        net_paid_amount: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        remarks: true,
        created_at: true,
        updated_at: true,
      },
    };
    const data = await prisma.advance_managements.findFirst(query);
    return generateRes(data);
  };

  // Update advance_managements details
  update = async (req: Request) => {
    const id: number = req.body.data.id;
    return await prisma.advance_managements.update({
      where: {
        id: id,
      },
      data: requestData(req),
    });
  };
}

export default AdvanceManagementDao;
