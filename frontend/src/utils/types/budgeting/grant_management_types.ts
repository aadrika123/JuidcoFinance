export interface GrantManagementDetailsData {
id?: number | string;
ulb_id_name?: string;
ulb_id: number | string;
primary_acc_code_id_name?: string;
primary_acc_code_id: number | string;
sanction_number?: string;
grant_id_name?: string;
grant_id: number | string;
grant_nature_id_name?: string;
grant_nature_id: number | string;
employee_id_name?: string;
employee_id: number | string;
sanctioned_amount?: number | string;
grant_from_date?: string;
grant_to_date?: string;
advance_amount?: number | string;
advance_rcving_date?: string;
expenditure_date?: string;
voucher_id_name?: string;
voucher_id: number | string;
expenditure_nature_id_name?: string;
expenditure_nature_id: number | string;
refund_date?: string;
refund_amount?: number | string;
}


export interface ResponseData {
 data: { 
 data: {
ulb: { id: number };
primary_acc_code: { id: number };
sanction_number: string;
grant: { id: number };
grant_nature: { id: number };
employee: { id: number };
sanctioned_amount?: number | string;
grant_from_date: string;
grant_to_date: string;
advance_amount?: number | string;
advance_rcving_date: string;
expenditure_date: string;
voucher: { id: number };
expenditure_nature: { id: number };
refund_date: string;
refund_amount?: number | string;
},
 },
 }