"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestData = exports.bankMasterUpdateValidation = exports.bankMasterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Validating request data
exports.bankMasterValidation = joi_1.default.object({
    id: joi_1.default.number(),
    bank_id: joi_1.default.number().required(),
    bank_type_id: joi_1.default.number().required(),
    ulb_id: joi_1.default.number().required(),
    ifsc_code: joi_1.default.string().required(),
    branch: joi_1.default.string().required(),
    micr_code: joi_1.default.string(),
    branch_address: joi_1.default.string().required(),
    branch_city: joi_1.default.string().required(),
    branch_state: joi_1.default.string().required(),
    branch_district: joi_1.default.string(),
    email: joi_1.default.string().email({ tlds: { allow: false } }),
    contact_no: joi_1.default.string().regex(/^\d{10}$/),
});
// validating updation data
exports.bankMasterUpdateValidation = joi_1.default.object({
    id: joi_1.default.number().required(),
    bank_id: joi_1.default.number(),
    bank_type_id: joi_1.default.number(),
    ulb_id: joi_1.default.number(),
    ifsc_code: joi_1.default.string(),
    branch: joi_1.default.string(),
    micr_code: joi_1.default.string(),
    branch_address: joi_1.default.string(),
    branch_city: joi_1.default.string(),
    branch_state: joi_1.default.string(),
    branch_district: joi_1.default.string(),
    email: joi_1.default.string().email({ tlds: { allow: false } }),
    contact_no: joi_1.default.string().regex(/^\d{10}$/),
});
// arrange request data for store
const requestData = (req) => {
    return {
        bank_id: req.body.bank_id,
        ulb_id: req.body.ulb_id,
        bank_type_id: req.body.bank_type_id,
        ifsc_code: req.body.ifsc_code,
        branch: req.body.branch,
        micr_code: req.body.micr_code,
        branch_address: req.body.branch_address,
        branch_city: req.body.branch_city,
        branch_state: req.body.branch_state,
        branch_district: req.body.branch_district,
        email: req.body.email,
        contact_no: req.body.contact_no,
    };
};
exports.requestData = requestData;
