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
exports.DatabaseTestServer = void 0;
const client_1 = require("@prisma/client");
const dbtest_pb_1 = require("../proto/dbtest_pb");
exports.DatabaseTestServer = {
    getBanksStreamed: function () {
        return __awaiter(this, void 0, void 0, function* () {
        });
    },
    getBank: function (call, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const id = call.request.getId();
            const query = {
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    name: true,
                },
            };
            const bank = yield prisma.banks.findFirst(query);
            const b = new dbtest_pb_1.Bank();
            // console.log(bank);
            if (bank != null) {
                b.setId(bank['id']);
                b.setName(bank['name']);
            }
            callback(null, b);
        });
    },
    getBanks: function (call) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const query = {
                select: {
                    id: true,
                    name: true,
                },
            };
            const banks = yield prisma.banks.findMany(query);
            for (let i = 0; i < banks.length; i++) {
                const b = new dbtest_pb_1.Bank();
                b.setId(banks[i].id);
                b.setName(banks[i].name);
                call.write(b);
            }
            call.end();
        });
    }
};
