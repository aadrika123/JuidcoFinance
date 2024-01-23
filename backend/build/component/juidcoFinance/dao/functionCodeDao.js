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
const generateRes_1 = require("../../../util/generateRes");
const prisma = new client_1.PrismaClient();
// -> Belongs to Chart of Accounts
class FunctionCodeDao {
    constructor() {
        this.get = (page, limit) => __awaiter(this, void 0, void 0, function* () {
            const query = {
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    group: true,
                    description_code: true,
                    cost_center: true,
                    description: true,
                },
            };
            const [data, count] = yield prisma.$transaction([
                prisma.function_codes.findMany(query),
                prisma.function_codes.count(),
            ]);
            return (0, generateRes_1.generateRes)(data, count, page, limit);
        });
    }
}
exports.default = FunctionCodeDao;
