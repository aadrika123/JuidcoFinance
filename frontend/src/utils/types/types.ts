// Sidebar Types
export type SidebarModule = {
  moduleName: string;
  path: string;
  icon?: React.ReactElement;
  subModules?: SidebarModule[];
};

export type SidebarLinksProps = {
  modules: SidebarModule[];
};
// Sidebar Types

// Bank Master Types //
export type AccountTableData = {
  id: number;
  bank_name: string;
  ifsc_code: string;
  branch: string;
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

// Bank Master Types //

// Chart of Accounts Types //
export type AccountingTableData = {
  major_head: string;
  minor_head: string;
  detail_code: string;
  description: string;
};

export type FunctionTableData = {
  group: string;
  description_code: string;
  cost_center: string;
  description: string;
};

export type MuncipalityTableData = {
  ulbs: string;
  district: string;
  state_code: string;
  district_code: string;
  category: string;
  code: string;
};
// Chart of Accounts Types //
