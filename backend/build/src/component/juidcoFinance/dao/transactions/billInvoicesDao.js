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
const billInvoicesValidation_1 = require("../../requests/transactions/billInvoicesValidation");
const prisma = new client_1.PrismaClient();
class BillInvoicesDao {
    constructor() {
        // store
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.bill_invoices.createMany({
                data: (0, billInvoicesValidation_1.multiRequestData)(req),
            });
        });
        // Get limited bill invoices
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
                    bill_no: true,
                    vendor: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    department: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    bill_date: true,
                    entry_date: true,
                    bill_stage: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    type: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    address: true,
                    amount: true,
                    narration: true,
                    admin_ward: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    is_authorized: true
                },
            };
            if (search !== "undefined" && search !== "") {
                query.where = {
                    OR: [
                        {
                            vendor: {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                        {
                            department: {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        }
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.bill_invoices.findMany(query),
                prisma.bill_invoices.count({ where: query.where }),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        // Get single payment entry details
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                select: {
                    id: true,
                    bill_no: true,
                    vendor: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    department: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    bill_date: true,
                    entry_date: true,
                    bill_stage: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    type: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    address: true,
                    amount: true,
                    narration: true,
                    admin_ward: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    is_authorized: true
                },
            };
            const data = yield prisma.bill_invoices.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update payment entry details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.bill_invoices.update({
                where: {
                    id: id,
                },
                data: (0, billInvoicesValidation_1.requestData)(req),
            });
        });
        //////
    }
}
exports.default = BillInvoicesDao;
