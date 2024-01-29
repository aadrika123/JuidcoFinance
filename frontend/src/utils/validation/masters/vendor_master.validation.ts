import { VendorDetailsData } from "@/utils/types/vendor_master_types";
import * as Yup from "yup";

// ----- FORMIK & YUP FORM VAIDATION ---------- //
export const VendorDetailsSchema = Yup.object().shape({
  vendor_type_id: Yup.number().required("Vendor type is required"),
  department_id: Yup.number().required("Department is required"),
  name: Yup.string().required("Vendor Name is required"),
  mobile_no: Yup.string()
    .matches(/^\d{10}$/, "Invalid mobile number")
    .required("Mobile Number is required"),
  tin_no: Yup.string().required("TIN No. is required"),
  gst_no: Yup.string().required("GST No. Name is required"),
  comm_address: Yup.string().required("Contact address is required"),
  pan_no: Yup.string().required("Pan number is required"),
  bank_name: Yup.string().required("Bank Name is required"),
  ifsc_code: Yup.string().required("IFSC code is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  office_address: Yup.string().required("Office address is required"),
  aadhar_no: Yup.string().required("Aaadhaar number is required"),
  bank_account_no: Yup.string().required("Bank account no. is required"),
  bank_branch_name: Yup.string().required("Bank Branch Name is required"),
});

export const initialVendorDetails: VendorDetailsData = {
  vendor_type_id: 0,
  department_id: 0,
  name: "",
  mobile_no: "",
  tin_no: "",
  gst_no: "",
  comm_address: "",
  pan_no: "",
  bank_name: "",
  ifsc_code: "",
  email: "",
  office_address: "",
  aadhar_no: "",
  bank_account_no: "",
  bank_branch_name: "",
};

// ----- FORMIK & YUP FORM VAIDATION ---------- //
