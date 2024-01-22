import { Request } from "express";
import { PrismaClient } from "@prisma/client";
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
  get = async () => {
    return await prisma.bank_master.findMany({
      skip: 0,
      take: 10,
    });
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
}

export default BankMasterDao;
