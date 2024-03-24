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
class VoucherTypeDao {
    constructor() {
        this.get = () => __awaiter(this, void 0, void 0, function* () {
            const data = prisma.voucher_types.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });
            return (0, generateRes_1.generateRes)(data);
        });
    }
}
exports.default = VoucherTypeDao;
