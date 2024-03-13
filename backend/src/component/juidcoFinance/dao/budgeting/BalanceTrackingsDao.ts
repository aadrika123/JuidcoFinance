import { Request } from "express";
import { Prisma, PrismaClient, account_codes, balance_trackings } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";
import { multiRequestData } from "../../requests/budgeting/balanceTrackingsValidation";



/**
 * | Author- Bijoy Paitandi
 * | Created for- balance_trackings Dao
 * | Status: open
 */


const prisma = new PrismaClient();

enum CodeType {Schedule = 1, GeneralLedger = 2, Ledger = 3}; 
  

interface GeneralLedgerData{
  description: string;
}

class BalanceTrackingsDao {
  constructor() {
    //////
  }

  // store
  store = async (req: Request) => {
    return await prisma.balance_trackings.createMany({
      data: multiRequestData(req),
    });
  };

  // Get limited balance_trackings
  get = async (req: Request) => {
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const search: string = String(req.query.search);

    const query: Prisma.balance_trackingsFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        total_balance: true,
        created_at: true,
        updated_at: true,

      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            primary_acc_code: {
              code: {
                contains: search, mode: "insensitive",
              },
            },
          },

        ],
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.balance_trackings.findMany(query),
      prisma.balance_trackings.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single payment entry details
  getById = async (id: number) => {
    const query: Prisma.balance_trackingsFindManyArgs = {
      where: { id },
      select: {
        id: true,
        primary_acc_code: {
          select: {
            id: true,
            code: true
          },
        },
        total_balance: true,
        created_at: true,
        updated_at: true,

      },
    };
    const data = await prisma.balance_trackings.findFirst(query);
    return generateRes(data);
  };


  getBalance = async (id: number) => {

    const query: Prisma.balance_trackingsFindManyArgs = {
      where: { primary_acc_code_id: id },
      select: {
        id: true,
        total_balance: true,
        created_at: true,
        updated_at: true,
      },
    };
    const data = await prisma.balance_trackings.findFirst(query);
    return generateRes(data);
  }

  getLatestBalances = async (req: Request) => {
    const search: string = String(req.query.search);

    if (search !== "undefined" && search !== "") {
      const searchCriteria = `%${search}%`;
      const data = await prisma.$queryRaw`select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join (select id, primary_acc_code_id, total_balance from balance_trackings where id in (select max(id) from balance_trackings group by primary_acc_code_id)) b on a.id = b.primary_acc_code_id where a.description like ${searchCriteria}`;
      return generateRes(data);

    } else {
      const data = await prisma.$queryRaw`select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join (select id, primary_acc_code_id, total_balance from balance_trackings where id in (select max(id) from balance_trackings group by primary_acc_code_id)) b on a.id = b.primary_acc_code_id`;
      return generateRes(data);
    }
  }



  getScheduleReport = async (scheduleID: number) => {

    const scheduleRecords = await prisma.$queryRaw<account_codes[]>`select a.id, a.code, a.parent_id, a.code_type_id, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join balance_trackings b on a.id = b.primary_acc_code_id where a.id=${scheduleID} order by b.id desc limit 1`;

    // console.log(scheduleRecords);
    if(scheduleRecords.length == 0 || scheduleRecords[0].code_type_id !== CodeType.Schedule) {
      return Promise<{}>;
    }

    const scheduleRecord = scheduleRecords[0];


    const general_ledgers = await prisma.$queryRaw<[GeneralLedgerData]>`select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join (select id, primary_acc_code_id, total_balance from balance_trackings where id in (select max(id) from balance_trackings group by primary_acc_code_id)) b on a.id = b.primary_acc_code_id where a.parent_id=${scheduleID}`;


    if(general_ledgers){
      let remissions_index = -1;
      for(let i=0;i<general_ledgers.length;i++){
        if(general_ledgers[i].description.toLowerCase().indexOf("remission") != -1){
          remissions_index = i;
        }
      }
  
      if(remissions_index != -1){
        console.log("remissions_index: " + remissions_index);
        const remission = general_ledgers[remissions_index];
        general_ledgers.splice(remissions_index);

        const data = { ...scheduleRecord,
          general_ledgers: general_ledgers,
          remissions: remission
        };
        return generateRes(data);

      }else{
          const data = { ...scheduleRecord,
          general_ledgers: general_ledgers
        };
        return generateRes(data);
      }

      
        
    }

    return generateRes(null);  
  }

  getGeneralLedgerReport = async (generalLedgerID: number) => {

    const generalLedgers = await prisma.$queryRaw<account_codes[]>`select a.id, a.code, a.parent_id, a.code_type_id, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join balance_trackings b on a.id = b.primary_acc_code_id where a.id=${generalLedgerID} order by b.id desc limit 1`;

    // console.log(scheduleRecords);
    if(generalLedgers.length == 0 || generalLedgers[0].code_type_id !== CodeType.GeneralLedger) {
      return Promise<{}>;
    }

    const generalLedger = generalLedgers[0];

    const ledgers = await prisma.$queryRaw<[GeneralLedgerData]>`select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join (select id, primary_acc_code_id, total_balance from balance_trackings where id in (select max(id) from balance_trackings group by primary_acc_code_id)) b on a.id = b.primary_acc_code_id where a.parent_id=${generalLedgerID}`;


    const data = { ...generalLedger,
      ledgers: ledgers
    };

    return generateRes(data);
  }
}

export default BalanceTrackingsDao;
