import * as yup from "yup";
import { VoucherDataProps } from "@/utils/types/voucher_entry_types";

export const voucherSchema = yup.object().shape({
  // id: yup.number().nullable(),
  // voucher_no: yup
  //   .number()
  //   .required("Voucher number is required")
  //   .positive("Voucher number must be positive"),
  voucher_date: yup.date().required("Voucher date is required"),
  voucher_type_id: yup
    .number()
    .required("Voucher type ID is required")
    .positive("Voucher type ID must be positive"),
    // voucher_type_id_name: yup.string(),
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
  dr_cr: yup
    .string()
    .required("Dr/Cr is required"),
  // total: yup.number().nullable(),
});

export const voucherInitialValues: VoucherDataProps = {
  // voucher_no: 0,
  voucher_date: "",
  voucher_type_id: 0,
  // voucher_type_id_name: "",
  narration: "",
  department_id: 0,
  adminis_ward_id: 0,
  voucher_sub_id: 0,
  sub_ledger_id: 0,
  amount: 0,
  dr_cr: 0,
  // total: undefined,
};
