// Bank Master Types //
export type AccountTableData = {
  id: number;
  bank_name: string;
  ifsc_code: string;
  branch: string;
};

export type BankMasterProps<T> = {
  currentPage: number;
  count: number;
  totalPage: number;
  data: T[];
};

export interface AddBankDetailsData {
  bankName: string;
  ifscCode: string;
  branch: string;
  micrCode: string;
  branchAddress: string;
  branchCity: string;
  branchState: string;
  branchDistrict: string;
  email: string;
  contactNo: string;
  contactPersonName: string;
}
