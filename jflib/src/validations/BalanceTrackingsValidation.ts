import * as Yup from "yup";

export interface BalanceTrackingsRequestData {
    primary_acc_code_id: number,
    debit_balance: number,
    credit_balance: number,
    total_balance: number,
    ulb_id: number,
}

const balanceTrackingsValidation = Yup.object({
    primary_acc_code_id: Yup.number().required("Accounting code is required."),
    balance_amount: Yup.number().required("Balance amount is required."),
    debit_balance: Yup.number().required("Debit balance is required."),
    credit_balance: Yup.number().required("Credit balance is required."),
});


export default {
  balanceTrackingsValidation
}