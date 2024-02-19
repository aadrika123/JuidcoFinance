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
  bank_id: number;
  bank?: BankType;
  ifsc_code: string;
  branch: string;
  micr_code: string;
  branch_address: string;
  branch_city: string;
  branch_state: string;
  branch_district: string;
  email: string;
  contact_no: string;
  contact_person_name: string;
}
