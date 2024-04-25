import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

interface CountQueryResult {
  count: string;
}

class BillVerificationDao {

  getLevel0JuniorEngineerInbox = async (ulbId: number, page: number, limit: number, search: string, order: number) => {

    let filterCondition = `b.ulb_id = ${ulbId} and x.bill_id is null`;
    if (search.length != 0) filterCondition += ` and lower(b.party_name) like '%${search.toLowerCase()}%'`;

    const queryWithoutFieldsAndPagination =`from bills b 
    left join 
    (
      select bill_id, comment from bill_checkings bc1 where bc1.id in (
        select max(id) from bill_checkings bc2 group by bc2.bill_id
      )
    ) x on b.id = x.bill_id where ${filterCondition}`;

    

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;


    const query = `select * ${queryWithoutFieldsAndPagination} 
    order by b.id ${ordering}
    limit ${limit} offset ${offset};`;

    const records = await prisma.$queryRawUnsafe<[]>(query);

    const c = await prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryWithoutFieldsAndPagination}`);

    const count = Number(c[0]?.count);

    return generateRes(records, count, page, limit);
  }
}

export default BillVerificationDao;
