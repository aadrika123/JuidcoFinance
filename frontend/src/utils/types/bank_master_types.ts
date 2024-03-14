// Bank Master Types //
type BankType = {
 id: number;
 name: string;
}

export type AccountTableData = {
  id: number;
  bank: BankType;
  ifsc_code: string;
  branch: string;
};

export interface AddBankDetailsData {
  id?: number;

  bank_type_id: number;
  bank_type?: string;
  
  ulb_id: number;
  ulb?: string;

  bank_id: number;
  bank?: string;
  
  ifsc_code: string;
  branch: string;
  micr_code: string;
  branch_address: string;
  branch_city: string;
  branch_state: string;
  branch_district: string;
  email: string;
  contact_no: string;
}
