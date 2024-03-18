export interface VoucherEntryDetailsData {
id?: number | string;
voucher_type_id_name?: string;
voucher_type_id: number | string;
ulb_id_name?: string;
ulb_id: number | string;
date?: string;
fund_id_name?: string;
fund_id: number | string;
journal_voucher_no?: string;
bank_id_name?: string;
bank_id: number | string;
payment_date?: string;
department_id_name?: string;
department_id: number | string;
pay_slip_ref_no?: string;
pay_slip_date?: string;
crv_bpv_no?: string;
receipt_date?: string;
primary_acc_code_id_name?: string;
primary_acc_code_id: number | string;
payment_order_no?: string;
acc_description?: string;
debit_amount: number | string;
credit_amount: number | string;
remittance_money_no?: string;
amount: number | string;
cheque_no?: string;
total_amount: number | string;
amount_in_words?: string;
prepared_by?: string;
prepared_by_date?: string;
verified_by_id_name?: string;
verified_by_id: number | string;
verified_by_date?: string;
approved_by_id_name?: string;
approved_by_id: number | string;
approved_by_date?: string;
posted_by_id_name?: string;
posted_by_id: number | string;
posted_by_date?: string;
receiver_name?: string;
}


export interface ResponseData {
 data: { 
 data: {
voucher_type: { id: number };
ulb: { id: number };
date: string;
fund: { id: number };
journal_voucher_no: string;
bank: { id: number };
payment_date: string;
department: { id: number };
pay_slip_ref_no: string;
pay_slip_date: string;
crv_bpv_no: string;
receipt_date: string;
primary_acc_code: { id: number };
payment_order_no: string;
acc_description: string;
debit_amount: number;
credit_amount: number;
remittance_money_no: string;
amount: number;
cheque_no: string;
total_amount: number;
amount_in_words: string;
prepared_by: string;
prepared_by_date: string;
verified_by: { id: number };
verified_by_date: string;
approved_by: { id: number };
approved_by_date: string;
posted_by: { id: number };
posted_by_date: string;
receiver_name: string;
},
 },
 }