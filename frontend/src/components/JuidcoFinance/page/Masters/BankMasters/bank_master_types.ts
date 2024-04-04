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


