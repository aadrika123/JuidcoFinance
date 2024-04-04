import * as Yup from "yup";


export interface AddBankDetailsData {
  id?: number;

  bank_type_id: number;
  bank_type?: string;
  
  ulb_id: number;
  ulb?: string;

  bank_id: number;
  bank?: string;
  
  ifsc_code: string;
  branch: string;
  micr_code: string;
  branch_address: string;
  branch_city: string;
  branch_state: string;
  branch_district: string;
  email: string;
  contact_no: string;
}


export const AddBankDetailsSchema = Yup.object().shape({
  bank_type_id: Yup.number().required("Bank type is required").notOneOf([-1], "Bank type is required"),
  ulb_id: Yup.number().required("ULB name is required.").notOneOf([-1], "ULB name is required."),
  bank_id: Yup.number().required("Bank name is required").notOneOf([-1], "Bank name is required."),
  ifsc_code: Yup.string().required("IFSC Code is required"),
  branch: Yup.string().required("Branch Name is required"),
  micr_code: Yup.string().nullable(),
  branch_address: Yup.string().required("Branch Address is required"),
  contact_no: Yup.string().matches(/^\d{10}$/, "Invalid phone number").nullable(),
  branch_city: Yup.string().required("Branch City is required"),
  branch_district: Yup.string().nullable(),
  branch_state: Yup.string().required("Branch State is required"),
  email: Yup.string().email("Invalid email address").nullable(),
});

export const initialBankDetailsValues: AddBankDetailsData = {
  bank_type_id: -1,
  ulb_id: -1,
  bank_id: -1,
  ifsc_code: "",
  branch: "",
  micr_code: "",
  branch_address: "",
  contact_no: "",
  branch_city: "",
  branch_district: "",
  branch_state: "",
  email: "",
};

// export const initialBankDetailsValues: AddBankDetailsData = {
//   bank_type_id: 1,
//   ulb_id: 1,
//   bank_id: 1,
//   ifsc_code: "38734",
//   branch: "Ranchi",
//   branch_address: "Lower Chutia, Ranchi",
//   branch_city: "Ranchi",
//   branch_state: "Jharkhand",
//   micr_code: "",
//   branch_district: "",
//   email: "",
//   contact_no: ""
// };


// backend things 


export interface BankRequestData {
  bank_id: number;
  ulb_id: number;
  bank_type_id: number;
  ifsc_code: string;
  branch: string;
  micr_code: string;
  branch_address: string;
  branch_city: string;
  branch_state: string;
  branch_district: string;
  email: string;
  contact_no: string;
}


// Validating request data

const bankMasterValidation = Yup.object({
  id: Yup.number(),
  bank_id: Yup.number().required(),
  bank_type_id: Yup.number().required(),
  ulb_id: Yup.number().required(),
  ifsc_code: Yup.string().required(),
  branch: Yup.string().required(),
  micr_code: Yup.string(),
  branch_address: Yup.string().required(),
  branch_city: Yup.string().required(),
  branch_state: Yup.string().required(),
  branch_district: Yup.string(),
  email: Yup.string().email({ tlds: { allow: false } }),
  contact_no: Yup.string().matches(/^\d{10}$/, "Invalid phone number").nullable(),
})


// validating updation data
const bankMasterUpdateValidation = Yup.object({
  id: Yup.number().required(),
  bank_id: Yup.number(),
  bank_type_id: Yup.number(),
  ulb_id: Yup.number(),
  ifsc_code: Yup.string(),
  branch: Yup.string(),
  micr_code: Yup.string(),
  branch_address: Yup.string(),
  branch_city: Yup.string(),
  branch_state: Yup.string(),
  branch_district: Yup.string(),
  email: Yup.string().email({ tlds: { allow: false } }),
  contact_no: Yup.string().matches(/^\d{10}$/, "Invalid phone number").nullable(),
});


// arrange request data for store
const requestData = (data: any): BankRequestData => {
  return {
    bank_id: data.bank_id,
    ulb_id: data.ulb_id,
    bank_type_id: data.bank_type_id,
    ifsc_code: data.ifsc_code,
    branch: data.branch,
    micr_code: data.micr_code,
    branch_address: data.branch_address,
    branch_city: data.branch_city,
    branch_state: data.branch_state,
    branch_district: data.branch_district,
    email: data.email,
    contact_no: data.contact_no,
  };
};


export default {
  requestData,
  bankMasterUpdateValidation,
  bankMasterValidation
}