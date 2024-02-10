import * as Yup from "yup";

// ----- FORMIK & YUP FORM VAIDATION ---------- //
export const BillPaymentDetailsSchema = Yup.object().shape({
  bill_no: Yup.string().required("Bill Number is required"),
  bill_entry_date: Yup.string().required("Bill Entry Date is required"),
  bill_type_id: Yup.number().required("Bill Type is required"),
  payee_id: Yup.number().required("Payee Name is required"),
  vendor_id: Yup.number().required("Vendor Name is required"),
  department_id: Yup.number().required("Department is required"),
  adminis_ward_id: Yup.number().required("Administrative Ward is required"),
  bill_amount: Yup.number().required("Bill Amount is required"),
  address: Yup.string().required("Address is required"),
  advance: Yup.number().required("Advance is required"),
  deposit: Yup.number().required("Deposit is required"),
  deductions_amount: Yup.number().required("Deduction Amount is required"),
});

