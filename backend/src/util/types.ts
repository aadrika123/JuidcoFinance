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
  comm_address: string;
  tin_no: string;
  pan_no: string;
  bank_name: string;
  ifsc_code: string;
  department_id: number;
  email: string;
  office_address: string;
  gst_no: string;
  aadhar_no: string;
  bank_account_no: string;
  bank_branch_name: string;
}

interface ChequebookRequestData {
  date: string;
  bank_name: string;
  bank_account_no: string;
  cheque_no_from: string;
  employee_id: number;
  bank_branch: string
  page_count: string
  cheque_no_to: string
  issuer_name: string
  cheque_book_return: boolean,
  cheque_book_return_date: string
}

export type { CandidateType, ApiResponse, BankRequestData, VendorRequestData, ChequebookRequestData};
