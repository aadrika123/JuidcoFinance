import * as Yup from "yup";
export const budgetApproDetailsSchema = Yup.object().shape({
  fin_year_id: Yup.number().required("Financial Year Id is required"),
  primary_acc_code_id: Yup.number().required("Primary Accounting Code Id is required"),
  remark: Yup.string().required("Remark is required"),
  from_primary_acc_code_id: Yup.number().required(
    "From Primary Accounting Code Id is required"
  ),
  approved_amount: Yup.number().required("Approved Amount is required"),
  transfer_amount: Yup.number().required("Transfer Amount is required"),
});
