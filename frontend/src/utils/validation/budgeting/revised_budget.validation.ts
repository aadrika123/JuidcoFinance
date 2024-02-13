import * as Yup from "yup";
export const revisedBudgetDetailsSchema = Yup.object().shape({
  primary_acc_code_id: Yup.number().required("Primary Accounting Code Id is required"),
  approved_amount: Yup.number().required("Approved Amount is required"),
  revised_amount: Yup.number().required("Revised Amount is required"),
  remark: Yup.string().required("Remark is required"),
});
