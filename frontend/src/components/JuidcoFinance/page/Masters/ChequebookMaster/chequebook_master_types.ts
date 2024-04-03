import { EmployeeDetailsData } from "../../auth/employee_types";

// Bank Master Types //
export type ChequebookTableData = {
  bank: any;
  id: number;
  date: string,
  bank_branch: string,
  bank_id: number | string,
  bank_account_no: string,
  cheque_no_from: string,
  cheque_no_to: string,
  employe_id: number,
  employee: EmployeeDetailsData,
  issuer_name: string,
  page_count: number,
  remarks: string,
};


export interface AddChequebookDetailsData {
  date: string,
  bank_branch: string,
  bank_id: number | string,
  bank_account_no: string,
  cheque_no_from: string,
  cheque_no_to: string,
  employee_id: number,
  employee: EmployeeDetailsData,
  issuer_name: string,
  page_count: number,
  remarks: string,
}

export interface ChequebookDataProps {
  id?: number | string,
  date: string,
  bank_branch: string,
  bank_id: number | string,
  bank_account_no: string,
  cheque_no_from: string,
  cheque_no_to: string,
  employee_id: number | string,
  issuer_name: string,
  page_count: number | string,
  remarks: string,
}


export interface ResponseData {
  data: {
    status: boolean;
    data: {
      date: string;
      bank_branch: string;
      bank: {id: number};
      bank_account_no: string;
      cheque_no_from: string;
      cheque_no_to: string;
      employee: {id: number};
      issuer_name: string;
      page_count: number;
      remarks: string,
    };
  };
}
