import { Response } from "express";

interface CandidateType {
  id: string;
  name: string;
  skills: string | string[];
  experience: string;
  profilePic?: string;
}

interface ApiResponse {
  json: any;
  responseCode: number;
  res: Response;
  status?: boolean | true;
}

interface BankRequestData {
  bank_name: string;
  ifsc_code: string;
  branch: string;
  micr_code: string;
  branch_address: string;
  branch_city: string;
  branch_state: string;
  branch_district: string;
  email: string;
  contact_no: string;
  contact_person_name: string;
}
interface VendorRequestData {
  vendor_type_id: number;
  vendor_no: string;
  name: string;
  mobile_no: string;
  tin_no: string;
  pan_no: string;
  bank_name: string;
  ifsc_code: string;
  department_id: number;
  email: string;
  contact_address: string;
  gst_no: string;
  aadhar_no: string;
  bank_account_no: string;
  bank_branch_name: string;
}

interface ChequebookRequestData {
  date: Date;
  issuer_name: string;
  bank_name: string;
  bank_account_no: string;
  cheque_no_from: string;
  employee_id: number;
  bank_branch: string;
  page_count: number;
  cheque_no_to: string;
  cheque_book_return: boolean;
  cheque_book_return_date: Date;
}

interface DirPaymentEntryRequestData {
  payment_date: string;
  payment_no: number;
  payment_type_id: number;
  payee_name: string;
  narration: string;
  grant_id: number;
  user_common_budget: boolean;
  adminis_ward_id: number;
  address: string;
  department_id: number;
  email: string;
  payment_mode: string;
  amount: number;
}

// interface VoucherEntryRequestData {
//   id: number
//   voucher_no : number
//   voucher_date : string
//   voucher_type: string
//   voucher_type_id;
//   narration;
//   department;
//   department_id;
//   adminis_ward;
//   adminis_ward_id;

//   amount;
//   dr_cr;
//   total;
//   created_at;
//   updated_at;
// }

export type {
  CandidateType,
  ApiResponse,
  BankRequestData,
  VendorRequestData,
  ChequebookRequestData,
  DirPaymentEntryRequestData,
};
