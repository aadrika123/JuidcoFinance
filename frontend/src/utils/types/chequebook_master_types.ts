import { EmployeeDetailsData } from "./employee_types";

// Bank Master Types //
export type ChequebookTableData = {
  id: number;
  date: string,
  bank_branch: string,
  bank_name: string,
  bank_account_no: string,
  cheque_no_from: string,
  cheque_no_to: string,
  employe_id: number,
  employee: EmployeeDetailsData,
  issuer_name: string,
  ifsc_code: string,
  page_count: number,
  remarks: string,
};


export interface AddChequebookDetailsData {
  date: string,
  bank_branch: string,
  bank_name: string,
  bank_account_no: string,
  cheque_no_from: string,
  cheque_no_to: string,
  employee_id: number,
  employee: EmployeeDetailsData,
  issuer_name: string,
  ifsc_code: string,
  page_count: number,
  remarks: string,
}