export interface InvestmentsDetailsData {
  id?: number | string;
  ulb_id_name?: string;
  ulb_id: number | string;
  primary_acc_code_id_name?: string;
  primary_acc_code_id: number | string;
  investment_no?: string;
  authorization_date?: string;
  investment_date?: string;
  particulars?: string;
  investment_type_id_name?: string;
  investment_type_id: number | string;
  purchase_amount?: number | string;
  face_value_amount?: number | string;
  interest_due_date?: string;
  interest_due_amount?: number | string;
  employee_id_name?: string;
  employee_id: number | string;
  interest_recovered_amount?: number | string;
  interest_recovery_date?: string;
  acc_adj_recovery_date?: string;
  realization_final_amount?: number | string;
  realization_date?: string;
  acc_adj_realization_date?: string;
  remarks?: string;
}

export interface ResponseData {
  data: {
    data: {
      ulb: { id: number };
      primary_acc_code: { id: number };
      investment_no: string;
      authorization_date: string;
      investment_date: string;
      particulars: string;
      investment_type: { id: number };
      purchase_amount?: number | string;
      face_value_amount?: number | string;
      interest_due_date: string;
      interest_due_amount?: number | string;
      employee: { id: number };
      interest_recovered_amount?: number | string;
      interest_recovery_date: string;
      acc_adj_recovery_date: string;
      realization_final_amount?: number | string;
      realization_date: string;
      acc_adj_realization_date: string;
      remarks: string;
    };
  };
}
