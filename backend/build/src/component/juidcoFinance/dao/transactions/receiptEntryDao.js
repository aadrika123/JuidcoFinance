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
const client_1 = require(".prisma/client");
const generateRes_1 = require("../../../../util/generateRes");
const receiptEntryValidation_1 = require("../../requests/transactions/receiptEntryValidation");
/**
 * | Author- Bijoy Paitandi
 * | Created On- 31-01-2024
 * | Created for- Receipt Entry
 * | Status: open
 */
const prisma = new client_1.PrismaClient();
class ReceiptEntryDao {
    constructor() {
        // store payment entry details in DB
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.receipt_entries.createMany({
                data: (0, receiptEntryValidation_1.multiRequestData)(req),
            });
        });
        // get all receipt data
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            const skip = (page - 1) * limit;
            let order = Number(req.query.order);
            if (order != -1 && order != 1) {
                order = 1;
            }
            const query = {
                orderBy: [
                    { updated_at: order == -1 ? "desc" : "asc" }
                ],
                skip: skip,
                take: limit,
                select: {
                    id: true,
                    date: true,
                    email: true,
                    receipt_no: true,
                    module: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    receipt_type: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    admin_ward: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    subledger: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    paid_by: true,
                    mobile_no: true,
                    narration: true,
                    amount: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            if (search !== "undefined" && search !== "") {
                query.where = {
                    OR: [
                        { email: { contains: search, mode: "insensitive" }, },
                        { paid_by: { contains: search, mode: "insensitive" }, },
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.receipt_entries.findMany(query),
                prisma.receipt_entries.count({ where: query.where })
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        //get single receipt data by ID
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                select: {
                    id: true,
                    date: true,
                    email: true,
                    receipt_no: true,
                    module: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    receipt_type: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    admin_ward: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    subledger: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    paid_by: true,
                    mobile_no: true,
                    narration: true,
                    amount: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            const data = yield prisma.receipt_entries.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update receipt entry details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.receipt_entries.update({
                where: {
                    id: id,
                },
                data: (0, receiptEntryValidation_1.requestData)(req),
            });
        });
    }
}
exports.default = ReceiptEntryDao;
