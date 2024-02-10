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
  id?: number | string;
  bill_entry_date: string;
  bill_no: string;
  bill_type_id: number | string;
  department_id: number | string;
  department_id_name?: string;
  payee_id: number | string;
  payee_id_name?: string;
  adminis_ward_id: number | string;
  adminis_ward_id_name?: string;
  vendor_id: number | string;
  vendor_id_name?: string;
  address: string;
  bill_amount: number | string;
  advance: number | string;
  deposit: number | string;
  deductions_amount: number | string;
}

///////////// Response Data ////////////////////
export interface ResponseData {
  data: {
    data: {
      bill_entry_date: string;
      bill_type: { id: number };
      bill_no: string;
      department: { id: number };
      adminis_ward: { id: number };
      payee: { id: number };
      vendor: { id: number };
      bill_amount: number;
      address: string;
      deposit: number;
      deductions_amount: number;
      advance: number;
    };
  };
}
