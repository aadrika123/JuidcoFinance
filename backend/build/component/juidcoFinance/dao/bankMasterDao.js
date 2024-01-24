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
const bankMasterValidation_1 = require("../requests/bankMasterValidation");
const prisma = new client_1.PrismaClient();
class BankMasterDao {
    constructor() {
        // store bank details in DB
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.bank_masters.create({
                data: (0, bankMasterValidation_1.requestData)(req),
            });
        });
        // Get limited bank master
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            const query = {
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    bank_name: true,
                    ifsc_code: true,
                    branch: true,
                },
            };
            if (search !== "undefined") {
                query.where = {
                    OR: [
                        {
                            bank_name: {
                                equals: search,
                                mode: "insensitive",
                            },
                        },
                        { ifsc_code: { equals: search, mode: "insensitive" } }
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.bank_masters.findMany(query),
                prisma.bank_masters.count({ where: query.where }),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        // Get single bank details
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                select: {
                    id: true,
                    bank_name: true,
                    ifsc_code: true,
                    branch: true,
                    micr_code: true,
                    branch_address: true,
                    branch_city: true,
                    branch_state: true,
                    branch_district: true,
                    email: true,
                    contact_no: true,
                    contact_person_name: true,
                },
            };
            const data = yield prisma.bank_masters.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update bank details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.bank_masters.update({
                where: {
                    id: id,
                },
                data: (0, bankMasterValidation_1.requestData)(req),
            });
        });
        // Search bank details
        this.search = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            const query = {
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    OR: [
                        {
                            bank_name: {
                                equals: search,
                                mode: "insensitive",
                            },
                        },
                        { ifsc_code: { equals: search, mode: "insensitive" } }
                    ],
                },
                select: {
                    id: true,
                    bank_name: true,
                    ifsc_code: true,
                    branch: true,
                },
            };
            const [data, count] = yield prisma.$transaction([
                prisma.bank_masters.findMany(query),
                prisma.bank_masters.count({
                    where: query.where,
                }),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        //////
    }
}
exports.default = BankMasterDao;
