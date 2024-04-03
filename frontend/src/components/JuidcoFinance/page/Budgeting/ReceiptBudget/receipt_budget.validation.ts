import * as Yup from "yup";
export const receiptBudgetDetailsSchema = Yup.object().shape({
  fin_year_id: Yup.number().required("Financial Year is required"),
  primary_acc_code_id: Yup.number().required("Primary Accounting Code is required"),
  amount: Yup.number().required("Amount is required"),
});
