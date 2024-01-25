import { VendorDetailsData } from "@/utils/types/vendor_master_types";
import * as Yup from "yup";

// ----- FORMIK & YUP FORM VAIDATION ---------- //

export const VendorDetailsSchema = Yup.object().shape({
  vendorType: Yup.string().required("Vendor type is required"),
  mobileNo: Yup.string()
    .matches(/^\d{10}$/, "Invalid mobile number")
    .required("Mobile Number is required"),
  departmentId: Yup.number().required("Department is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  name: Yup.string().required("Vendor Name is required"),
  bankName: Yup.string().required("Bank Name is required"),

  contactAddress: Yup.string().required("Contact address is required"),
  ifscCode: Yup.string().required("IFSC code is required"),
  tinNo: Yup.string().required("TIN No. is required"),

  bankAccountNo: Yup.string().required("Bank account no. is required"),
  gstNo: Yup.string().required("GST No. Name is required"),
  bankBranchName: Yup.string().required("Bank Branch Name is required"),
  aadharNo: Yup.string().required("Aaadhaar number is required"),
  panNo: Yup.string().required("Pan number is required"),
});

export const initialVendorDetails: VendorDetailsData = {
  id: 0,
  vendor_type: {
    id: 0,
    name: "",
  },
  department: {
    id: 0,
    name: "",
  },
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
  is_authorized: false,
  created_at: "",
  authorized_date: null,
  updated_at: "",
};

// ----- FORMIK & YUP FORM VAIDATION ---------- //
