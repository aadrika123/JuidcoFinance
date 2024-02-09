type PaymentType = {
  id: number;
  type: string;
};

export type PaymentTableData = {
  id: number;
  payment_no: number;
  payee_name: string;
  payment_type: PaymentType;
  amount: number;
};

export interface AddPaymentDetailsData {
  ledger_code_id: number;
  payment_date: string;
  narration: string;
  payment_type_id: number | string;
  department_id: number | string;
  payee_name: string;
  adminis_ward_id: number | string;
  grant_id: number | string;
  address: string;
  user_common_budget: boolean;
  payment_mode: string;
  amount?: number| string;
}

//////////////////////////////////////////////////////////////////////////////////////////

export interface DirPaymentDataProps {
  id?: number | string;
  payment_date: string;
  payment_type_id: number | string;
  payment_type_id_name?: string;
  narration: string;
  department_id: number | string;
  department_id_name?: string;
  adminis_ward_id: number | string;
  adminis_ward_id_name?: string;
  payee_name_id: number | string;
  payee_name_id_name?: string;
  sub_ledger_id: number | string;
  sub_ledger_id_name?: string;
  grant_id: number | string;
  grant_id_name?: string;
  amount?: number;
  address?: string;
  payment_mode: string;
  user_common_budget: boolean | string;
}

////////////////// Response Data Type //////////////////
export interface ResponseData {
  data: {
    data: {
      payment_date: string;
      payment_type: { id: number };
      narration: string;
      department: { id: number };
      adminis_ward: { id: number };
      payee_name: { id: number };
      sub_ledge: { id: number };
      amount: number;
      payment_mode: string;
      user_common_budget?: boolean;
      address: string;
      grant: { id: number };
    };
  };
}
