export interface BudgetReApproDetailsData {
  id?: number | string;
  fin_year_id_name?: string;
  fin_year_id: number | string;
  primary_acc_code_id_name?: string;
  primary_acc_code_id: number | string;
  transaction_date: string;
  remark: string;
  budget_name_id_name?: string;
  budget_name_id: number | string;
  actual_amount?: number | string;
  from_primary_acc_code_id: number | string;
  from_primary_acc_code_id_name?: string;
  approved_amount?: number | string;
  balance_amount?: number | string;
  transfer_amount?: number | string;
}

export interface ResponseData {
  data: {
    data: {
      fin_year: { id: number };
      primary_acc_code: { id: number };
      transaction_date: string;
      remark: string;
      budget_name: { id: number };
      actual_amount: number | string;
      from_primary_acc_code: number | string;
      approved_amount?: number | string;
      balance_amount?: number | string;
      transfer_amount?: number | string;
    };
  };
}
