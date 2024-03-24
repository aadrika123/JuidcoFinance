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
const advanceManagementValidation_1 = require("../../requests/budgeting/advanceManagementValidation");
/**
 * | Author- Sanjiv Kumar
 * | Created for- advance_managements Dao
 * | Status: open
 */
const prisma = new client_1.PrismaClient();
class AdvanceManagementDao {
    constructor() {
        // store
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.advance_managements.createMany({
                data: (0, advanceManagementValidation_1.multiRequestData)(req),
            });
        });
        // Get limited advance_management
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            let order = Number(req.query.order);
            if (order != -1 && order != 1) {
                order = 1;
            }
            const query = {
                orderBy: [{ updated_at: order == -1 ? "desc" : "asc" }],
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    ulb: {
                        select: {
                            id: true,
                            code: true,
                        },
                    },
                    primary_acc_code: {
                        select: {
                            id: true,
                            code: true,
                        },
                    },
                    serial_no_of_estimate: true,
                    work_order_no: true,
                    work_name: true,
                    work_nature: true,
                    contract_amount: true,
                    contractor_name: true,
                    order_sanctioning_the_contract_no: true,
                    order_sanctioning_the_contract_resolution_date: true,
                    order_sanctioning_the_estimate_no: true,
                    order_sanctioning_the_estimate_date: true,
                    voucher_no: true,
                    date: true,
                    amount: true,
                    officer: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    bill_no: true,
                    bill_date: true,
                    payable_amount: true,
                    approved_amount: true,
                    cumulative_approved_amount: true,
                    pwd_officer: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    security_deposit_deducted_amount: true,
                    tds_amount: true,
                    work_contract_tax_amount: true,
                    material_issued_recovery_amount: true,
                    advance_provided_recovery_amount: true,
                    other_deduction_amount: true,
                    net_paid_amount: true,
                    department: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    remarks: true,
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
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                        {
                            primary_acc_code: {
                                code: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                        {
                            work_name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            work_nature: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            officer: {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                        {
                            pwd_officer: {
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
                        },
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.advance_managements.findMany(query),
                prisma.advance_managements.count({ where: query.where }),
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
                            code: true,
                        },
                    },
                    primary_acc_code: {
                        select: {
                            id: true,
                            code: true,
                        },
                    },
                    serial_no_of_estimate: true,
                    work_order_no: true,
                    work_name: true,
                    work_nature: true,
                    contract_amount: true,
                    contractor_name: true,
                    order_sanctioning_the_contract_no: true,
                    order_sanctioning_the_contract_resolution_date: true,
                    order_sanctioning_the_estimate_no: true,
                    order_sanctioning_the_estimate_date: true,
                    voucher_no: true,
                    date: true,
                    amount: true,
                    officer: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    bill_no: true,
                    bill_date: true,
                    payable_amount: true,
                    approved_amount: true,
                    cumulative_approved_amount: true,
                    pwd_officer: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    security_deposit_deducted_amount: true,
                    tds_amount: true,
                    work_contract_tax_amount: true,
                    material_issued_recovery_amount: true,
                    advance_provided_recovery_amount: true,
                    other_deduction_amount: true,
                    net_paid_amount: true,
                    department: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    remarks: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            const data = yield prisma.advance_managements.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update advance_managements details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.advance_managements.update({
                where: {
                    id: id,
                },
                data: (0, advanceManagementValidation_1.requestData)(req),
            });
        });
        //////
    }
}
exports.default = AdvanceManagementDao;
