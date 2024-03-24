"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRequestData = exports.vendorMasterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const generateUniqueNo_1 = require("../../../../util/helper/generateUniqueNo");
// Validating request data
exports.vendorMasterValidation = joi_1.default.object({
    id: joi_1.default.number(),
    vendor_type_id: joi_1.default.number().required(),
    name: joi_1.default.string().required(),
    mobile_no: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    tin_no: joi_1.default.string().allow(null, "").optional(),
    pan_no: joi_1.default.string().allow(null, "").optional(),
    bank_id: joi_1.default.number().required(),
    ifsc_code: joi_1.default.string().required(),
    department_id: joi_1.default.number().integer().required(),
    email: joi_1.default.string().email().required(),
    contact_address: joi_1.default.string().required(),
    gst_no: joi_1.default.string().allow(null, "").optional(),
    aadhar_no: joi_1.default.string()
        .pattern(/^[0-9]{12}$/)
        .allow(null, "")
        .optional(),
    bank_account_no: joi_1.default.string().required(),
    bank_branch_name: joi_1.default.string().required(),
});
// arrange request data for store and update
const vendorRequestData = (req) => {
    return {
        vendor_type_id: req.body.vendor_type_id,
        vendor_no: req.body.vendor_no || (0, generateUniqueNo_1.generateUniquePaymentNo)("vn"),
        name: req.body.name,
        mobile_no: req.body.mobile_no,
        tin_no: req.body.tin_no,
        pan_no: req.body.pan_no,
        bank_id: req.body.bank_id,
        ifsc_code: req.body.ifsc_code,
        department_id: req.body.department_id,
        email: req.body.email,
        contact_address: req.body.contact_address,
        gst_no: req.body.gst_no,
        aadhar_no: req.body.aadhar_no,
        bank_account_no: req.body.bank_account_no,
        bank_branch_name: req.body.bank_branch_name,
    };
};
exports.vendorRequestData = vendorRequestData;
