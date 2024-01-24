import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { BankRequestData } from "../../../util/types";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class BankMasterDao {
  constructor() {
    //////
  }

  // store bank details in DB
  store = async (req: Request) => {
    const requestData: BankRequestData = {
      bank_name: req.body.bank_name,
      ifsc_code: req.body.ifsc_code,
      branch: req.body.branch,
      micr_code: req.body.micr_code,
      branch_address: req.body.branch_address,
      branch_city: req.body.branch_city,
      branch_state: req.body.branch_state,
      branch_district: req.body.branch_district,
      email: req.body.email,
      contact_no: req.body.contact_no,
      contact_person_name: req.body.contact_person_name,
    };

    return await prisma.bank_masters.create({
      data: requestData,
    });
  };

  // Get limited bank master
  get = async (req:Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.bank_mastersFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        bank_name: true,
        ifsc_code: true,
        branch: true,
      },
    };

    if(search !== "undefined"){
      query.where = {
        OR: [
          {
            bank_name: {
              equals: search,
              mode: "insensitive",
            },
          },
          { ifsc_code: { equals: search, mode: "insensitive" } }
        ],
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.bank_masters.findMany(query),
      prisma.bank_masters.count({where: query.where}),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single bank details
  getById = async (id: number) => {
    const query: Prisma.bank_mastersFindManyArgs = {
      where: { id },
      select: {
        id: true,
        bank_name: true,
        ifsc_code: true,
        branch: true,
        micr_code: true,
        branch_address: true,
        branch_city: true,
        branch_state: true,
        branch_district: true,
        email: true,
        contact_no: true,
        contact_person_name: true,
      },
    };
    const data = await prisma.bank_masters.findFirst(query);
    return generateRes(data);
  };

  // Update bank details
  update = async (req: Request) => {
    const id: number = req.body.id;
    const requestData: BankRequestData = {
      bank_name: req.body.bank_name,
      ifsc_code: req.body.ifsc_code,
      branch: req.body.branch,
      micr_code: req.body.micr_code,
      branch_address: req.body.branch_address,
      branch_city: req.body.branch_city,
      branch_state: req.body.branch_state,
      branch_district: req.body.branch_district,
      email: req.body.email,
      contact_no: req.body.contact_no,
      contact_person_name: req.body.contact_person_name,
    };
    return await prisma.bank_masters.update({
      where: {
        id: id,
      },
      data: requestData,
    });
  };

  // Search bank details
  search = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.bank_mastersFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      where: {
        OR: [
          {
            bank_name: {
              equals: search,
              mode: "insensitive",
            },
          },
          { ifsc_code: { equals: search, mode: "insensitive" } }
        ],
      },
      select: {
        id: true,
        bank_name: true,
        ifsc_code: true,
        branch: true,
      },
    };

    const [data, count] = await prisma.$transaction([
      prisma.bank_masters.findMany(query),
      prisma.bank_masters.count({
        where: query.where,
      }),
    ]);
    return generateRes(data, count, page, limit);
  };
}

export default BankMasterDao;
