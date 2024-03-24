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
const prisma = new client_1.PrismaClient();
// -> Belongs to Chart of Accounts
class AccountingCodeDao {
    constructor() {
        // Get All accounting codes
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const search = String(req.query.search);
            const query = {
                select: {
                    id: true,
                    code: true,
                    major_head: true,
                    minor_head: true,
                    detail_code: true,
                    description: true,
                },
            };
            if (search !== "undefined" && search !== "") {
                query.where = {
                    OR: [
                        {
                            code: {
                                startsWith: search,
                            },
                        },
                        {
                            description: {
                                contains: search,
                            },
                        },
                    ],
                };
            }
            const data = prisma.account_codes.findMany(query);
            return (0, generateRes_1.generateRes)(data);
        });
        this.get_all = () => __awaiter(this, void 0, void 0, function* () {
            const query = {
                select: {
                    id: true,
                    code: true,
                    description: true,
                },
            };
            const data = prisma.account_codes.findMany(query);
            return (0, generateRes_1.generateRes)(data);
        });
        this.getMainCodes = () => __awaiter(this, void 0, void 0, function* () {
            const query = {
                select: {
                    id: true,
                    code: true,
                    description: true,
                },
            };
            query.where = {
                parent_id: {
                    equals: 0,
                },
            };
            const data = prisma.account_codes.findMany(query);
            return (0, generateRes_1.generateRes)(data);
        });
        this.getSubCodes = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma.$queryRaw `SELECT id, code, description FROM account_codes where parent_id != 0 order by description asc`;
            if (!data) {
                return (0, generateRes_1.generateRes)(null);
            }
            return (0, generateRes_1.generateRes)(data);
        });
        this.getChildCodes = (id) => __awaiter(this, void 0, void 0, function* () {
            const acc = yield prisma.$queryRaw `SELECT * FROM account_codes where id=${id}`;
            if (!acc) {
                return (0, generateRes_1.generateRes)(null);
            }
            // const code = acc[0].code;
            // const prefix = code.substring(0, code.length - 2);
            const query = {
                select: {
                    id: true,
                    code: true,
                    description: true,
                },
            };
            query.where = {
                parent_id: {
                    equals: id,
                },
            };
            const data = prisma.account_codes.findMany(query);
            return (0, generateRes_1.generateRes)(data);
        });
        this.getParentCode = (id) => __awaiter(this, void 0, void 0, function* () {
            const acc = yield prisma.$queryRaw `SELECT * FROM account_codes where id=${id}`;
            if (!acc) {
                return (0, generateRes_1.generateRes)(null);
            }
            const parent_id = acc[0].parent_id;
            const data = yield prisma.$queryRaw `SELECT code, description FROM account_codes where id=${parent_id}`;
            return (0, generateRes_1.generateRes)(data);
        });
        this.getCodesWithParentDetail = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma.$queryRaw `select a.id, a.code, a.description, b.description as parent_name 
    from account_codes a 
    left join account_codes b on a.parent_id = b.id where a.parent_id != 0 
    union
    SELECT id, code, description, '' as parent_name FROM account_codes where parent_id=0`;
            return (0, generateRes_1.generateRes)(data);
        });
        /**
         * | Author- Sanjiv Kumar
         * | Created On- 05-03-2024
         * | Created for- Requesting New Accounting Code
         */
        this.requestNewCode = (reqDetails) => __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma.request_account_codes.create({
                data: reqDetails
            });
            return (0, generateRes_1.generateRes)(data);
        });
    }
}
exports.default = AccountingCodeDao;
