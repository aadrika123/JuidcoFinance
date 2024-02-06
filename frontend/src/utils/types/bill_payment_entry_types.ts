type PaymentType = {
  id: number;
  type: string;
};

export type BillPaymentTableData = {
  id: number;
  payment_no: number;
  payee_name: string;
  payment_type: PaymentType;
  amount: number;
};

export interface BillPaymentDetailsData {
  bill_entry_date: string;
  bill_number: string;
  bill_type_id: number | string;
  department_id: number | string;
  payee_id: string;
  adminis_ward_id: number | string;
  vendor_name: number | string;
  address: string;
  amount: number | string;
  advance: string;
  deposite: string;
  other_deduction: number | string;
}
