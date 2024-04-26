import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

interface CountQueryResult {
  count: string;
}

class BillVerificationDao {
  getHigherLevelInbox = async (
    ulbId: number,
    page: number,
    limit: number,
    search: string,
    order: number,
    level: number
  ) => {
    let filterCondition = `b.ulb_id = ${ulbId} and x.approval_stage_id = ${
      level - 1
    }`;
    if (search.length != 0)
      filterCondition += ` and lower(b.party_name) like '%${search.toLowerCase()}%'`;

    const queryWithoutFieldsAndPagination = `from bills b 
    left join 
    (
      select bill_id, approval_stage_id from bill_checkings bc1 where bc1.id in (
        select max(id) from bill_checkings bc2 group by bc2.bill_id
      )
    ) x on b.id = x.bill_id where ${filterCondition}`;

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    const query = `select * ${queryWithoutFieldsAndPagination} 
    order by b.id ${ordering}
    limit ${limit} offset ${offset};`;

    const records = await prisma.$queryRawUnsafe<[]>(query);

    const c = await prisma.$queryRawUnsafe<[CountQueryResult]>(
      `select count(*) ${queryWithoutFieldsAndPagination}`
    );

    const count = Number(c[0]?.count);

    return generateRes(records, count, page, limit);
  };

  getLevel0JuniorEngineerInbox = async (
    ulbId: number,
    page: number,
    limit: number,
    search: string,
    order: number,
    level?: number
  ) => {
    console.log(level);
    let filterCondition = `b.ulb_id = ${ulbId} and x.bill_id is null`;
    if (search.length != 0)
      filterCondition += ` and lower(b.party_name) like '%${search.toLowerCase()}%'`;

    const queryWithoutFieldsAndPagination = `from bills b 
    left join 
    (
      select bill_id from bill_checkings bc1 where bc1.id in (
        select max(id) from bill_checkings bc2 group by bc2.bill_id
      )
    ) x on b.id = x.bill_id where ${filterCondition}`;

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    const query = `select * ${queryWithoutFieldsAndPagination} 
    order by b.id ${ordering}
    limit ${limit} offset ${offset};`;

    const records = await prisma.$queryRawUnsafe<[]>(query);

    const c = await prisma.$queryRawUnsafe<[CountQueryResult]>(
      `select count(*) ${queryWithoutFieldsAndPagination}`
    );

    const count = Number(c[0]?.count);

    return generateRes(records, count, page, limit);
  };

  //////////////// Get Higher Level Outbox
  getHigherLevelOutbox = async (
    ulbId: number,
    page: number,
    limit: number,
    search: string,
    order: number,
    level: number
  ) => {
    let filterCondition = `b.ulb_id = ${ulbId} and x.approval_stage_id >= ${level}`;
    if (search.length != 0)
      filterCondition += ` and lower(b.party_name) like '%${search.toLowerCase()}%'`;

    const queryWithoutFieldsAndPagination = `from bills b 
    left join 
    (
      select bill_id, approval_stage_id from bill_checkings bc1 where bc1.id in (
        select max(id) from bill_checkings bc2 group by bc2.bill_id
      )
    ) x on b.id = x.bill_id where ${filterCondition}`;

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    const query = `select * ${queryWithoutFieldsAndPagination} 
    order by b.id ${ordering}
    limit ${limit} offset ${offset};`;

    const records = await prisma.$queryRawUnsafe<[]>(query);

    const c = await prisma.$queryRawUnsafe<[CountQueryResult]>(
      `select count(*) ${queryWithoutFieldsAndPagination}`
    );

    const count = Number(c[0]?.count);

    return generateRes(records, count, page, limit);
  };

  /////////// Get Bill By Id
  getBillById = async (id: number) => {
    const dd = (await prisma.$queryRawUnsafe(`
    select  b.id, mc.id as ulb_id, mc.ulbs, b.bill_no, b.bill_date, vm.id as party_id, vm.name as party_name, b.particulars, b.amount, b.remarks, bl.approval_stage_id from
    bills as b
    left join 
    municipality_codes as mc on mc.id = b.ulb_id
    left join
    vendor_masters as vm on vm.id = b.party_id
    left join
    (
      select * from bill_checkings bc where bc.id in (
        select max(bc2.id) from bill_checkings bc2 where bc2.bill_id = ${id}
      )
    ) bl on bl.bill_id = ${id}
    where b.id = ${id}
    `)) as any;

    const d1 = dd[0];
    const data = {
      ...d1,
      ulb: {
        id: d1.ulb_id,
        ulbs: d1.ulbs,
      },
      party: {
        id: d1.party_id,
        name: d1.party_name,
      },
    };
    delete data.ulb_id;
    delete data.ulbs;
    delete data.party_id;
    delete data.party_name;
    if(!data.approval_stage_id) delete data.approval_stage_id


    return generateRes(data);
  };

  ////////// Approving Bill
  approveBill = async (data: any) => {
    const res = await prisma.bill_checkings.create({
      data,
    });

    return generateRes(res);
  };

  ///////// Get Last Bill from bill_checkings by billId
  getLastBillFromBillCheckingByBillId = async (billId: number) => {
    const res = await prisma.bill_checkings.aggregate({
      where: {
        id: billId,
      },
      _max: {
        id: true,
      },
    });

    return generateRes(res);
  };
}

export default BillVerificationDao;
