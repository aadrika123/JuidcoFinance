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

export interface ReceiptDataProps {
  id?: number | string;
  date: string;
  email: string;
  receipt_no: string;
  module_id: number | string;
  module_id_name?: string;
  paid_by: string;
  receipt_type_id: number | string;
  receipt_type_id_name?: string;
  mobile_no: string;
  admin_ward_id: number | string;
  admin_ward_id_name?: string;
  narration: string;
  subledger_id: number | string;
  subledger_id_name?: string;
  amount: number | string;
}


export interface ResponseData {
  data: {
    status: boolean;
    data: {
      date: string;
      email: string;
      receipt_no: string;
      module: {id: number};
      paid_by: string;
      receipt_type: {id: number};
      mobile_no: string;
      admin_ward: {id: number};
      narration: string;
      subledger: {id: number},
      amount: number,
    };
  };
}
