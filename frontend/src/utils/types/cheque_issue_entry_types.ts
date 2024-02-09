export interface ChequeIssueEntryData {
  id?: number | string;
  voucher_no: number;
  voucher_date: string;
  bill_type_id: number;
  bill_type_id_name?: string;
  narration: string;
  admin_ward_id: number;
  admin_ward_id_name?: string;
  payee_id: number;
  payee_id_name?: string;
  grant_id: number;
  grant_id_name?: string;
  bank_id: number;
  bank_id_name?: string;
  module_id: number;
  module_id_name?: string;
  issue_date: string;
  cheque_no: string;
  amount: number;
}
