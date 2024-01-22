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
            return yield prisma.bank_master.create({
                data: requestData,
            });
        });
        // Get limited bank master
        this.get = () => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.bank_master.findMany({
                skip: 0,
                take: 10,
            });
        });
        // Get single bank details
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.bank_master.findUnique({ where: { id } });
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
            return yield prisma.bank_master.update({
                where: {
                    id,
                },
                data: requestData,
            });
        });
        //////
    }
}
exports.default = BankMasterDao;
