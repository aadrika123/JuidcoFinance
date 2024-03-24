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
const chequeIssuancesValidation_1 = require("../../requests/documentation/chequeIssuancesValidation");
/**
 * | Author- Bijoy Paitandi
 * | Created for- cheque_issuances Dao
 * | Status: open
 */
const prisma = new client_1.PrismaClient();
class ChequeIssuancesDao {
    constructor() {
        // store
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.cheque_issuances.createMany({
                data: (0, chequeIssuancesValidation_1.multiRequestData)(req),
            });
        });
        // Get limited cheque_issuances
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
                    voucher_no: true,
                    voucher_date: true,
                    bill_type: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    narration: true,
                    admin_ward: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    payee: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    grant: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    bank: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    module: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    issue_date: true,
                    cheque_no: true,
                    amount: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            if (search !== "undefined" && search !== "") {
                query.where = {
                    OR: [
                        {
                            bill_type: {
                                name: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                        {
                            admin_ward: {
                                name: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                        {
                            payee: {
                                name: {
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
                            bank: {
                                name: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                        {
                            module: {
                                name: {
                                    contains: search, mode: "insensitive",
                                },
                            },
                        },
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.cheque_issuances.findMany(query),
                prisma.cheque_issuances.count({ where: query.where }),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        // Get single payment entry details
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                select: {
                    id: true,
                    voucher_no: true,
                    voucher_date: true,
                    bill_type: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    narration: true,
                    admin_ward: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    payee: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    grant: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    bank: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    module: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    issue_date: true,
                    cheque_no: true,
                    amount: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            const data = yield prisma.cheque_issuances.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update cheque_issuances details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.cheque_issuances.update({
                where: {
                    id: id,
                },
                data: (0, chequeIssuancesValidation_1.requestData)(req),
            });
        });
        //////
    }
}
exports.default = ChequeIssuancesDao;
