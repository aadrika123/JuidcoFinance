import { Request } from "express";
import type { VendorRequestData } from "../../../util/types";
import { PrismaClient, Prisma } from ".prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class VendorMasterDao {
  // Add new vendor in DB
  store = async (req: Request) => {
    const requestData: VendorRequestData = {
      vendor_type_id: req.body.vendor_type_id,
      vendor_no: req.body.vendor_no,
      name: req.body.name,
      mobile_no: req.body.mobile_no,
      comm_address: req.body.comm_address,
      tin_no: req.body.tin_no,
      pan_no: req.body.pan_no,
      bank_name: req.body.bank_name,
      ifsc_code: req.body.ifsc_code,
      department_id: req.body.department_id,
      email: req.body.email,
      office_address: req.body.office_address,
      gst_no: req.body.gst_no,
      aadhar_no: req.body.aadhar_no,
      bank_account_no: req.body.bank_account_no,
      bank_branch_name: req.body.bank_branch_name,
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

    return generateRes(data, count, page, limit );
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
    const data = await prisma.vendor_masters.findFirst(query);
    return generateRes(data);
  };

  //update vendor master data
  update = async (req: Request) => {
    const id: number = req.body.id;

    const requestData: VendorRequestData = {
      vendor_type_id: req.body.vendor_type_id,
      vendor_no: req.body.vendor_no,
      name: req.body.name,
      mobile_no: req.body.mobile_no,
      comm_address: req.body.comm_address,
      tin_no: req.body.tin_no,
      pan_no: req.body.pan_no,
      bank_name: req.body.bank_name,
      ifsc_code: req.body.ifsc_code,
      department_id: req.body.department_id,
      email: req.body.email,
      office_address: req.body.office_address,
      gst_no: req.body.gst_no,
      aadhar_no: req.body.aadhar_no,
      bank_account_no: req.body.bank_account_no,
      bank_branch_name: req.body.bank_branch_name,
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

    return generateRes(data, count, page, limit );
  };
}

export default VendorMasterDao;
