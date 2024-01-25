import * as Yup from "yup";

// ----- FORMIK & YUP FORM VAIDATION ---------- //
export const CheckbookDetailsSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank Name is required"),
  ifscCode: Yup.string().required("IFSC Code is required"),
  branch: Yup.string().required("Branch Name is required"),
  micrCode: Yup.string().required("Micr Code is required"),
  branchAddress: Yup.string().required("Branch Address is required"),
  branchCity: Yup.string().required("Branch City is required"),
  branchState: Yup.string().required("Branch State is required"),
  branchDistrict: Yup.string().required("Branch District is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contactNo: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Contact Number is required"),
  contactPersonName: Yup.string().required("Contact Person Name is required"),
});

export const initialChequebookDetails = {
  bankName: "",
  ifscCode: "",
  branch: "",
  micrCode: "",
  branchAddress: "",
  branchCity: "",
  branchState: "",
  branchDistrict: "",
  email: "",
  contactNo: "",
  contactPersonName: "",
};

// ----- FORMIK & YUP FORM VAIDATION ---------- //
