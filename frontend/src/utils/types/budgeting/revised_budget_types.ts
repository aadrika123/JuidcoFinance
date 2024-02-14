export interface RevisedBudgetDetailsData {
  id?: number | string;
  primary_acc_code_id_name?: string;
  primary_acc_code_id: number | string;
  approved_amount?: number | string;
  revised_amount?: number | string;
  remark?: string;
}

export interface ResponseData {
  data: {
    data: {
      primary_acc_code: { id: number };
      approved_amount?: number | string;
      revised_amount?: number | string;
      remark: string;
    };
  };
}
