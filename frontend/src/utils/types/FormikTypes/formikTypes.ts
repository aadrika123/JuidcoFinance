import { FormikHelpers } from "formik";
import { VoucherDataProps } from "../voucher_entry_types";
import { DirPaymentDataProps } from "../direct_payment_entry_types";
import { BillPaymentDetailsData } from "../bill_payment_entry_types";
import { ChequeIssueEntryData } from "../cheque_issue_entry_types";
import { ReceiptDataProps } from "../receipt_entry_types";
import { ChequebookDataProps } from "../chequebook_master_types";
import { BillInvoiceDetailsData } from "../bills_invoice_entry_types";
import { ReceiptBudgetDetailsData } from "../budgeting/receipt_budget_types";
import { BudgetApproDetailsData } from "../budgeting/budget_appro_types";
import { BudgetReApproDetailsData } from "../budgeting/budget_re_appro_types";
import { OpeningBalanceDetailsData } from "../budgeting/opening_balance_types";
import { RevisedBudgetDetailsData } from "../budgeting/revised_budget_types";
import { InvestmentsDetailsData } from "../budgeting/investments_types";
import { GrantManagementDetailsData } from "../budgeting/grant_management_types";

export interface FormikErrors {
  [key: string]: string | undefined;
}

export interface FormikTouched {
  [key: string]: boolean | undefined;
}

export interface Choice {
  key: string;
  value: string;
}

// Add Types Of All Form Data's
export type FormValues =
  | VoucherDataProps
  | DirPaymentDataProps
  | BillPaymentDetailsData
  | ChequeIssueEntryData
  | ChequebookDataProps
  | ReceiptDataProps
  | BillInvoiceDetailsData
  | ReceiptBudgetDetailsData
  | BudgetApproDetailsData
  | BudgetReApproDetailsData
  | OpeningBalanceDetailsData
  | RevisedBudgetDetailsData
  | InvestmentsDetailsData
  | GrantManagementDetailsData;


type Data = {
  id: number;
  name: string;
}  

export type FieldTypeProps = {
  CONTROL?: "input" | "select" | "checkbox" | "textarea" | "radio" | "selectForNoApi";
  HEADER?: string;
  ACCESSOR?: string;
  PLACEHOLDER?: string;
  API?: string;
  OPTIONS?: Choice[];
  TYPE?: string;
  ADDITIONAL?: FieldTypeProps[];
  TITLE?: string;
  CHILDRENS?: FieldTypeProps[];
  DATA?: Data[];
  HANDLER? : (id: number | string) => void;
  VISIBILITY?: boolean | true;
  READONLY?: boolean | false;
  VALUE?: string | number | boolean;
};

export interface FormikWrapperProps {
  initialValues: FormValues;
  enableReinitialize?: boolean;
  validationSchema: object;
  onSubmit: (values: FormValues, actions?: FormikHelpers<FormValues>) => void;
  fields: FieldTypeProps[];
  readonly?: boolean;
  onClose?: () => void;
  title: string;
  resetInitialValue?: () => void;
}
