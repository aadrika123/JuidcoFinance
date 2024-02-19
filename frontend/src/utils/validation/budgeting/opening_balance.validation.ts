import * as Yup from "yup";
export const openingBalanceDetailsSchema = Yup.object().shape({
  fin_year_id: Yup.number().required("Financial Year Id is required"),
  dr_cr_id: Yup.number().required("Dr Cr  is required"),
  primary_acc_code_id: Yup.number().required("Primary Accounting Code Id is required"),
  amount: Yup.number().required("Amount  is required"),
});
