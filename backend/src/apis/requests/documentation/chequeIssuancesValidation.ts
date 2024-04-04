import Joi from "joi";
import { Request } from "express";

export interface ChequeIssuancesRequestData {
    voucher_no: string,
    voucher_date: Date,
    bill_type_id: number,
    narration: string,
    admin_ward_id: number,
    payee_id: number,
    grant_id: number,
    bank_id: number,
    module_id: number,
    department_id: number,
    issue_date: Date,
    cheque_no: string,
    amount: number,
}

const chequeIssuancesSchema = Joi.object({
    voucher_no: Joi.string().required(),
    voucher_date: Joi.date().required(),
    bill_type_id: Joi.number().required(),
    narration: Joi.string().required(),
    admin_ward_id: Joi.number().required(),
    payee_id: Joi.number().required(),
    grant_id: Joi.number().required(),
    bank_id: Joi.number().required(),
    module_id: Joi.number().required(),
    department_id: Joi.number().required(),
    issue_date: Joi.date().required(),
    cheque_no: Joi.string().required(),
    amount: Joi.number().required(),
})

export const chequeIssuancesValidation = Joi.array().items(
    chequeIssuancesSchema
);
export const chequeIssuancesValidationWithID = chequeIssuancesSchema.keys({
    id: Joi.number().required(),
});
export const requestData = (req: Request): ChequeIssuancesRequestData => {
    return {
        voucher_no: req.body.data.voucher_no,
        voucher_date: req.body.data.voucher_date,
        bill_type_id: req.body.data.bill_type_id,
        narration: req.body.data.narration,
        admin_ward_id: req.body.data.admin_ward_id,
        payee_id: req.body.data.payee_id,
        grant_id: req.body.data.grant_id,
        bank_id: req.body.data.bank_id,
        module_id: req.body.data.module_id,
        department_id: req.body.data.department_id,
        issue_date: req.body.data.issue_date,
        cheque_no: req.body.data.cheque_no,
        amount: req.body.data.amount,
    };
};
export const multiRequestData = (req: Request): ChequeIssuancesRequestData[] => {
    const data = [];
    for (const item of req.body.data) {
        data.push({
            voucher_no: item.voucher_no,
            voucher_date: item.voucher_date,
            bill_type_id: item.bill_type_id,
            narration: item.narration,
            admin_ward_id: item.admin_ward_id,
            payee_id: item.payee_id,
            grant_id: item.grant_id,
            bank_id: item.bank_id,
            module_id: item.module_id,
            department_id: item.department_id,
            issue_date: item.issue_date,
            cheque_no: item.cheque_no,
            amount: item.amount,
        });
    }
    return data;
};