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

        const bill_record = await tx.bills.create({ data: data });
        if (docRecords.length > 0) {
          docRecords.forEach((docRecord: any) => {
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


  getById = async (id: number): Promise<any[]> => {
    const query = `select 
    
    b.id, mc.ulbs as ulb_name, amount, particulars, authorizing_officer_name,
    sanction_date, voucher_no, 
    sanctioned_amount,
    date_of_payment_or_cheque_issue,
    outstanding_balance, reason_for_delay
    bill_no, bill_date, vm.name as party_name, remarks,
    bc.approval_stage_id

    from bills b 
    
    left join vendor_masters vm on b.party_id = vm.id 
    left join municipality_codes mc on b.ulb_id=mc.id
    left join (select approval_stage_id, bill_id from bill_checkings where id in (select max(id) from bill_checkings group by bill_id)) bc on b.id = bc.bill_id
    
    where b.id=${id}`;
    const data : any[] = await prisma.$queryRawUnsafe<[]>(query);
    console.log(data);

    if (data.length > 0) {
      const docs = await prisma.bill_documents.findMany({
        select:{
          id: true,
          description: true,
          path: true
        },
        where: {
          bill_id: data[0]?.id,
        },
      });
      data[0].docs = docs;
    }

    return data;
  }

}

export default BillsDao;
