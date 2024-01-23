import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { BankRequestData } from "../../../util/types";

const prisma = new PrismaClient();

class BankMasterDao {
  constructor() {
    //////
  }

  // store bank details in DB
  store = async (req: Request) => {
    const requestData: BankRequestData = {
      bank_name: req.body.bankName,
      ifsc_code: req.body.ifscCode,
      branch: req.body.branch,
      micr_code: req.body.micrCode,
      branch_address: req.body.branchAddress,
      branch_city: req.body.branchCity,
      branch_state: req.body.branchState,
      branch_district: req.body.branchDistrict,
      email: req.body.email,
      contact_no: req.body.contactNo,
      contact_person_name: req.body.contactPersonName,
    };

    return await prisma.bank_master.create({
      data: requestData,
    });
  };

  // Get limited bank master
  get = async (page: number, limit: number) => {
    const query = {
      skip: (page - 1) * limit,
      take: limit,
    };
    const [data, count] = await prisma.$transaction([
      prisma.bank_master.findMany(query),
      prisma.bank_master.count(),
    ]);
    return {
      currentPage: page,
      count,
      totalPage: Math.ceil(count / limit),
      data,
    };
  };

  // Get single bank details
  getById = async (id: number) => {
    return await prisma.bank_master.findUnique({ where: { id } });
  };

  // Update bank details
  update = async (req: Request) => {
    const id: number = req.body.id;
    const requestData: BankRequestData = {
      bank_name: req.body.bankName,
      ifsc_code: req.body.ifscCode,
      branch: req.body.branch,
      micr_code: req.body.micrCode,
      branch_address: req.body.branchAddress,
      branch_city: req.body.branchCity,
      branch_state: req.body.branchState,
      branch_district: req.body.branchDistrict,
      email: req.body.email,
      contact_no: req.body.contactNo,
      contact_person_name: req.body.contactPersonName,
    };
    return await prisma.bank_master.update({
      where: {
        id,
      },
      data: requestData,
    });
  };

  // Search bank details
  search = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.bank_masterFindManyArgs = {
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
          { ifsc_code: { equals: search, mode: "insensitive" } },
          { contact_person_name: { equals: search, mode: "insensitive" } },
        ],
      },
    };

    const [data, count] = await prisma.$transaction([
      prisma.bank_master.findMany(query),
      prisma.bank_master.count({
        where: query.where,
      }),
    ]);
    return {
      currentPage: page,
      count,
      totalPage: Math.ceil(count / limit),
      data,
    };
  };
}

export default BankMasterDao;
