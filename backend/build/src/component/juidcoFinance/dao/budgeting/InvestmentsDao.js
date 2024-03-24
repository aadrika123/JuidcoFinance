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
const investmentsValidation_1 = require("../../requests/budgeting/investmentsValidation");
/**
 * | Author- Bijoy Paitandi
 * | Created for- investments Dao
 * | Status: open
 */
const prisma = new client_1.PrismaClient();
class InvestmentsDao {
    constructor() {
        // store
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.investments.createMany({
                data: (0, investmentsValidation_1.multiRequestData)(req),
            });
        });
        // Get limited investments
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            let order = Number(req.query.order);
            if (order != -1 && order != 1) {
                order = 1;
            }
            const query = {
                orderBy: [{ updated_at: order == -1 ? "desc" : "asc" }],
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    ulb: {
                        select: {
                            id: true,
                            code: true
                        },
                    },
                    primary_acc_code: {
                        select: {
                            id: true,
                            code: true
                        },
                    },
                    investment_no: true,
                    authorization_date: true,
                    investment_date: true,
                    particulars: true,
                    investment_type: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    purchase_amount: true,
                    face_value_amount: true,
                    interest_due_date: true,
                    interest_due_amount: true,
                    employee: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    interest_recovered_amount: true,
                    interest_recovery_date: true,
                    acc_adj_recovery_date: true,
                    realization_final_amount: true,
                    realization_date: true,
                    acc_adj_realization_date: true,
                    remarks: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            if (search !== "undefined" && search !== "") {
                query.where = {
                    OR: [
                        {
                            ulb: {
                                code: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                        {
                            primary_acc_code: {
                                code: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                        {
                            investment_type: {
                                name: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                        {
                            employee: {
                                name: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.investments.findMany(query),
                prisma.investments.count({ where: query.where }),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        // Get single payment entry details
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                select: {
                    id: true,
                    ulb: {
                        select: {
                            id: true,
                            code: true
                        },
                    },
                    primary_acc_code: {
                        select: {
                            id: true,
                            code: true
                        },
                    },
                    investment_no: true,
                    authorization_date: true,
                    investment_date: true,
                    particulars: true,
                    investment_type: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    purchase_amount: true,
                    face_value_amount: true,
                    interest_due_date: true,
                    interest_due_amount: true,
                    employee: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    interest_recovered_amount: true,
                    interest_recovery_date: true,
                    acc_adj_recovery_date: true,
                    realization_final_amount: true,
                    realization_date: true,
                    acc_adj_realization_date: true,
                    remarks: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            const data = yield prisma.investments.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update investments details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.investments.update({
                where: {
                    id: id,
                },
                data: (0, investmentsValidation_1.requestData)(req),
            });
        });
        //////
    }
}
exports.default = InvestmentsDao;
