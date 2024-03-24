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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const loggerConfig_1 = require("../../../../loggerConfig");
const commonResponse_1 = __importDefault(require("../../../util/helper/commonResponse"));
const commonMessage_1 = require("../responseMessage/commonMessage");
const prisma = new client_1.PrismaClient();
class AuditTrail {
    constructor() {
        this.store = (error, resObj, res, req) => __awaiter(this, void 0, void 0, function* () {
            const totalTime = process.hrtime(res.locals.startTime);
            try {
                yield prisma.audit_trails.create({
                    data: {
                        error: error,
                        message: error.message,
                        meta_data: Object.assign(Object.assign({}, resObj), { responseTime: totalTime[0] * 1000 + totalTime[1] / 1e6 }),
                        user: res.locals.user || {
                            user: "User Not Found, BCZ of Invalid Token!!!",
                        },
                        payload: {
                            body: Object.assign({}, req === null || req === void 0 ? void 0 : req.body),
                            params: Object.assign({}, req === null || req === void 0 ? void 0 : req.params),
                            headers: Object.assign({}, req === null || req === void 0 ? void 0 : req.headers),
                        },
                        ram_usage: res.locals.memoInfo || 0.0,
                        request_no: 0,
                        db_connection_no: 0,
                        cpu_usage: res.locals.cpuInfo || 0.0,
                    },
                });
            }
            catch (error) {
                loggerConfig_1.warnlogger.warn({
                    metaData: Object.assign(Object.assign({}, resObj), { responseTime: totalTime[0] * 1000 + totalTime[1] / 1e6 }),
                    error,
                    message: error.message,
                });
            }
        });
        //// Get audit
        this.get = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            const limit = Number(req.query.limit);
            const page = Number(req.query.page);
            const date = String(req.query.date);
            try {
                const query = {
                    take: limit,
                    skip: (page - 1) * limit,
                };
                if (date !== 'undefined' && date !== "") {
                    query.where = {
                        created_at: {
                            gte: new Date(date),
                            lte: new Date(`${date}T23:59:59`),
                        },
                    };
                }
                const data = yield prisma.audit_trails.findMany(query);
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)("Audit Trails").FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res, req);
            }
        });
        ////// Get for previous months
        this.getPreviousMonthsData = (req, res, apiId) => __awaiter(this, void 0, void 0, function* () {
            const resObj = {
                apiId,
                action: "GET",
                version: "1.0",
            };
            try {
                const data = yield prisma.$queryRaw `SELECT 
      TRIM(TO_CHAR(created_at, 'Month')) AS month, EXTRACT(MONTH FROM created_at) as numMonth, 
      cast(count(*) as INTEGER) AS total_logs
        FROM 
      audit_trails
      WHERE 
      created_at >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY 
      month, numMonth
      ORDER BY 
      numMonth`;
                return commonResponse_1.default.SUCCESS((0, commonMessage_1.resMessage)("Audit Trails").FOUND, data, resObj, res);
            }
            catch (error) {
                return commonResponse_1.default.SERVER_ERROR(error, resObj, res, req);
            }
        });
        //
    }
}
exports.default = AuditTrail;
