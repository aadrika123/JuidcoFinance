"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorMasterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.vendorMasterValidation = joi_1.default.object({
    id: joi_1.default.number(),
    vendor_type_id: joi_1.default.number().required(),
    vendor_no: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    mobile_no: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    comm_address: joi_1.default.string().required(),
    tin_no: joi_1.default.string().allow(null, "").optional(),
    pan_no: joi_1.default.string().allow(null, "").optional(),
    bank_name: joi_1.default.string().required(),
    ifsc_code: joi_1.default.string().required(),
    department_id: joi_1.default.number().integer().required(),
    email: joi_1.default.string().email().required(),
    office_address: joi_1.default.string().required(),
    gst_no: joi_1.default.string().allow(null, "").optional(),
    aadhar_no: joi_1.default.string()
        .pattern(/^[0-9]{12}$/)
        .allow(null, "")
        .optional(),
    bank_account_no: joi_1.default.string().required(),
    bank_branch_name: joi_1.default.string().required(),
});
