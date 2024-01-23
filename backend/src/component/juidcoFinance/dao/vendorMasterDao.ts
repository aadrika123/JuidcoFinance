import { Request } from "express";
import type { VendorRequestData } from "../../../util/types";
import { PrismaClient, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

class VendorMasterDao {
  // Add new vendor in DB
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

    return await prisma.vendor_masters.create({
      data: requestData,
    });
  };

  // get all vendor data
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.vendor_mastersFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        vendor_no: true,
        vendor_type: {
          select: {
            id: true,
            name: true,
          },
        },
        name: true,
        mobile_no: true,
        tin_no: true,
        gst_no: true,
        is_authorized: true,
        created_at: true,
        authorized_date: true,
        updated_at: true,
      },
    };

    if(search !== "undefined"){
      query.where = {
        OR: [
          {
            vendor_type: {
              name: {
                equals: search,
                mode: "insensitive",
              },
            },
          },
          { name: { equals: search, mode: "insensitive" } },
        ],
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.vendor_masters.findMany(query),
      prisma.vendor_masters.count(),
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
    const query: Prisma.vendor_mastersFindManyArgs = {
      where: { id },
      select: {
        id: true,
        vendor_type: {
          select: {
            id: true,
            name: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        name: true,
        mobile_no: true,
        tin_no: true,
        gst_no: true,
        comm_address: true,
        pan_no: true,
        bank_name: true,
        ifsc_code: true,
        email: true,
        office_address: true,
        aadhar_no: true,
        bank_account_no: true,
        bank_branch_name: true,
        is_authorized: true,
        created_at: true,
        authorized_date: true,
        updated_at: true,
      },
    };
    return await prisma.vendor_masters.findFirst(query);
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

    return await prisma.vendor_masters.update({
      where: {
        id,
      },
      data: requestData,
    });
  };

  // Search vendor details
  search = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.vendor_mastersFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      where: {
        OR: [
          {
            vendor_type: {
              name: {
                equals: search,
                mode: "insensitive",
              },
            },
          },
          { name: { equals: search, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        vendor_no: true,
        vendor_type: {
          select: {
            id: true,
            name: true,
          },
        },
        name: true,
        mobile_no: true,
        tin_no: true,
        gst_no: true,
        is_authorized: true,
        created_at: true,
        authorized_date: true,
        updated_at: true,
      },
    };

    const [data, count] = await prisma.$transaction([
      prisma.vendor_masters.findMany(query),
      prisma.vendor_masters.count({
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

export default VendorMasterDao;
