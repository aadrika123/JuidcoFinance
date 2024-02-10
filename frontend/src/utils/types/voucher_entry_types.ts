export interface VoucherDataProps {
  id?: number | string;
  // voucher_no: number;
  voucher_date: string;
  voucher_type_id: number;
  voucher_type_id_name?: string;
  narration: string;
  department_id: number;
  department_id_name?: string;
  adminis_ward_id: number;
  adminis_ward_id_name?: string;
  voucher_sub_id: number;
  voucher_sub_id_name?: string;
  sub_ledger_id: number;
  sub_ledger_id_name?: string;
  amount?: number;
  dr_cr: string;
  // total?: number;
}
