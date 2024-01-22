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

export type { CandidateType, ApiResponse, BankRequestData };
