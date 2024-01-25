import { AddBankDetailsData } from "@/utils/types/bank_master_types";
import * as Yup from "yup";

export const AddBankDetailsSchema = Yup.object().shape({
  bank_name: Yup.string().required("Bank Name is required"),
  ifsc_code: Yup.string().required("IFSC Code is required"),
  branch: Yup.string().required("Branch Name is required"),
  micr_code: Yup.string().required("Micr Code is required"),
  branch_address: Yup.string().required("Branch Address is required"),
  branch_city: Yup.string().required("Branch City is required"),
  branch_state: Yup.string().required("Branch State is required"),
  branch_district: Yup.string().required("Branch District is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contact_no: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Contact Number is required"),
  contact_person_name: Yup.string().required("Contact Person Name is required"),
});

export const initialBankDetailsValues: AddBankDetailsData = {
  bank_name: "",
  ifsc_code: "",
  branch: "",
  micr_code: "",
  branch_address: "",
  branch_city: "",
  branch_state: "",
  branch_district: "",
  email: "",
  contact_no: "",
  contact_person_name: "",
};
