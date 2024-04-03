

export type BillInvoiceTableData = {
  id: number;
  bill_no: string;
  vendor: string;
  department: string;
  amount: number;
};

export interface BillInvoiceDetailsData {
  id?: number | string;
  entry_date: string;
  type_id: number | string;
  type_id_name?: string;
  bill_no: string;
  department_id: number | string;
  department_id_name?: string;
  admin_ward_id: number | string;
  admin_ward_id_name?: string;
  bill_date: string;
  stage_id: number | string;
  stage_id_name?: string;
  vendor_id: number | string;
  vendor_id_name?: string;
  amount: number | string;
  address: string;
  narration: string;
  is_authorized?: boolean;
}

///////////// Response Data ////////////////////
export interface ResponseData {
  data: {
    data: {
      entry_date: string;
      type: { id: number; name: string };
      bill_no: string;
      department: { id: number };
      adminis_ward: { id: number };
      bill_date: string;
      bill_stage: { id: number; name: string };
      payee: { id: number };
      vendor: { id: number };
      amount: number;
      address: string;
      narration: string;
      is_authorized: boolean;
    };
  };
}
