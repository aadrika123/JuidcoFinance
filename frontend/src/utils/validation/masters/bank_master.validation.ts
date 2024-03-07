import { AddBankDetailsData } from "@/utils/types/bank_master_types";
import * as Yup from "yup";

export const AddBankDetailsSchema = Yup.object().shape({
  bank_type_id: Yup.number().required("Bank type is required").notOneOf([-1], "Bank type is required"),
  ulb_id: Yup.number().required("ULB name is required.").notOneOf([-1], "ULB name is required."),
  bank_id: Yup.number().required("Bank name is required").notOneOf([-1], "Bank name is required."),
  ifsc_code: Yup.string().required("IFSC Code is required"),
  branch: Yup.string().required("Branch Name is required"),
  micr_code: Yup.string(),
  branch_address: Yup.string().required("Branch Address is required"),
  contact_no: Yup.string().matches(/^\d{10}$/, "Invalid phone number"),
  branch_city: Yup.string().required("Branch City is required"),
  branch_district: Yup.string(),
  branch_state: Yup.string().required("Branch State is required"),
  email: Yup.string().email("Invalid email address"),
});

// export const initialBankDetailsValues: AddBankDetailsData = {
//   bank_type_id: -1,
//   ulb_id: -1,
//   bank_id: -1,
//   ifsc_code: "",
//   branch: "",
//   micr_code: undefined,
//   branch_address: "",
//   contact_no: undefined,
//   branch_city: "",
//   branch_district: undefined,
//   branch_state: "",
//   email: undefined,
// };

export const initialBankDetailsValues: AddBankDetailsData = {
  bank_type_id: 1,
  ulb_id: 1,
  bank_id: 1,
  ifsc_code: "38734",
  branch: "Ranchi",
  micr_code: undefined,
  branch_address: "Lower Chutia, Ranchi",
  contact_no: undefined,
  branch_city: "Ranchi",
  branch_district: undefined,
  branch_state: "Jharkhand",
  email: undefined,
};

