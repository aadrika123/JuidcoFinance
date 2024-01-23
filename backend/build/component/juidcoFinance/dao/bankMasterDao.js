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
const prisma = new client_1.PrismaClient();
class BankMasterDao {
    constructor() {
        // store bank details in DB
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            const requestData = {
                bank_name: req.body.bankName,
                ifsc_code: req.body.ifscCode,
                branch: req.body.branch,
                micr_code: req.body.micrCode,
                branch_address: req.body.branchAddress,
                branch_city: req.body.branchCity,
                branch_state: req.body.branchState,
                branch_district: req.body.branchDistrict,
                email: req.body.email,
                contact_no: req.body.contactNo,
                contact_person_name: req.body.contactPersonName,
            };
            return yield prisma.bank_masters.create({
                data: requestData,
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
            return {
                currentPage: page,
                count,
                totalPage: Math.ceil(count / limit),
                data,
            };
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
            return yield prisma.bank_masters.findFirst(query);
        });
        // Update bank details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const requestData = {
                bank_name: req.body.bankName,
                ifsc_code: req.body.ifscCode,
                branch: req.body.branch,
                micr_code: req.body.micrCode,
                branch_address: req.body.branchAddress,
                branch_city: req.body.branchCity,
                branch_state: req.body.branchState,
                branch_district: req.body.branchDistrict,
                email: req.body.email,
                contact_no: req.body.contactNo,
                contact_person_name: req.body.contactPersonName,
            };
            return yield prisma.bank_masters.update({
                where: {
                    id: id,
                },
                data: requestData,
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
            return {
                currentPage: page,
                count,
                totalPage: Math.ceil(count / limit),
                data,
            };
        });
        //////
    }
}
exports.default = BankMasterDao;
