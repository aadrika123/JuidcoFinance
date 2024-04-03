export interface LoanManagementDetailsData {
  id?: number | string;
  ulb_id_name?: string;
  ulb_id: number | string;
  primary_acc_code_id_name?: string;
  primary_acc_code_id: number | string;
  purpose_of_loan?: string;
  department_id_name?: string;
  department_id: number | string;
  resolution_date?: string;
  loan_no?: string;
  loan_sanctioned_amount: number | string;
  interest_rate: string | number;
  instalments_no: number | string;
  instalment_amount: number | string;
  receipt_date?: string;
  received_amount: number | string;
  total_received_amount: number | string;
  repayment_due_date?: string;
  principal_amount: number | string;
  interest_amount: number | string;
  total_due_amount_to_repayment: number | string;
  officer_id_name?: string;
  officer_id: number | string;
  repaid_repayment_date?: string;
  repaid_principal_amount: number | string;
  repaid_interest: number | string;
  repaid_total_amount: number | string;
  balance_principal_amount: number | string;
  balance_interest: number | string;
  balance_total_amount: number | string;
  balance_remarks?: string;
  employee_id_name?: string;
  employee_id: number | string;
  designation_id_name?: string;
  designation_id: number | string;
}

export interface ResponseData {
  data: {
    data: {
      ulb: { id: number };
      primary_acc_code: { id: number };
      purpose_of_loan: string;
      department: { id: number };
      resolution_date: string;
      loan_no: string;
      loan_sanctioned_amount: number;
      interest_rate: number;
      instalments_no: number;
      instalment_amount: number;
      receipt_date: string;
      received_amount: number;
      total_received_amount: number;
      repayment_due_date: string;
      principal_amount: number;
      interest_amount: number;
      total_due_amount_to_repayment: number;
      officer: { id: number };
      repaid_repayment_date: string;
      repaid_principal_amount: number;
      repaid_interest: number;
      repaid_total_amount: number;
      balance_principal_amount: number;
      balance_interest: number;
      balance_total_amount: number;
      balance_remarks: string;
      employee: { id: number };
      designation: { id: number };
    };
  };
}
