export interface OpeningBalanceDetailsData {
  id?: number | string;
  fin_year_id_name?: string;
  fin_year_id: number | string;
  dr_cr?: number | string;
  primary_acc_code_id_name?: string;
  primary_acc_code_id: number | string;
  amount?: number | string;
}

export interface ResponseData {
  data: {
    data: {
      fin_year: { id: number };
      dr_cr?: number | string;
      primary_acc_code: { id: number };
      amount?: number | string;
    };
  };
}
