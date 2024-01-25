import * as Yup from "yup";

// ----- FORMIK & YUP FORM VAIDATION ---------- //
export const PaymenttDetailsSchema = Yup.object().shape({
  paymentDate: Yup.string().required("Payment Date is required"),
  narration: Yup.string().required("Narration is required"),
  paymentType: Yup.string().required("Payment Type is required"),
  department: Yup.string().required("Department is required"),
  payeeName: Yup.string().required("Payee Name is required"),
  administrativeWard: Yup.string().required("Administrative Ward is required"),
  grant: Yup.string().required("Grant is required"),
  address: Yup.string().required("Address is required"),
});

export const initialPaymenttDetails = {
  paymentDate: "",
  narration: "",
  paymentType: "",
  department: "",
  payeeName: "",
  administrativeWard: "",
  grant: "",
  address: "",
};

// ----- FORMIK & YUP FORM VAIDATION ---------- //
