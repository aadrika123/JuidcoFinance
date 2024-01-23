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
// -> Belongs to Chart of Accounts
class MuncipalityCodeDao {
    constructor() {
        // Get limited muncipilaty code
        this.get = (page, limit) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    ulbs: true,
                    district: true,
                    state_code: true,
                    district_code: true,
                    category: true,
                    code: true,
                },
            };
            const [data, count] = yield prisma.$transaction([
                prisma.municipality_codes.findMany(query),
                prisma.municipality_codes.count(),
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
exports.default = MuncipalityCodeDao;
