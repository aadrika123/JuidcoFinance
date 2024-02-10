import { DirPaymentDataProps } from "@/utils/types/direct_payment_entry_types";
import * as Yup from "yup";

// ----- FORMIK & YUP FORM VAIDATION ---------- //
export const PaymentDetailsSchema = Yup.object().shape({
  payment_date: Yup.string().required("Payment Date is required"),
  narration: Yup.string().required("Narration is required"),
  payment_type_id: Yup.number().required("Payment Type is required"),
  department_id: Yup.number().required("Department is required"),
  payee_name_id: Yup.string().required("Payee Name is required"),
  adminis_ward_id: Yup.number().required("Administrative Ward is required"),
  grant_id: Yup.number().required("Grant is required"),
  address: Yup.string().required("Address is required"),
  amount: Yup.number().required("Amount is required"),
  user_common_budget: Yup.boolean().required("User common budget is required"),
  payment_mode: Yup.string().required("Select Payment of Mode is required"),
  subledger_id: Yup
    .number()
    .required("Sub ledger ID is required")
    .positive("Sub ledger ID must be positive"),
});


export const initialPaymentDetails: DirPaymentDataProps = {
  payment_date: "",
  narration: "",
  payment_type_id: "",
  department_id: "",
  payee_name_id: "",
  adminis_ward_id: "",
  grant_id: "",
  address: "",
  user_common_budget: false,
  payment_mode:"",
  subledger_id: 0
};

// ----- FORMIK & YUP FORM VAIDATION ---------- //
