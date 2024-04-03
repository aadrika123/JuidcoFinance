import * as Yup from "yup";

// ----- FORMIK & YUP FORM VAIDATION ---------- //
export const ChequebookDetailsSchema = Yup.object().shape({
  date: Yup.string().required("Cheque issue date is required!"),
  bank_branch: Yup.string().required("Name of the branch is required."),
  bank_id: Yup.number().required("Name of the bank is required."),
  bank_account_no: Yup.string().required("Bank account no is required."),
  cheque_no_from: Yup.string().required("Starting cheque number is required."),
  cheque_no_to: Yup.string().required("Ending cheque number is required."),
  employee_id: Yup.number().required("Employee is required."),
  issuer_name: Yup.string().required("Issuer name is required."),
  page_count: Yup.number().required("Page count is required."),
  remarks: Yup.string().required("Remarks is required!"),
});

export const initialChequebookDetails = {
  bankId: "",
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
