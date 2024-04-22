import { Request } from "express";
import { Prisma, PrismaClient, account_codes, balance_trackings } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { AccountingCodeType } from "jflib";



/**
 * | Author- Bijoy Paitandi
 * | Created for- balance_trackings Dao
 * | Status: open
 */


const prisma = new PrismaClient();

enum CodeType { Schedule = 1, GeneralLedger = 2, Ledger = 3 }


interface GeneralLedgerData {
  description: string;
}

class BalanceTrackingsDao {
  constructor() {
    //////
  }

  // Get limited balance_trackings
  get = async (page: number, limit: number, search: string, order: number) => {

    const query: Prisma.balance_trackingsFindManyArgs = {
      orderBy: [
        { updated_at: order == -1 ? "desc" : "asc" }
      ],

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
    const ulb_id: number = Number(req.query.ulb);
    const finYear: number = Number(req.query.year); //Number(req.query.fin_year);

    //console.log(ulb_id, finYear);

    const year_start = new Date(`${finYear}-04-01`);
    const year_end = new Date(`${finYear + 1}-03-31`);


      const data = await prisma.$queryRaw`select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.ulb_id,  b.total_balance as balance from account_codes a left join (select id, primary_acc_code_id, total_balance, ulb_id from balance_trackings where id in (select max(id) from balance_trackings where ulb_id=${ulb_id} and created_at between ${year_start} and ${year_end} group by primary_acc_code_id)) b on a.id = b.primary_acc_code_id order by a.code`;
      return generateRes(data);


  }



  extractRemissions = async (records: GeneralLedgerData[]) => {

    let remissions_index = -1;
    for (let i = 0; i < records.length; i++) {
      if (records[i].description.toLowerCase().indexOf("remission") != -1) {
        remissions_index = i;
      }
    }

    if (remissions_index != -1) {
      console.log("remissions_index: " + remissions_index);
      const remission = records[remissions_index];
      records.splice(remissions_index);
      return remission;
    }

    return null;
  }


  getScheduleDetails = async (scheduleID: number, ulbID: number, year: number, startDate: Date, endDate: Date) => {

    const general_ledgers =  await prisma.$queryRaw<GeneralLedgerData[]>`
    select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance, b.created_at from account_codes a left join
    
    (select id, primary_acc_code_id, total_balance, created_at from balance_trackings where id in 
        (select max(id) from balance_trackings c where ulb_id = ${ulbID} and c.created_at between ${startDate} and ${endDate} group by primary_acc_code_id)) b
    
    on a.id = b.primary_acc_code_id
    where a.parent_id=${scheduleID} order by a.code`;

    let data = {};
    if (general_ledgers) {
      const remission = await this.extractRemissions(general_ledgers);
      if (remission) {
        data = {
          year: year,
          general_ledgers: general_ledgers,
          remissions: remission
        };

      } else {
        data = {
          year: year,
          general_ledgers: general_ledgers
        };
      }
    }
    return data;
  }


  getScheduleReport = async (scheduleID: number, ulbID: number,  year: number) => {
    
    const current_year = year;
    console.log(ulbID, year);
    // const boundary_date = new Date(`${current_year}-03-31`);


    // if (date_today <= boundary_date) {
    //   current_year--;
    // }

    const current_year_start = new Date(`${current_year}-04-01`);
    const current_year_end = new Date(`${current_year + 1}-03-31`);

    const prev_year_start = new Date(`${current_year - 1}-04-01`);
    const prev_year_end = new Date(`${current_year}-03-31`);


    // fetch current year final amount of the schedule
    const scheduleRecords = await prisma.$queryRaw<account_codes[]>`select a.id, a.code, a.parent_id, a.code_type_id, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join balance_trackings b on a.id = b.primary_acc_code_id where b.ulb_id = ${ulbID} and a.id=${scheduleID} and b.created_at between ${current_year_start} and ${current_year_end} order by b.id desc limit 1`;

    console.log(scheduleRecords);

    // console.log(scheduleRecords);
    if (scheduleRecords.length == 0 || scheduleRecords[0].code_type_id !== CodeType.Schedule) {
      return Promise<any>;
    }
    const scheduleRecord = scheduleRecords[0];


    // fetch previous year final amount of the schedule

    const scheduleRecordsPrevYear = await prisma.$queryRaw<account_codes[]>`select b.total_balance as prev_balance from account_codes a left join balance_trackings b on a.id = b.primary_acc_code_id where a.id=${scheduleID} and b.ulb_id = ${ulbID} and b.created_at between ${prev_year_start} and ${prev_year_end} order by b.id desc limit 1`;

    // console.log(scheduleRecords);
    if (scheduleRecordsPrevYear.length == 0) {
      return Promise<object>;
    }
    const scheduleRecordPrevYear = scheduleRecordsPrevYear[0];


    // const fin_year_records_test = await prisma.$queryRaw<GeneralLedgerData[]>`(select max(id) from balance_trackings where created_at between ${current_year_start} and ${current_year_end} group by primary_acc_code_id)`;

    // console.log(fin_year_records_test);

    const currentYearData = await this.getScheduleDetails(scheduleID, ulbID, current_year,  current_year_start, current_year_end);
    const  prevYearData = await this.getScheduleDetails(scheduleID, ulbID, current_year-1, prev_year_start, prev_year_end);


    const ulbInfos: any [] = await prisma.$queryRaw`select * from municipality_codes where id=${ulbID}`;
    const ulbInfo = ulbInfos[0];

    const data = {
      ulb: ulbInfo.ulbs,
      ...scheduleRecord, 
      ...scheduleRecordPrevYear, 
      current_year: currentYearData, 
      prev_year: prevYearData
    };

    console.log(data);

    
    console.log(ulbInfo);

    return generateRes(data);
  }



  getGeneralLedgerReport = async (generalLedgerID: number, ulbID: number,  year: number) => {

    const year_start = new Date(`${year}-04-01`);
    const year_end = new Date(`${year + 1}-03-31`);

    const generalLedgers = await prisma.$queryRaw<account_codes[]>`select a.id, a.code, a.parent_id, a.code_type_id, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join balance_trackings b on a.id = b.primary_acc_code_id where a.id=${generalLedgerID} and b.ulb_id=${ulbID} and b.created_at between ${year_start} and ${year_end} order by b.id desc limit 1`;

    // console.log(scheduleRecords);
    if (generalLedgers.length == 0 || generalLedgers[0].code_type_id !== CodeType.GeneralLedger) {
      return Promise<object>;
    }

    const generalLedger = generalLedgers[0];

    const ledgers = await prisma.$queryRaw<[GeneralLedgerData]>`select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join (select id, primary_acc_code_id, total_balance, x.created_at from balance_trackings x where id in (select max(id) from balance_trackings  where ulb_id=${ulbID} and created_at between ${year_start} and ${year_end} group by primary_acc_code_id)) b on a.id = b.primary_acc_code_id where a.parent_id=${generalLedgerID} order by a.code`;


    const data = {
      ...generalLedger,
      ledgers: ledgers,
    };

    return generateRes(data);
  }


  getFinYears = async () => {
    const data = [
      {id: 2024, name: "2024"},
      {id: 2023, name: "2023"},
      {id: 2022, name: "2022"},
      {id: 2021, name: "2021"},
    ]

    return generateRes(data);
  }

  updateBalances = async (ulbId: number, accountingCodeId: number, amount: number) => {
    const ledgerRecords = await prisma.$queryRaw<account_codes[]>`select * from account_codes where id=${accountingCodeId}`;
    if(ledgerRecords.length>0){
      const ledgerRecord = ledgerRecords[0];
      console.log(ledgerRecord);
      
      if(ledgerRecord.code_type_id == AccountingCodeType.Schedule){
        console.log("It is a schedule");
      }else if(ledgerRecord.code_type_id == AccountingCodeType.GeneralLedger){
        console.log("it is a general ledger");
      }else if(ledgerRecord.code_type_id == AccountingCodeType.Ledger){
        console.log("It is a ledger");

        // know the general ledger it belongs to
        const generalLedgerRecords = await prisma.$queryRaw<account_codes[]>`select * from account_codes where id=${ledgerRecord.parent_id}`;

        const generalLedgerRecord = generalLedgerRecords[0];

        console.log("Parent general ledger: ", generalLedgerRecord);



        // know the schedule it belongs to

        const scheduleRecords = await prisma.$queryRaw<account_codes[]>`select * from account_codes where id=${generalLedgerRecord.parent_id}`;

        const scheduleRecord = scheduleRecords[0];

        console.log("Schedule record: ", scheduleRecord);


        // get the balances
        const ledgerLatestBalances = await prisma.$queryRaw<balance_trackings[]>`select * from balance_trackings 
        where ulb_id=${ulbId} and primary_acc_code_id = ${accountingCodeId} order by id desc limit 1;`;

        const ledgerLatestBalance = ledgerLatestBalances[0];
        console.log("ledger latest balance: ", ledgerLatestBalance);


        const generalLedgerLatestBalances = await prisma.$queryRaw<balance_trackings[]>`select * from balance_trackings
        where ulb_id=${ulbId} and primary_acc_code_id = ${generalLedgerRecord.id} order by id desc limit 1;`;

        const generalLedgerLatestBalance = generalLedgerLatestBalances[0];
        console.log("general ledger latest balance: ", generalLedgerLatestBalance);


        const scheduleBalances = await prisma.$queryRaw<balance_trackings[]>`select * from balance_trackings
        where ulb_id=${ulbId} and primary_acc_code_id = ${scheduleRecord.id} order by id desc limit 1;`;

      const scheduleBalance = scheduleBalances[0];
        console.log("schedule balance: ", scheduleBalance);


        // update balances
        
        // update ledger balance
        const amountWithoutSign = Math.abs(amount);

        const record1 = await prisma.balance_trackings.create({
          data: {
            primary_acc_code_id: accountingCodeId,
            debit_balance: amount<0?ledgerLatestBalance.debit_balance + amountWithoutSign: ledgerLatestBalance.debit_balance,
            credit_balance: amount>0?ledgerLatestBalance.credit_balance + amountWithoutSign: ledgerLatestBalance.credit_balance, 
            total_balance: ledgerLatestBalance.total_balance + amount ,
            ulb_id: ulbId, 
          }
        });

        console.log("updated ledger record: ", record1);

        // update general ledger balance
        const record2 = await prisma.balance_trackings.create({
          data: {
            primary_acc_code_id: generalLedgerRecord.id,
            debit_balance: amount<0?generalLedgerLatestBalance.debit_balance + amountWithoutSign: generalLedgerLatestBalance.debit_balance,
            credit_balance: amount>0?generalLedgerLatestBalance.credit_balance + amountWithoutSign: generalLedgerLatestBalance.credit_balance,
            total_balance: generalLedgerLatestBalance.total_balance + amount,
            ulb_id: ulbId, 
          }
        });
        console.log("updated general ledger record: " , record2);

        // update schedule balance
        const record3 = await prisma.balance_trackings.create({
          data: {
            primary_acc_code_id: scheduleRecord.id,
            debit_balance: amount<0?scheduleBalance.debit_balance + amountWithoutSign: scheduleBalance.debit_balance,
            credit_balance: amount>0?scheduleBalance.credit_balance + amountWithoutSign: scheduleBalance.credit_balance,
            total_balance: scheduleBalance.total_balance + amount,
            ulb_id: ulbId, 
          }
        });
        console.log("updated schedule record: " , record3);


      }

    


    }else{
      console.log("No matching records");
    }
  }

  getYearBound = (year: number): [Date, Date] => {
    return [new Date(`${year}-04-01`), new Date(`${year + 1}-03-31`)];
}


  getTrialBalance = async (ulbId: number, finYear: number): Promise<[]> => {

    const [year_start, year_end] = this.getYearBound(finYear);

    const data = await prisma.$queryRaw<[]>`
    
    select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance,
    b.debit_balance, b.credit_balance from account_codes a
    
    left join (
      select id, primary_acc_code_id, total_balance, debit_balance, credit_balance, x.created_at from balance_trackings x where id in (
        select max(id) from balance_trackings  where ulb_id=${ulbId} and created_at between ${year_start} and ${year_end} group by primary_acc_code_id
      )
    ) b 
    on a.id = b.primary_acc_code_id where a.code_type_id = ${CodeType.Schedule} order by a.code`;

    return data;
  }




  getIncomeStatementDataOfAnYear = async (ulbId: number, finYear: number): Promise<[]> => {

    const [year_start, year_end] = this.getYearBound(finYear);

    const scheduleList = [
      'I-1', 'I-2', 'I-3', 'I-4', 'I-5',
      'I-6', 'I-7', 'I-8', 'I-9', 'I-10',
      'I-11', 'I-12', 'I-13', 'I-14', 'I-15', 
      'I-16', 'I-17', 'I-18', 'I-19', 'I-20'
    ];
    const data = await prisma.$queryRaw<[]>`
    
    select a.id, a.schedule_ref_no, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance,
    b.debit_balance, b.credit_balance from account_codes a
    
    left join (
      select id, primary_acc_code_id, total_balance, debit_balance, credit_balance, x.created_at from balance_trackings x where id in (
        select max(id) from balance_trackings  where ulb_id=${ulbId} and created_at between ${year_start} and ${year_end} group by primary_acc_code_id
      )
    ) b 
    on a.id = b.primary_acc_code_id where a.schedule_ref_no in (${Prisma.join(scheduleList)}) order by a.code`;

    return data;
  }

  getIncomeStatementData = async (ulbId: number, finYear: number): Promise<any> => {
    return {
      selectedYear: await this.getIncomeStatementDataOfAnYear(ulbId, finYear),
      prevYear: await this.getIncomeStatementDataOfAnYear(ulbId, finYear-1)
    };
  }


  getBalanceSheetDataOfAnYear = async (ulbId: number, finYear: number): Promise<[]> => {

    const [year_start, year_end] = this.getYearBound(finYear);

    const scheduleList = [
      'B-1', 'B-2', 'B-3', 'B-4', 'B-7', 'B-8',
      'B-9', 'B-10', 'B-11', 'B-12', 'B-13', 'B-14',
      'B-15', 'B-16', 'B-17', 'B-18', 'B-19', 'B-20'
    ];
    const data = await prisma.$queryRaw<[]>`
    
    select a.id, a.schedule_ref_no, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance,
    b.debit_balance, b.credit_balance from account_codes a
    
    left join (
      select id, primary_acc_code_id, total_balance, debit_balance, credit_balance, x.created_at from balance_trackings x where id in (
        select max(id) from balance_trackings  where ulb_id=${ulbId} and created_at between ${year_start} and ${year_end} group by primary_acc_code_id
      )
    ) b 
    on a.id = b.primary_acc_code_id where a.schedule_ref_no in (${Prisma.join(scheduleList)}) order by a.code`;

    return data;
  }

  getBalanceSheetData = async (ulbId: number, finYear: number): Promise<any> => {
    return {
      selectedYear: await this.getBalanceSheetDataOfAnYear(ulbId, finYear),
      prevYear: await this.getBalanceSheetDataOfAnYear(ulbId, finYear-1)
    };
  }




}

export default BalanceTrackingsDao;
