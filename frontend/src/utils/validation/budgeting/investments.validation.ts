import * as Yup from "yup";
export const investmentsDetailsSchema = Yup.object().shape({
  ulb_id: Yup.number().required("Ulb is required"),
  primary_acc_code_id: Yup.number().required(
    "Primary Accounting Code Id is required"
  ),
  investment_no: Yup.string().required("Investment No is required"),
  authorization_date: Yup.string().required("Authorization Date is required"),
  investment_date: Yup.string().required("Investment Date is required"),
  particulars: Yup.string().required("Particulars is required"),
  investment_type_id: Yup.number().required("Investment Type Id is required"),
  purchase_amount: Yup.number().required("Purchase Amount is required"),
  face_value_amount: Yup.number().required("Face Value Amount is required"),
  interest_due_date: Yup.string().required("Interest Due Date is required"),
  interest_due_amount: Yup.number().required("Interest Due Amount is required"),
  employee_id: Yup.number().required("Employee Id is required"),
  interest_recovered_amount: Yup.number().required(
    "Interest Recovered Amount is required"
  ),
  interest_recovery_date: Yup.string().required(
    "Interest Recovery Date is required"
  ),
  acc_adj_recovery_date: Yup.string().required(
    "Accounting Adjustment Recovery Date is required"
  ),
  realization_final_amount: Yup.number().required(
    "Realization Final Amount is required"
  ),
  realization_date: Yup.string().required("Realization Date is required"),
  acc_adj_realization_date: Yup.string().required(
    "Accounting Adjustment Realization Date is required"
  ),
  remarks: Yup.string().required("Remarks is required"),
});
