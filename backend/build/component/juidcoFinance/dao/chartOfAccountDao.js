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
class ChartOfAccountDao {
    constructor() {
        // accounting code
        this.getAccountingCode = () => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.account_code.findMany({
                skip: 0,
                take: 9,
            });
        });
        // function code
        this.getFunctionCode = () => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.function_code.findMany({ skip: 0, take: 9 });
        });
        // muncipality code
        this.getMuncipalityCode = () => __awaiter(this, void 0, void 0, function* () {
            return yield prisma.municipality_code.findMany({ skip: 0, take: 9 });
        });
    }
}
exports.default = ChartOfAccountDao;
