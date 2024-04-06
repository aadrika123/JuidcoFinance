import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { BankMasterValidation } from "jflib";

const prisma = new PrismaClient();

class BankMasterDao {
  constructor() {
    //////
  }

  // store bank details in DB
  store = async (req: Request) => {
    const { ulb_id, primary_acc_code_id, bank_id, bank_type_id, bank_acc_no } =
      req.body.data;
    const data = await prisma.bank_masters.findFirst({
      where: {
        OR: [
          {
            ulb_id,
            primary_acc_code_id,
            bank_id,
            bank_type_id,
          },
          {
            bank_acc_no,
          },
          {
            ulb_id,
            primary_acc_code_id,
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (data) throw new Error("exist");

    return await prisma.bank_masters.create({
      data: BankMasterValidation.requestData(req.body.data),
    });
  };

  // Get limited bank master
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);
    let order: number = Number(req.query.order);

    if (order != -1 && order != 1) {
      order = -1;
    }

    const query: Prisma.bank_mastersFindManyArgs = {
      orderBy: [{ updated_at: order == -1 ? "desc" : "asc" }],

      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        bank: {
          select: {
            id: true,
            name: true,
          },
        },
        primary_acc_code: {
          select: {
            id: true,
            code: true,
          },
        },
        ifsc_code: true,
        bank_acc_no: true,
        branch: true,
      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            bank: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          { ifsc_code: { contains: search, mode: "insensitive" } },
          { bank_acc_no: { contains: search, mode: "insensitive" } },
          { branch: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.bank_masters.findMany(query),
      prisma.bank_masters.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single bank details
  getById = async (id: number) => {
    const query: Prisma.bank_mastersFindManyArgs = {
      where: { id },
      select: {
        id: true,
        bank: {
          select: {
            id: true,
            name: true,
          },
        },
        primary_acc_code: {
          select: {
            id: true,
            code: true,
          },
        },
        ifsc_code: true,
        bank_acc_no: true,
        branch: true,
        micr_code: true,
        branch_address: true,
        branch_city: true,
        branch_state: true,
        branch_district: true,
        email: true,
        contact_no: true,
        ulb: {
          select: {
            id: true,
            ulbs: true,
          },
        },
        bank_type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    };
    const data = await prisma.bank_masters.findFirst(query);
    return generateRes(data);
  };

  // Update bank details
  update = async (req: Request) => {
    const id: number = req.body.data.id;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [copy, record] = await prisma.$transaction([
      prisma.$queryRaw`insert into bank_masters_history select * from bank_masters where id=${id}`,

      prisma.bank_masters.update({
        where: {
          id: id,
        },
        data: req.body.data,
      }),
    ]);

    return record;
  };

  // Get By AccountingCode and Ulb
  getByAccCodeAndUlb = async (req: Request) => {
    const { accCodeId, ulbId } = req.params;

    const query: Prisma.bank_mastersFindManyArgs = {
      where: {
        primary_acc_code_id: Number(accCodeId),
        ulb_id: Number(ulbId),
      },
      select: {
        id: true,
        bank_acc_no: true,
      },
    };

    const data = await prisma.bank_masters.findFirst(query);
    return generateRes(data);
  };
}

export default BankMasterDao;
