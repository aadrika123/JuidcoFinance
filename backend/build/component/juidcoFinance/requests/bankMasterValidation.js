"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestData = exports.bankMasterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Validating request data
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
<<<<<<< HEAD
    contact_person_name: joi_1.default.string().required(),
=======
    contact_person_name: joi_1.default.string().required()
>>>>>>> 9f86824551a666090c6348938e1ea1c32a0dce9f
});
// arrange request data for store and update
const requestData = (req) => {
    return {
        bank_name: req.body.bank_name,
        ifsc_code: req.body.ifsc_code,
        branch: req.body.branch,
        micr_code: req.body.micr_code,
        branch_address: req.body.branch_address,
        branch_city: req.body.branch_city,
        branch_state: req.body.branch_state,
        branch_district: req.body.branch_district,
        email: req.body.email,
        contact_no: req.body.contact_no,
        contact_person_name: req.body.contact_person_name,
    };
};
exports.requestData = requestData;
