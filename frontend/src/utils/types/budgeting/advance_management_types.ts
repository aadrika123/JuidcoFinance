export interface AdvanceManagementDetailsData {
  id?: number | string;
  ulb_id_name?: string;
  ulb_id: number | string;
  primary_acc_code_id_name?: string;
  primary_acc_code_id: number | string;
  serial_no_of_estimate?: string;
  work_order_no?: string;
  work_name?: string;
  work_nature?: string;
  contract_amount: number | string;
  contractor_name?: string;
  order_sanctioning_the_contract_no?: string;
  order_sanctioning_the_contract_resolution_date?: string;
  order_sanctioning_the_estimate_no?: string;
  order_sanctioning_the_estimate_date?: string;
  voucher_no?: string;
  date?: string;
  amount: number | string;
  officer_id_name?: string;
  officer_id: number | string;
  bill_no?: string;
  bill_date?: string;
  payable_amount: number | string;
  approved_amount: number | string;
  cumulative_approved_amount: number | string;
  pwd_officer_id_name?: string;
  pwd_officer_id: number | string;
  security_deposit_deducted_amount: number | string;
  tds_amount: number | string;
  work_contract_tax_amount: number | string;
  material_issued_recovery_amount: number | string;
  advance_provided_recovery_amount: number | string;
  other_deduction_amount: number | string;
  net_paid_amount: number | string;
  department_id_name?: string;
  department_id: number | string;
  remarks?: string;
}

export interface ResponseData {
  data: {
    data: {
      ulb: { id: number };
      primary_acc_code: { id: number };
      serial_no_of_estimate: string;
      work_order_no: string;
      work_name: string;
      work_nature: string;
      contract_amount: number;
      contractor_name: string;
      order_sanctioning_the_contract_no: string;
      order_sanctioning_the_contract_resolution_date: string;
      order_sanctioning_the_estimate_no: string;
      order_sanctioning_the_estimate_date: string;
      voucher_no: string;
      date: string;
      amount: number;
      officer: { id: number };
      bill_no: string;
      bill_date: string;
      payable_amount: number;
      approved_amount: number;
      cumulative_approved_amount: number;
      pwd_officer: { id: number };
      security_deposit_deducted_amount: number;
      tds_amount: number;
      work_contract_tax_amount: number;
      material_issued_recovery_amount: number;
      advance_provided_recovery_amount: number;
      other_deduction_amount: number;
      net_paid_amount: number;
      department: { id: number };
      remarks: string;
    };
  };
}
