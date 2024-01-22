"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankMasterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bankMasterValidation = joi_1.default.object({
    id: joi_1.default.number(),
    bankName: joi_1.default.string().required(),
    ifscCode: joi_1.default.string().required(),
    branch: joi_1.default.string().required(),
    micrCode: joi_1.default.string().required(),
    branchAddress: joi_1.default.string().required(),
    branchCity: joi_1.default.string().required(),
    branchState: joi_1.default.string().required(),
    branchDistrict: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    contactNo: joi_1.default.string().required(),
    contactPersonName: joi_1.default.string().required()
});
