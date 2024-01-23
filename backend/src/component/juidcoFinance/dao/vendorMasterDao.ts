import { Request } from "express";
import type { VendorRequestData } from "../../../util/types";
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

class VendorMasterDao {
  store = async (req: Request) => {
    const requestData: VendorRequestData = {
      vendor_type_id: req.body.vendorTypeId,
      vendor_no: req.body.vendorNo,
      name: req.body.name,
      mobile_no: req.body.mobileNo,
      comm_address: req.body.commAddress,
      tin_no: req.body.tinNo,
      pan_no: req.body.panNo,
      bank_name: req.body.bankName,
      ifsc_code: req.body.ifscCode,
      department_id: req.body.departmentId,
      email: req.body.email,
      office_address: req.body.officeAddress,
      gst_no: req.body.gstNo,
      aadhar_no: req.body.aadharNo,
      bank_account_no: req.body.bankAccountNo,
      bank_branch_name: req.body.bankBranchName,
    };

    return await prisma.vendor_master.create({
      data: requestData,
    });
  };

  // get all vendor data
  get = async (page:number, limit:number) => {
    const query = {
      skip: (page - 1) * limit,
      take: limit,
    };
    const [data, count] = await prisma.$transaction([
      prisma.vendor_master.findMany(query),
      prisma.vendor_master.count(),
    ]);
    return {
      currentPage: page,
      count,
      totalPage: Math.ceil(count / limit),
      data,
    };
  };

  //get single vendor data by ID
  getById = async (id: number) => {
    return await prisma.vendor_master.findUnique({ where: { id } });
  };

  //update vendor master data
  update = async (req: Request) => {
    const id: number = req.body.id;

    const requestData: VendorRequestData = {
      vendor_type_id: req.body.vendorTypeId,
      vendor_no: req.body.vendorNo,
      name: req.body.name,
      mobile_no: req.body.mobileNo,
      comm_address: req.body.commAddress,
      tin_no: req.body.tinNo,
      pan_no: req.body.panNo,
      bank_name: req.body.bankName,
      ifsc_code: req.body.ifscCode,
      department_id: req.body.departmentId,
      email: req.body.email,
      office_address: req.body.officeAddress,
      gst_no: req.body.gstNo,
      aadhar_no: req.body.aadharNo,
      bank_account_no: req.body.bankAccountNo,
      bank_branch_name: req.body.bankBranchName,
    };

    return await prisma.vendor_master.update({
      where: {
        id,
      },
      data: requestData,
    });
  };
}

export default VendorMasterDao;
