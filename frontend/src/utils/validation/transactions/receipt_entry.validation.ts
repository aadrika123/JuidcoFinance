import * as Yup from "yup";
export const ReceiptDetailsSchema = Yup.object().shape({
  date: Yup.string().required("Receipt date is required."),
  email: Yup.string().required("Email is required."),
  receipt_no: Yup.string().required("Receipt no is required."),
  module_id: Yup.number().required("Module is required."),
  paid_by: Yup.string().required("Paid by field is required."),
  receipt_type_id: Yup.number().required("Receipt type is required."),
  mobile_no: Yup.string().required("Mobile no is required."),
  admin_ward_id: Yup.number().required("Admin ward is required."),
  narration: Yup.string().required("Narration is required."),
  subledger_id: Yup.number().required("Subledger is required."),
  amount: Yup.number().required("Amount is required."),
});


export const initialReceiptDetails = {
  data: "",
  email: "",
  receipt_no: "",
  module_id: "",
  paid_by: "",
  receipt_type_id: "",
  mobile_no: "",
  admin_ward_id: "",
  narration: "",
  subledger_id: "",
  amount: 0,
};

// ----- FORMIK & YUP FORM VAIDATION ---------- //
