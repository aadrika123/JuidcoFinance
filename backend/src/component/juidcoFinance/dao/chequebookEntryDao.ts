import { Request } from "express";
import { PrismaClient, Prisma } from ".prisma/client";
import { generateRes } from "../../../util/generateRes";
// import { ChequebookRequestData } from "../../../util/types";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status: open
 */

const prisma = new PrismaClient();

class ChequebookEntryDao {

    // Add new vendor in DB
    store = async (req: Request) => {

      console.log(req);
      return;
      
      // const requestData: ChequebookRequestData = {
      //   vendor_type_id: req.body.vendorTypeId,
      //   vendor_no: req.body.vendorNo,
      //   name: req.body.name,
      //   mobile_no: req.body.mobileNo,
      //   comm_address: req.body.commAddress,
      //   tin_no: req.body.tinNo,
      //   pan_no: req.body.panNo,
      //   bank_name: req.body.bankName,
      //   ifsc_code: req.body.ifscCode,
      //   department_id: req.body.departmentId,
      //   email: req.body.email,
      //   office_address: req.body.officeAddress,
      //   gst_no: req.body.gstNo,
      //   aadhar_no: req.body.aadharNo,
      //   bank_account_no: req.body.bankAccountNo,
      //   bank_branch_name: req.body.bankBranchName,
      // };
  
      // return await prisma.vendor_masters.create({
      //   data: requestData,
      // });
    };
  
  

  // get all chequebook data
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);
    const skip = (page - 1) * limit;
    
    const query: Prisma.cheque_book_entriesFindManyArgs = {
      skip: skip,
      take: limit,
      select: {
        id: true,
        date: true,
        bank_name: true,
        employee: true,
        employee_id: true,
        bank_account_no: true,
        cheque_no_from: true,
        bank_branch: true,
        page_count: true,
        cheque_no_to: true, 
        issuer_name: true,
        cheque_book_return: true,
        cheque_book_return_date: true,
        remarks: true,
        created_at: true,
        updated_at: true,
      },
    };

    
    if(search !== "undefined" && search !== ""){

      query.where = {
        OR: [
          {bank_name: {contains: search, mode: "insensitive"},},
          {remarks: {contains: search, mode: "insensitive"},},
        ],
      }

    }
    
    const [data, count] = await prisma.$transaction([
      prisma.cheque_book_entries.findMany(query),
      prisma.cheque_book_entries.count({where: query.where})
    ]);

    return generateRes(data, count, page, limit );
  };


}

export default ChequebookEntryDao;
