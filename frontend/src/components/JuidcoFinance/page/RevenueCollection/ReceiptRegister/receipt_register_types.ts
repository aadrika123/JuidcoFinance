export interface ReceiptRegisterDetailsData {
  id?: number | string;
  receipt_no?: string;
  ulb_id_name?: string;
  ulb_id: number | string;
  primary_acc_code_id_name?: string;
  primary_acc_code_id: number | string;
  revenue_module_id_name?: string;
  revenue_module_id: number | string;
  paid_by?: string;
  receipt_mode_id_name?: string;
  receipt_mode_id: number | string;
  receipt_date?: string;
  cheque_or_draft_no?: string;
  bank_amount: number | string;
  cash_amount: number | string;
  bank_acc_no?: string;
  deposit_date?: string;
  realisation_date?: string;
  wheather_returned?: boolean | string;
  remarks: string;
  entered_by_id?: number | string;
  entered_by_print_name?: string;
  checked_by_id?: number | string;
  checked_by_print_name?: string;
  del_checked_by_name?: string;
  del_checked_by_designation?: string;
  del_entered_by_name?: string;
  del_entered_by_designation?: string;
}

export interface ResponseData {
  data: {
    data: {
      receipt_no: string;
      ulb: { id: number };
      primary_acc_code: { id: number };
      revenue_module: { id: number };
      paid_by: string;
      receipt_mode: { id: number };
      receipt_date: string;
      cheque_or_draft_no: string;
      bank: { id: number };
      cash_amount: number;
      bank_acc_no: string;
      deposit_date: string;
      realisation_date: string;
      wheather_reaturned: string;
      remarks: string;
      entered_by: { id: number };
      entered_by_print_name: string;
      checked_by: { id: number };
      checked_by_print_name: string;
    };
  };
}
