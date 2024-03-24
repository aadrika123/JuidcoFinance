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
const receiptBudgetsValidation_1 = require("../../requests/budgeting/receiptBudgetsValidation");
const receiptBudgetsValidation_2 = require("../../requests/documentation/receiptBudgetsValidation");
/**
 * | Author- Bijoy Paitandi
 * | Created for- receipt_budgets Dao
 * | Status: open
 */
const prisma = new client_1.PrismaClient();
class ReceiptBudgetsDao {
    constructor() {
        // store
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.receipt_budgets.createMany({
                data: (0, receiptBudgetsValidation_1.multiRequestData)(req),
            });
        });
        // Get limited receipt_budgets
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            let order = Number(req.query.order);
            if (order != -1 && order != 1) {
                order = 1;
            }
            const query = {
                orderBy: [
                    { updated_at: order == -1 ? "desc" : "asc" }
                ],
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    fin_year: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    primary_acc_code: {
                        select: {
                            id: true,
                            code: true
                        },
                    },
                    amount: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            if (search !== "undefined" && search !== "") {
                query.where = {
                    OR: [
                        {
                            fin_year: {
                                name: {
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
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.receipt_budgets.findMany(query),
                prisma.receipt_budgets.count({ where: query.where }),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        // Get single payment entry details
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                select: {
                    id: true,
                    fin_year: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    primary_acc_code: {
                        select: {
                            id: true,
                            code: true
                        },
                    },
                    amount: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            const data = yield prisma.receipt_budgets.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update receipt_budgets details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.receipt_budgets.update({
                where: {
                    id: id,
                },
                data: (0, receiptBudgetsValidation_2.requestData)(req),
            });
        });
        //////
    }
}
exports.default = ReceiptBudgetsDao;
