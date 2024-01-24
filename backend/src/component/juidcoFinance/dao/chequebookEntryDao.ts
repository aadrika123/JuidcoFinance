import { Request } from "express";
import { PrismaClient, Prisma } from ".prisma/client";
import { generateRes2 } from "../../../util/generateRes2";

const prisma = new PrismaClient();

class ChequebookEntryDao {
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

    return generateRes2(data, count, page, limit );
  };


}

export default ChequebookEntryDao;
