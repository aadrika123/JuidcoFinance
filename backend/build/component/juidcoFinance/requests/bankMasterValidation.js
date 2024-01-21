"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankMasterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bankMasterValidation = joi_1.default.object({
    username: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: joi_1.default.ref('password'),
    access_token: [
        joi_1.default.string(),
        joi_1.default.number()
    ],
    birth_year: joi_1.default.number()
        .integer()
        .min(1900)
        .max(2013),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});
