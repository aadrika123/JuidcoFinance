export interface ReceiptBudgetDetailsData {
  id?: number | string;
  fin_year_id_name?: string;
  fin_year_id: number | string;
  department_id_name?: string;
  department_id: number | string;
  primary_acc_code_id_name?: string;
  primary_acc_code_id: number | string;
  admin_ward_id_name?: string;
  admin_ward_id: number | string;
  budget_type_id_name?: string;
  budget_type_id: number | string;
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
