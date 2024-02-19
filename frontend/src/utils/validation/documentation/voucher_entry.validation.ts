import * as yup from "yup";

export const voucherSchema = yup.object().shape({
  voucher_date: yup.date().required("Voucher date is required"),
  voucher_type_id: yup
    .number()
    .required("Voucher type ID is required")
    .positive("Voucher type ID must be positive"),
  narration: yup.string().required("Narration is required"),
  department_id: yup
    .number()
    .required("Department ID is required")
    .positive("Department ID must be positive"),
  adminis_ward_id: yup
    .number()
    .required("Adminis ward ID is required")
    .positive("Adminis ward ID must be positive"),
  voucher_sub_id: yup
    .number()
    .required("Voucher sub ID is required")
    .positive("Voucher sub ID must be positive"),
  sub_ledger_id: yup
    .number()
    .required("Sub ledger ID is required")
    .positive("Sub ledger ID must be positive"),
  amount: yup
    .number()
    .required("Amount is required")
    .moreThan(0, "Amount must be greater than 0"),
  dr_cr_id: yup
    .number()
    .required("Dr/Cr is required"),
});
