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
const generateRes2_1 = require("../../../util/generateRes2");
const prisma = new client_1.PrismaClient();
class ChequebookEntryDao {
    constructor() {
        // get all chequebook data
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const search = String(req.query.search);
            const skip = (page - 1) * limit;
            const query = {
                skip: skip,
                take: limit,
                select: {
                    id: true,
                    date: true,
                    bank_name: true,
                    employee: true,
                    employee_id: true,
                    bank_account_no: true,
                    cheque_no_from: true,
                    bank_branch: true,
                    page_count: true,
                    cheque_no_to: true,
                    issuer_name: true,
                    cheque_book_return: true,
                    cheque_book_return_date: true,
                    remarks: true,
                    created_at: true,
                    updated_at: true,
                },
            };
            if (search !== "undefined" && search !== "") {
                query.where = {
                    OR: [
                        { bank_name: { contains: search, mode: "insensitive" }, },
                        { remarks: { contains: search, mode: "insensitive" }, },
                    ],
                };
            }
            const [data, count] = yield prisma.$transaction([
                prisma.cheque_book_entries.findMany(query),
                prisma.cheque_book_entries.count({ where: query.where })
            ]);
            return (0, generateRes2_1.generateRes2)(data, count, page, limit);
        });
    }
}
exports.default = ChequebookEntryDao;
