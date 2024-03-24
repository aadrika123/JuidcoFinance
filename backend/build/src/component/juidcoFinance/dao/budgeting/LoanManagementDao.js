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
const loanManagementValidation_1 = require("../../requests/budgeting/loanManagementValidation");
/**
 * | Author- Sanjiv Kumar
 * | Created for- loan_managements Dao
 * | Status: open
 */
const prisma = new client_1.PrismaClient();
class LoanManagementDao {
    constructor() {
        // store
        this.store = (req) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.loan_managements.createMany({
                data: (0, loanManagementValidation_1.multiRequestData)(req),
            });
        });
        // Get limited loan_managements
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
                    purpose_of_loan: true,
                    department: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    resolution_date: true,
                    loan_no: true,
                    loan_sanctioned_amount: true,
                    interest_rate: true,
                    instalments_no: true,
                    instalment_amount: true,
                    receipt_date: true,
                    received_amount: true,
                    total_received_amount: true,
                    repayment_due_date: true,
                    principal_amount: true,
                    interest_amount: true,
                    total_due_amount_to_repayment: true,
                    officer: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    repaid_repayment_date: true,
                    repaid_principal_amount: true,
                    repaid_interest: true,
                    repaid_total_amount: true,
                    balance_principal_amount: true,
                    balance_interest: true,
                    balance_total_amount: true,
                    balance_remarks: true,
                    employee: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    designation: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
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
                            department: {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                        {
                            loan_no: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.loan_managements.findMany(query),
                prisma.loan_managements.count({ where: query.where }),
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
                    purpose_of_loan: true,
                    department: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    resolution_date: true,
                    loan_no: true,
                    loan_sanctioned_amount: true,
                    interest_rate: true,
                    instalments_no: true,
                    instalment_amount: true,
                    receipt_date: true,
                    received_amount: true,
                    total_received_amount: true,
                    repayment_due_date: true,
                    principal_amount: true,
                    interest_amount: true,
                    total_due_amount_to_repayment: true,
                    officer: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    repaid_repayment_date: true,
                    repaid_principal_amount: true,
                    repaid_interest: true,
                    repaid_total_amount: true,
                    balance_principal_amount: true,
                    balance_interest: true,
                    balance_total_amount: true,
                    balance_remarks: true,
                    employee: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    designation: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    created_at: true,
                    updated_at: true,
                },
            };
            const data = yield prisma.loan_managements.findFirst(query);
            return (0, generateRes_1.generateRes)(data);
        });
        // Update loan_managements details
        this.update = (req) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            return yield prisma.loan_managements.update({
                where: {
                    id: id,
                },
                data: (0, loanManagementValidation_1.requestData)(req),
            });
        });
        //////
    }
}
exports.default = LoanManagementDao;
