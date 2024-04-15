import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

interface CountQueryResult {
  count: string;
}

class BillsDao {
  // Get limited bank master
  get = async (ulb: number, date: string, page: number, limit: number, search: string, order: number) => {

    let searchCondition = `ulb_id = ${ulb} and bill_date='${date}'`;

    if (search.length != 0) searchCondition += ` and lower(party_name) like '%${search.toLowerCase()}%'`;

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    const query = `select id, ulb_id, party_name, amount, bill_no, bill_date from bills 
    where ${searchCondition} order by id ${ordering}
    limit ${limit} offset ${offset};`;


    const records = await prisma.$queryRawUnsafe<[]>(query);

    const c = await prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) from bills where ${searchCondition}`);

    const count = Number(c[0]?.count);

    return generateRes(records, count, page, limit);
  };

}

export default BillsDao;
