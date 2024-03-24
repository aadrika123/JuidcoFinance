"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const generateRes_1 = require("../../../../util/generateRes");
const balanceTrackingsValidation_1 = require("../../requests/budgeting/balanceTrackingsValidation");
/**
 * | Author- Bijoy Paitandi
 * | Created for- balance_trackings Dao
 * | Status: open
 */
const prisma = new client_1.PrismaClient();
var CodeType;
(function (CodeType) {
    CodeType[CodeType["Schedule"] = 1] = "Schedule";
    CodeType[CodeType["GeneralLedger"] = 2] = "GeneralLedger";
    CodeType[CodeType["Ledger"] = 3] = "Ledger";
})(CodeType || (CodeType = {}));
class BalanceTrackingsDao {
    constructor() {
        // store
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.balance_trackings.createMany({
                data: (0, balanceTrackingsValidation_1.multiRequestData)(req),
            });
        });
        // Get limited balance_trackings
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            const query = {
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
            const [data, count] = yield prisma.$transaction([
                prisma.balance_trackings.findMany(query),
                prisma.balance_trackings.count({ where: query.where }),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        // Get single payment entry details
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
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
            const data = yield prisma.balance_trackings.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        this.getBalance = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { primary_acc_code_id: id },
                select: {
                    id: true,
                    total_balance: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            const data = yield prisma.balance_trackings.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        this.getLatestBalances = (req) => __awaiter(this, void 0, void 0, function* () {
            const search = String(req.query.search);
            if (search !== "undefined" && search !== "") {
                const searchCriteria = `%${search}%`;
                const data = yield prisma.$queryRaw `select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join (select id, primary_acc_code_id, total_balance from balance_trackings where id in (select max(id) from balance_trackings group by primary_acc_code_id)) b on a.id = b.primary_acc_code_id where a.description like ${searchCriteria}`;
                return (0, generateRes_1.generateRes)(data);
            }
            else {
                const data = yield prisma.$queryRaw `select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join (select id, primary_acc_code_id, total_balance from balance_trackings where id in (select max(id) from balance_trackings group by primary_acc_code_id)) b on a.id = b.primary_acc_code_id`;
                return (0, generateRes_1.generateRes)(data);
            }
        });
        this.extractRemissions = (records) => __awaiter(this, void 0, void 0, function* () {
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
        });
        this.getScheduleDetails = (scheduleID, startDate, endDate) => __awaiter(this, void 0, void 0, function* () {
            const general_ledgers = yield prisma.$queryRaw `
    select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance, b.created_at from account_codes a left join
    
    (select id, primary_acc_code_id, total_balance, created_at from balance_trackings where id in 
        (select max(id) from balance_trackings c where c.created_at between ${startDate} and ${endDate} group by primary_acc_code_id)) b
    
    on a.id = b.primary_acc_code_id
    where a.parent_id=${scheduleID}`;
            let data = {};
            if (general_ledgers) {
                const remission = yield this.extractRemissions(general_ledgers);
                if (remission) {
                    data = {
                        general_ledgers: general_ledgers,
                        remissions: remission
                    };
                }
                else {
                    data = {
                        general_ledgers: general_ledgers
                    };
                }
            }
            return data;
        });
        this.getScheduleReport = (scheduleID) => __awaiter(this, void 0, void 0, function* () {
            const date_today = new Date();
            let current_year = date_today.getFullYear();
            const boundary_date = new Date(`${current_year}-03-31`);
            if (date_today <= boundary_date) {
                current_year--;
            }
            const current_year_start = new Date(`${current_year}-04-01`);
            const current_year_end = new Date(`${current_year + 1}-03-30`);
            const prev_year_start = new Date(`${current_year - 1}-04-01`);
            const prev_year_end = new Date(`${current_year}-03-30`);
            // fetch current year final amount of the schedule
            const scheduleRecords = yield prisma.$queryRaw `select a.id, a.code, a.parent_id, a.code_type_id, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join balance_trackings b on a.id = b.primary_acc_code_id where a.id=${scheduleID} and b.created_at between ${current_year_start} and ${current_year_end} order by b.id desc limit 1`;
            // console.log(scheduleRecords);
            if (scheduleRecords.length == 0 || scheduleRecords[0].code_type_id !== CodeType.Schedule) {
                return Promise;
            }
            const scheduleRecord = scheduleRecords[0];
            // fetch previous year final amount of the schedule
            const scheduleRecordsPrevYear = yield prisma.$queryRaw `select b.total_balance as prev_balance from account_codes a left join balance_trackings b on a.id = b.primary_acc_code_id where a.id=${scheduleID} and b.created_at between ${prev_year_start} and ${prev_year_end} order by b.id desc limit 1`;
            // console.log(scheduleRecords);
            if (scheduleRecordsPrevYear.length == 0) {
                return Promise;
            }
            const scheduleRecordPrevYear = scheduleRecordsPrevYear[0];
            // const fin_year_records_test = await prisma.$queryRaw<GeneralLedgerData[]>`(select max(id) from balance_trackings where created_at between ${current_year_start} and ${current_year_end} group by primary_acc_code_id)`;
            // console.log(fin_year_records_test);
            const currentYearData = yield this.getScheduleDetails(scheduleID, current_year_start, current_year_end);
            const prevYearData = yield this.getScheduleDetails(scheduleID, prev_year_start, prev_year_end);
            const data = Object.assign(Object.assign(Object.assign({}, scheduleRecord), scheduleRecordPrevYear), { current_year: currentYearData, prev_year: prevYearData });
            return (0, generateRes_1.generateRes)(data);
        });
        this.getGeneralLedgerReport = (generalLedgerID) => __awaiter(this, void 0, void 0, function* () {
            const generalLedgers = yield prisma.$queryRaw `select a.id, a.code, a.parent_id, a.code_type_id, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join balance_trackings b on a.id = b.primary_acc_code_id where a.id=${generalLedgerID} order by b.id desc limit 1`;
            // console.log(scheduleRecords);
            if (generalLedgers.length == 0 || generalLedgers[0].code_type_id !== CodeType.GeneralLedger) {
                return Promise;
            }
            const generalLedger = generalLedgers[0];
            const ledgers = yield prisma.$queryRaw `select a.id, a.code, a.code_type_id as code_type, a.major_head, a.minor_head, a.detail_code, a.description, b.total_balance as balance from account_codes a left join (select id, primary_acc_code_id, total_balance, x.created_at from balance_trackings x where id in (select max(id) from balance_trackings group by primary_acc_code_id)) b on a.id = b.primary_acc_code_id where a.parent_id=${generalLedgerID}`;
            const data = Object.assign(Object.assign({}, generalLedger), { ledgers: ledgers });
            return (0, generateRes_1.generateRes)(data);
        });
        //////
    }
}
exports.default = BalanceTrackingsDao;
