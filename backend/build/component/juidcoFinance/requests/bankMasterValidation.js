"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankMasterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bankMasterValidation = joi_1.default.object({
    id: joi_1.default.number(),
    bank_name: joi_1.default.string().required(),
    ifsc_code: joi_1.default.string().required(),
    branch: joi_1.default.string().required(),
    micr_code: joi_1.default.string().required(),
    branch_address: joi_1.default.string().required(),
    branch_city: joi_1.default.string().required(),
    branch_state: joi_1.default.string().required(),
    branch_district: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    contact_no: joi_1.default.string().required(),
    contact_person_name: joi_1.default.string().required()
});
