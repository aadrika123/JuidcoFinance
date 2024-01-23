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
const prisma = new client_1.PrismaClient();
class VendorMasterDao {
    constructor() {
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            const requestData = {
                vendor_type_id: req.body.vendorTypeId,
                vendor_no: req.body.vendorNo,
                name: req.body.name,
                mobile_no: req.body.mobileNo,
                comm_address: req.body.commAddress,
                tin_no: req.body.tinNo,
                pan_no: req.body.panNo,
                bank_name: req.body.bankName,
                ifsc_code: req.body.ifscCode,
                department_id: req.body.departmentId,
                email: req.body.email,
                office_address: req.body.officeAddress,
                gst_no: req.body.gstNo,
                aadhar_no: req.body.aadharNo,
                bank_account_no: req.body.bankAccountNo,
                bank_branch_name: req.body.bankBranchName,
            };
            return yield prisma.vendor_master.create({
                data: requestData,
            });
        });
        // Get vendor master list
        this.get = (page, limit) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                skip: (page - 1) * limit,
                take: limit,
            };
            const [data, count] = yield prisma.$transaction([
                prisma.vendor_master.findMany(query),
                prisma.vendor_master.count(),
            ]);
            return {
                currentPage: page,
                count,
                totalPage: Math.ceil(count / limit),
                data,
            };
        });
    }
}
exports.default = VendorMasterDao;
