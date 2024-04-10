export interface CashBankRVoucherData {
  id?: number | string;
  ulb_id: number | string;
  bank_id: number | string;
  primary_acc_code_id: number | string;
  pay_in_slip_ref_no?: string;
  pay_in_slip_date?: string;
  voucher_date: string;
  crv_brv_no: string;
  amount: number | string;
  is_approved: boolean;
  checked_by_id?: number | string;
  checked_by_print_name?: string;
  approved_by_id?: number | string;
  approved_by_print_name?: string;
}

export interface ResponseData {
  data: {
    data: {
      id: number;
      ulb_id: {id: number, ulb: string};
      bank_id: {id: number, fund_id: number, bank_acc_no: string, name: string};
      primary_acc_code_id: {id: number, description: string};
      pay_in_slip_ref_no?: string;
      pay_in_slip_date?: string;
      voucher_date: string;
      crv_brv_no: string;
      amount: number
      is_approved: boolean;
      checked_by_id?: {id: number, name: string, role: []};
      checked_by_print_name?: string;
      approved_by_id?: {id: number, name: string, role: []};
      approved_by_print_name?: string;
    };
  };
}
