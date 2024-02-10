import * as Yup from "yup";

// ----- FORMIK & YUP FORM VAIDATION ---------- //
export const BillInvoiceDetailsSchema = Yup.object().shape({
  bill_no: Yup.string().required("Bill Number is required"),
  entry_date: Yup.string().required("Bill Entry Date is required"),
  bill_date: Yup.string().required("Bill Generation Date is required"),
  type_id: Yup.number().required("Bill Type is required"),
  stage_id: Yup.number().required("Bill Stage is required"),
  vendor_id: Yup.number().required("Vendor Name is required"),
  department_id: Yup.number().required("Department is required"),
  admin_ward_id: Yup.number().required("Administrative Ward is required"),
  amount: Yup.number().required("Amount is required"),
  address: Yup.string().required("Address is required"),
  narration: Yup.string().required("Narration is required"),
});

