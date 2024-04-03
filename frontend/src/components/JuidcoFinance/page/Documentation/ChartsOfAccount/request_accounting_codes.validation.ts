import * as Yup from "yup";

// ----- FORMIK & YUP FORM VAIDATION ---------- //
export const RequestAccCodesDetailsSchema = Yup.object().shape({
  date: Yup.string().required("Date is required!"),
  ulb_id: Yup.number().required("Name of tULB is required"),
  request_no: Yup.string().required("Request number is required."),
  employee_id: Yup.number().required("Employee is required."),
  group_ref: Yup.string().required("Group is required."),
  code_ref: Yup.string().required("Reference Code is required."),
  description: Yup.string().required("Description is required."),
});

// ----- FORMIK & YUP FORM VAIDATION ---------- //
