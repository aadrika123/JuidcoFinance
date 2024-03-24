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
const billPaymentEntryValidation_1 = require("../../requests/transactions/billPaymentEntryValidation");
const billPaymentEntryValidation_2 = require("../../requests/transactions/billPaymentEntryValidation");
const prisma = new client_1.PrismaClient();
class BillPaymentEntryDao {
    constructor() {
        // store payment entry details in DB
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            const data = (0, billPaymentEntryValidation_2.multiRequestData)(req);
            data.forEach(item => {
                item['earlier_payment'] = 10;
                item['payable_amount'] = 10;
                item['net_amount'] = 20;
            });
            return yield prisma.bill_payment_entries.createMany({
                data: data,
            });
        });
        // Get limited bill payment entry
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
                    vendor: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    bill_no: true,
                    bill_entry_date: true,
                    payee: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    bill_type: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    department: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    bill_amount: true,
                    is_approved: true,
                    earlier_payment: true,
                    payable_amount: true,
                    deductions_amount: true,
                    net_amount: true
                },
            };
            if (search !== "undefined" && search !== "") {
                query.where = {
                    OR: [
                        {
                            payee: {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                        {
                            bill_type: {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.bill_payment_entries.findMany(query),
                prisma.bill_payment_entries.count({ where: query.where }),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        // Get single bill payment entry details
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                select: {
                    id: true,
                    vendor: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    bill_no: true,
                    bill_entry_date: true,
                    payee: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    bill_type: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    department: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    adminis_ward: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    address: true,
                    bill_amount: true,
                    advance: true,
                    deposit: true,
                    deductions_amount: true
                },
            };
            const data = yield prisma.bill_payment_entries.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update bill payment entry details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.bill_payment_entries.update({
                where: {
                    id: id,
                },
                data: (0, billPaymentEntryValidation_1.requestData)(req),
            });
        });
        //////
    }
}
exports.default = BillPaymentEntryDao;
