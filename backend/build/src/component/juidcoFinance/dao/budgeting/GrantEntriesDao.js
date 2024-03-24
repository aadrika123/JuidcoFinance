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
const grantEntriesValidation_1 = require("../../requests/budgeting/grantEntriesValidation");
/**
 * | Author- Bijoy Paitandi
 * | Created for- grant_entries Dao
 * | Status: open
 */
const prisma = new client_1.PrismaClient();
class GrantEntriesDao {
    constructor() {
        // store
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.grant_entries.createMany({
                data: (0, grantEntriesValidation_1.multiRequestData)(req),
            });
        });
        // Get limited grant_entries
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            const query = {
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
                    grant: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    sanction_number: true,
                    grant_nature: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    grant_from_date: true,
                    grant_to_date: true,
                    sanctioned_amount: true,
                    advance_rcving_date: true,
                    advance_amount: true,
                    expenditure_date: true,
                    voucher: {
                        select: {
                            id: true,
                            voucher_no: true
                        },
                    },
                    expndtre_nature: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    blnce_trckng: {
                        select: {
                            id: true,
                            total_balance: true
                        },
                    },
                    refund_date: true,
                    refund_amount: true,
                    employee: {
                        select: {
                            id: true,
                            name: true,
                            designation: true,
                        },
                    },
                    signature: true,
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
                            grant: {
                                name: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                        {
                            grant_nature: {
                                name: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                        {
                            voucher: {
                                narration: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                        {
                            expndtre_nature: {
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
                prisma.grant_entries.findMany(query),
                prisma.grant_entries.count({ where: query.where }),
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
                    grant: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    sanction_number: true,
                    grant_nature: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    grant_from_date: true,
                    grant_to_date: true,
                    sanctioned_amount: true,
                    advance_rcving_date: true,
                    advance_amount: true,
                    expenditure_date: true,
                    voucher: {
                        select: {
                            id: true,
                            voucher_no: true
                        },
                    },
                    expndtre_nature: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    blnce_trckng: {
                        select: {
                            id: true,
                            total_balance: true
                        },
                    },
                    refund_date: true,
                    refund_amount: true,
                    employee: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    signature: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            const data = yield prisma.grant_entries.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update grant_entries details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.grant_entries.update({
                where: {
                    id: id,
                },
                data: (0, grantEntriesValidation_1.requestData)(req),
            });
        });
        //////
    }
}
exports.default = GrantEntriesDao;
