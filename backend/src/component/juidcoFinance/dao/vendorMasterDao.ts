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

  get = async () => {
    return await prisma.vendor_master.findMany({
      skip: 0,
      take: 9,
    });
  };
}

export default VendorMasterDao;
