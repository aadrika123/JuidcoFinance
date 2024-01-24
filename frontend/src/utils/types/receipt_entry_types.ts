// Bank Master Types //
export type ReceiptTableData = {
  id: number;
  receiptNo: string,
  receiptDate: string,
  subLedger: string,
  paidBy: string,
  amount: number,
  narration: string,
};


export interface AddReceiptDetailsData {
  receiptNo: string,
  receiptDate: string,
  subLedger: string,
  paidBy: string,
  amount: number,
  narration: string,
}