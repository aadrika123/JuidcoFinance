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
const voucherEntryValidation_1 = require("../../requests/documentation/voucherEntryValidation");
const prisma = new client_1.PrismaClient();
class VoucherEntryDao {
    constructor() {
        // store voucher entries on db;
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.voucher_entries.createMany({
                data: (0, voucherEntryValidation_1.multiRequestData)(req),
            });
        });
        // get limited voucher entries
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
                    voucher_no: true,
                    voucher_date: true,
                    voucher_type: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    narration: true,
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
                    voucher_sub_type: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    sub_ledger: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    amount: true,
                    dr_cr: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            if (search !== "undefined" && search !== "") {
                query.where = {
                    OR: [
                        {
                            voucher_type: {
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
                prisma.voucher_entries.findMany(query),
                prisma.voucher_entries.count({ where: query.where }),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        // get single voucher entries
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                select: {
                    id: true,
                    voucher_no: true,
                    voucher_date: true,
                    voucher_type: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    narration: true,
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
                    voucher_sub_type: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    sub_ledger: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    amount: true,
                    dr_cr: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            const data = prisma.voucher_entries.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // update voucher details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.voucher_entries.update({
                where: {
                    id: id,
                },
                data: (0, voucherEntryValidation_1.requestData)(req),
            });
        });
        this.getVoucherNumber = () => __awaiter(this, void 0, void 0, function* () {
            const query = {
                select: {
                    id: true,
                    voucher_no: true,
                },
            };
            const data = prisma.voucher_entries.findMany(query);
            return (0, generateRes_1.generateRes)(data);
        });
    }
}
exports.default = VoucherEntryDao;
