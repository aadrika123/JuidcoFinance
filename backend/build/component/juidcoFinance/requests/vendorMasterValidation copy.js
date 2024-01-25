"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorMasterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.vendorMasterValidation = joi_1.default.object({
    id: joi_1.default.number(),
    vendorTypeId: joi_1.default.number().required(),
    vendorNo: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    mobileNo: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    commAddress: joi_1.default.string().required(),
    tinNo: joi_1.default.string().allow(null, "").optional(),
    panNo: joi_1.default.string().allow(null, "").optional(),
    bankName: joi_1.default.string().required(),
    ifscCode: joi_1.default.string().required(),
    departmentId: joi_1.default.number().integer().required(),
    email: joi_1.default.string().email().required(),
    officeAddress: joi_1.default.string().required(),
    gstNo: joi_1.default.string().allow(null, "").optional(),
    aadharNo: joi_1.default.string()
        .pattern(/^[0-9]{12}$/)
        .allow(null, "")
        .optional(),
    bankAccountNo: joi_1.default.string().required(),
    bankBranchName: joi_1.default.string().required(),
});
