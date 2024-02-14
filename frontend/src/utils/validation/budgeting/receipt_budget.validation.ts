import * as Yup from "yup";
export const receiptBudgetDetailsSchema = Yup.object().shape({
  fin_year_id: Yup.number().required("Financial Year is required"),
  department_id: Yup.number().required("Department is required"),
  primary_acc_code_id: Yup.number().required("Primary Accounting Code is required"),
  admin_ward_id: Yup.number().required("Administrative Ward is required"),
  budget_type_id: Yup.number().required("Budget Type is required"),
  amount: Yup.number().required("Amount is required"),
});
