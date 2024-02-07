export interface VoucherDataProps {
  id?: number | string;
  // voucher_no: number;
  voucher_date: string;
  voucher_type_id: number;
  // voucher_type_id_name: string;
  narration: string;
  department_id: number;
  adminis_ward_id: number;
  voucher_sub_id: number;
  sub_ledger_id: number;
  amount: number;
  dr_cr: number | string;
  // total?: number;
}
