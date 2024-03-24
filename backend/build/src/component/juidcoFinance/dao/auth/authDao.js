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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const generateRes_1 = require("../../../../util/generateRes");
const middleware_1 = __importDefault(require("../../middleware/middleware"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateOtp_1 = require("../../../../util/helper/generateOtp");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class AuthDao {
    constructor() {
        this.login = (credentials) => __awaiter(this, void 0, void 0, function* () {
            const { password, email } = credentials;
            const employee = yield prisma.employees.findFirst({
                where: { email },
                select: {
                    id: true,
                    user_id: true,
                    name: true,
                    email: true,
                    password: true,
                    designation: {
                        select: {
                            id: true,
                            name: true,
                            udhd: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                },
            });
            if (!employee) {
                return (0, generateRes_1.generateRes)(employee);
            }
            const isValidPassword = yield bcrypt_1.default.compare(password, employee.password);
            if (isValidPassword) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password } = employee, others = __rest(employee, ["password"]);
                const token = this.middleware.jwtSign(others);
                return (0, generateRes_1.generateRes)(Object.assign(Object.assign({}, others), { token }));
            }
            return false;
        });
        ////// Sending OPT on mail ///////////
        this.sendMailOtp = (email) => __awaiter(this, void 0, void 0, function* () {
            const otp = (0, generateOtp_1.generateOtp)();
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            });
            const mailOptions = {
                from: process.env.MAIL_USER,
                to: email,
                subject: "Verification",
                text: `Your otp is ${otp}`,
            };
            transporter.sendMail(mailOptions).then(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.otps.create({
                    data: {
                        email,
                        otp,
                    },
                });
            }));
        });
        ////////////// Verify Mail Otp
        this.verifyMailOtp = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma.otps.findFirst({
                where: {
                    email,
                    otp,
                },
            });
            if (data && (data === null || data === void 0 ? void 0 : data.created_at)) {
                const createdAt = new Date(data.created_at);
                const currentTime = new Date();
                const timeDifference = currentTime.getTime() - createdAt.getTime();
                yield prisma.otps.deleteMany({
                    where: {
                        email: data.email,
                    },
                });
                return timeDifference <= (Number(process.env.OTP_EXPIRY_TIME) || 120000)
                    ? true
                    : false;
            }
            return null;
        });
        this.middleware = new middleware_1.default();
    }
}
exports.default = AuthDao;
