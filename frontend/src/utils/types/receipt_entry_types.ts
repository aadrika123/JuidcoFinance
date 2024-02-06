// Bank Master Types //
export type ReceiptTableData = {
  id: number;
  date: Date;
  receipt_no: string;
  subledger_id: number;
  paid_by: string;
  amount: number;
  narration: string;
};


export interface AddReceiptDetailsData {
  receiptNo: string,
  receiptDate: string,
  subLedger: string,
  paidBy: string,
  amount: number,
  narration: string,
}