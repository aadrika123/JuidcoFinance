export interface ReceiptBudgetDetailsData {
  id?: number | string;
  fin_year_id_name?: string;
  fin_year_id: number | string;
  primary_acc_code_id_name?: string;
  primary_acc_code_id: number | string;
  amount?: number | string;
}

export interface ResponseData {
  data: {
    data: {
      fin_year: { id: number };
      department: { id: number };
      primary_acc_code: { id: number };
      admin_ward: { id: number };
      budget_type: { id: number };
      amount?: number | string;
    };
  };
}
