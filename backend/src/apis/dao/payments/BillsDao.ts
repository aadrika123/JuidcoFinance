import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

interface CountQueryResult {
  count: string;
}

class BillsDao {


  get = async (ulb: number, date: string, page: number, limit: number, search: string, order: number) => {

    let searchCondition = `ulb_id = ${ulb} and bill_date='${date}'`;

    if (search.length != 0) searchCondition += ` and lower(party_name) like '%${search.toLowerCase()}%'`;

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    const query = `select b.id, b.ulb_id, amount, bill_no, bill_date, vm.name as party_name from bills b 
    left join 
    vendor_masters vm on b.party_id = vm.id 
    where ${searchCondition} order by id ${ordering}
    limit ${limit} offset ${offset};`;


    const records = await prisma.$queryRawUnsafe<[]>(query);

    const c = await prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) from bills where ${searchCondition}`);

    const count = Number(c[0]?.count);

    return generateRes(records, count, page, limit);
  }

  create = async (data: any) => {
    console.log(data);
    return await prisma.bills.createMany({
      data: data,
    });
  }

  createOne = async (data: any, docRecords: any) => {

    return prisma.$transaction(
      async (tx) => {

        const bill_record =  await tx.bills.create({data: data});
        if(docRecords.length > 0){
          docRecords.forEach((docRecord: any)=> {
            docRecord.bill_id = bill_record.id
          });

          const doc_records = await tx.bill_documents.createMany({
            data: docRecords
          });
        }
        return bill_record;
      }
    );
  }


}

export default BillsDao;
