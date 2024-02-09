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
  bill_number: string;
  bill_type_id: number | string;
  department_id: number | string;
  department_id_name?: string;
  payee_name_id: number | string;
  payee_name_id_name?: string;
  adminis_ward_id: number | string;
  adminis_ward_id_name?: string;
  vendor_name_id: number | string;
  vendor_name_id_name?: string;
  address: string;
  bill_amount: number | string;
  advance: number | string;
  deposit: number | string;
  other_deduction: number | string;
}

///////////// Response Data ////////////////////
export interface ResponseData {
  data: {
    data: {
      bill_entry_date: string;
      bill_type: { id: number };
      bill_number: string;
      department: { id: number };
      adminis_ward: { id: number };
      payee_name: { id: number };
      vendor_name: { id: number };
      bill_amount: number;
      address: string;
      deposit: number;
      other_deduction: number;
      advance: number;
    };
  };
}
