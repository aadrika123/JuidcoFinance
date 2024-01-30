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
  payment_date: string;
  narration: string;
  payment_type_id: number | string;
  department_id: number | string;
  payee_name: string;
  adminis_ward_id: number | string;
  grant_id: number | string;
  address: string;
  amount: number | string;
  user_common_budget: boolean | string;
  payment_mode: string;
}
