import * as Yup from "yup";

// Define your schema
export const chequeIssueValidationSchema = Yup.object().shape({
  voucher_no: Yup.string().required("Voucher Number is required"),
  voucher_date: Yup.date().required("Voucher Date is required"),
  bill_type_id: Yup.number().required("Bill Type ID is required"),
  narration: Yup.string().required("Narration is required"),
  admin_ward_id: Yup.number().required("Admin Ward ID is required"),
  payee_id: Yup.number().required("Payee ID is required"),
  grant_id: Yup.number().required("Grant ID is required"),
  bank_id: Yup.number().required("Bank ID is required"),
  module_id: Yup.number().required("Module ID is required"),
  issue_date: Yup.date().required("Issue Date is required"),
  cheque_no: Yup.string().required("Cheque Number is required"),
  amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount must be greater than or equal to 0"),
});
