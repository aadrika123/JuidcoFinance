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
class MuncipalityCodeDao {
    constructor() {
        // Get All muncipilaty code
        this.get = (req) => __awaiter(this, void 0, void 0, function* () {
            const search = req.query.search == undefined ? "" : String(req.query.search);
            const pattern1 = `${search}%`;
            const pattern2 = `%${search}%`;
            const data = yield prisma.$queryRaw `
     select
     id,
     ulbs,
     district,
     state_code,
     district_code,
     category,
     code
     from
     municipality_codes
     where CONCAT(state_code, district_code, category, code) LIKE ${pattern1} or ulbs LIKE ${pattern2} or district LIKE ${pattern2}
     `;
            return (0, generateRes_1.generateRes)(data);
        });
        this.get_all = () => __awaiter(this, void 0, void 0, function* () {
            const data = prisma.$queryRaw `select id, ulbs, ulbs as name from municipality_codes`;
            return (0, generateRes_1.generateRes)(data);
        });
    }
}
exports.default = MuncipalityCodeDao;
