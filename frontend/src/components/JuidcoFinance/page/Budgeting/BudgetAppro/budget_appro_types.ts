export interface BudgetApproDetailsData {
  id?: number | string;
  fin_year_id_name?: string;
  fin_year_id: number | string;
  primary_acc_code_id_name?: string;
  primary_acc_code_id: number | string;
  remark?: string;
  from_primary_acc_code_id_name?: string;
  from_primary_acc_code_id: number | string;
  approved_amount?: number | string;
  transfer_amount?: number | string;
}

export interface ResponseData {
  data: {
    data: {
      fin_year: { id: number };
      primary_acc_code: { id: number };
      remark: string;
      from_primary_acc_code: { id: number };
      approved_amount?: number | string;
      transfer_amount?: number | string;
    };
  };
}
