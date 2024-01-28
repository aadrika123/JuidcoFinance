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
const generateRes_1 = require("../../../util/generateRes");
const dirPaymentEntryValidation_1 = require("../requests/dirPaymentEntryValidation");
const prisma = new client_1.PrismaClient();
class DirPaymentEntryDao {
    constructor() {
        // store payment entry details in DB
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.dir_payment_entries.create({
                data: (0, dirPaymentEntryValidation_1.requestData)(req),
            });
        });
        // Get limited payment entry
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            const query = {
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    payment_no: true,
                    payment_date: true,
                    amount: true,
                    payee_name: true,
                    payment_type: {
                        select: {
                            id: true,
                            type: true,
                        },
                    },
                },
            };
            if (search !== "undefined" && search !== "") {
                query.where = {
                    OR: [
                        {
                            payee_name: {
                                equals: search,
                                mode: "insensitive",
                            },
                        },
                        { payment_no: { equals: Number(search) } },
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.dir_payment_entries.findMany(query),
                prisma.dir_payment_entries.count({ where: query.where }),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        // Get single payment entry details
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                select: {
                    id: true,
                    payment_no: true,
                    payment_date: true,
                    amount: true,
                    payee_name: true,
                    payment_type: {
                        select: {
                            id: true,
                            type: true,
                        },
                    },
                    narration: true,
                    grant: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    user_common_budget: true,
                    adminis_ward: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    address: true,
                    department: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    email: true,
                    payment_mode: true,
                },
            };
            const data = yield prisma.dir_payment_entries.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update payment entry details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.dir_payment_entries.update({
                where: {
                    id: id,
                },
                data: (0, dirPaymentEntryValidation_1.requestData)(req),
            });
        });
        //////
    }
}
exports.default = DirPaymentEntryDao;
