import * as Yup from "yup";
export const budgetReApproDetailsSchema = Yup.object().shape({
  fin_year_id: Yup.number().required("Financial Year Id is required"),
  primary_acc_code_id: Yup.number().required(
    "Primary Accounting Code Id is required"
  ),
  transaction_date: Yup.number().required("Transaction Date  is required"),
  budget_name_id: Yup.number().required("Budget Name Id is required"),
  actual_amount: Yup.number().required("Actual Amount is required"),
  from_primary_acc_code_id: Yup.number().required(
    "From Primary Accounting Code is required"
  ),
  approved_amount: Yup.number().required("Approved Amount is required"),
  balance_amount: Yup.number().required("Balance Amount is required"),
  transfer_amount: Yup.number().required("Transfer Amount is required"),
});
