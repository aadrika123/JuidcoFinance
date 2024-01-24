export type PaymentTableData = {
  id: number;
  paymentNo: string;
  paymentName: string;
  paymentType: string;
  amount: number;
  ledgerCode: string;
  budgetName: string;
};

export interface AddPaymentDetailsData {
  // paymentNo: string,
  // paymentName: string,
  // paymentType: string,
  // amount: number,
  // ledgerCode: string,
  // budgetName: string
  ////////////////////
//   paymentDate: string;
//   narration: string;
//   paymentType: number;
//   department: number;
//   payeeName: string;
//   administrativeWard: number;
//   grant: number;
//   address: string;
  ///////////////
  paymentDate: string;
  narration: string;
  paymentType: string;
  department: string;
  payeeName: string;
  administrativeWard: string;
  grant: string;
  address: string;
}
