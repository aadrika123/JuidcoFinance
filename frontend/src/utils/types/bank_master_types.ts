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
  ulb_id: number;
  bank_id: number;
  bank?: BankType;
  ifsc_code: string;
  branch: string;
  micr_code: string | undefined;
  branch_address: string;
  branch_city: string;
  branch_state: string;
  branch_district: string | undefined;
  email: string | undefined;
  contact_no: string | undefined;
}
