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
    return {
      currentPage: page,
      count,
      totalPage: Math.ceil(count / limit),
      data,
    };
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
    return await prisma.bank_masters.findFirst(query);
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
    return {
      currentPage: page,
      count,
      totalPage: Math.ceil(count / limit),
      data,
    };
  };
}

export default BankMasterDao;
