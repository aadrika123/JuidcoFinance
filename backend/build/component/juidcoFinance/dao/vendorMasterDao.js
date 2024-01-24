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
const generateRes_1 = require("../../../util/generateRes");
const vendorMasterValidation_1 = require("../requests/vendorMasterValidation");
const prisma = new client_1.PrismaClient();
class VendorMasterDao {
    constructor() {
        // Add new vendor in DB
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
=======
            const requestData = {
                vendor_type_id: req.body.vendor_type_id,
                vendor_no: req.body.vendor_no,
                name: req.body.name,
                mobile_no: req.body.mobile_no,
                comm_address: req.body.comm_address,
                tin_no: req.body.tin_no,
                pan_no: req.body.pan_no,
                bank_name: req.body.bank_name,
                ifsc_code: req.body.ifsc_code,
                department_id: req.body.department_id,
                email: req.body.email,
                office_address: req.body.office_address,
                gst_no: req.body.gst_no,
                aadhar_no: req.body.aadhar_no,
                bank_account_no: req.body.bank_account_no,
                bank_branch_name: req.body.bank_branch_name,
            };
>>>>>>> 9f86824551a666090c6348938e1ea1c32a0dce9f
            return yield prisma.vendor_masters.create({
                data: (0, vendorMasterValidation_1.vendorRequestData)(req),
            });
        });
        // get all vendor data
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            const query = {
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    vendor_no: true,
                    vendor_type: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    name: true,
                    mobile_no: true,
                    tin_no: true,
                    gst_no: true,
                    is_authorized: true,
                    created_at: true,
                    authorized_date: true,
                    updated_at: true,
                },
            };
            if (search !== "undefined") {
                query.where = {
                    OR: [
                        {
                            vendor_type: {
                                name: {
                                    equals: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                        { name: { equals: search, mode: "insensitive" } },
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.vendor_masters.findMany(query),
                prisma.vendor_masters.count(),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
        //get single vendor data by ID
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { id },
                select: {
                    id: true,
                    vendor_type: {
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
                    name: true,
                    mobile_no: true,
                    tin_no: true,
                    gst_no: true,
                    comm_address: true,
                    pan_no: true,
                    bank_name: true,
                    ifsc_code: true,
                    email: true,
                    office_address: true,
                    aadhar_no: true,
                    bank_account_no: true,
                    bank_branch_name: true,
                    is_authorized: true,
                    created_at: true,
                    authorized_date: true,
                    updated_at: true,
                },
            };
            const data = yield prisma.vendor_masters.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        //update vendor master data
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
<<<<<<< HEAD
=======
            const requestData = {
                vendor_type_id: req.body.vendor_type_id,
                vendor_no: req.body.vendor_no,
                name: req.body.name,
                mobile_no: req.body.mobile_no,
                comm_address: req.body.comm_address,
                tin_no: req.body.tin_no,
                pan_no: req.body.pan_no,
                bank_name: req.body.bank_name,
                ifsc_code: req.body.ifsc_code,
                department_id: req.body.department_id,
                email: req.body.email,
                office_address: req.body.office_address,
                gst_no: req.body.gst_no,
                aadhar_no: req.body.aadhar_no,
                bank_account_no: req.body.bank_account_no,
                bank_branch_name: req.body.bank_branch_name,
            };
>>>>>>> 9f86824551a666090c6348938e1ea1c32a0dce9f
            return yield prisma.vendor_masters.update({
                where: {
                    id,
                },
                data: (0, vendorMasterValidation_1.vendorRequestData)(req),
            });
        });
    }
}
exports.default = VendorMasterDao;
