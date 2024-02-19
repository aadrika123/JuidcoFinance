import { FINANCE_URL } from "@/utils/api/urls";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";

export const fields: FieldTypeProps[] = [
  {
    CONTROL: "select",
    HEADER: "ULBs",
    ACCESSOR: "ulb_id",
    PLACEHOLDER: "Select ULBs",
    API: `${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`,
  },
  {
    CONTROL: "select",
    HEADER: "Primary Accounting Code",
    ACCESSOR: "primary_acc_code_id",
    PLACEHOLDER: "Select Primary Accounting Code",
    API: `${FINANCE_URL.ACCOUNTING_CODE_URL.getMainCodes}`,
  },
  {
    CONTROL: "input",
    HEADER: "Investment Number",
    ACCESSOR: "investment_no",
    PLACEHOLDER: "Enter Investment Number",
  },
  {
    CONTROL: "input",
    HEADER: "Date of Resolution Authorising Investment",
    ACCESSOR: "authorization_date",
    TYPE: "date",
  },
  {
    CONTROL: "input",
    HEADER: "Date of Investment",
    ACCESSOR: "investment_date",
    TYPE: "date",
  },
  {
    CONTROL: "input",
    HEADER:
      "Particular of investments",
    ACCESSOR: "particulars",
    PLACEHOLDER: "Enter Particulars",
  },
  {
    CONTROL: "select",
    HEADER: "Investment Type",
    ACCESSOR: "investment_type_id",
    PLACEHOLDER: "Select Investment Type",
    API: `${FINANCE_URL.INVESTMENT_TYPE_URL.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Purchasing Amount (Rs)",
    ACCESSOR: "purchase_amount",
    PLACEHOLDER: "Enter Purchasing Amount",
    TYPE: "number",
  },
  {
    CONTROL: "input",
    HEADER: "Face Value (Rs)",
    ACCESSOR: "face_value_amount",
    PLACEHOLDER: "Enter Face Value",
    TYPE: "number",
  },
  {
    CONTROL: "input",
    HEADER: "Due Date of Receipt of Interest",
    ACCESSOR: "interest_due_date",
    TYPE: "date",
  },
  {
    CONTROL: "input",
    HEADER: "Amount of Interest",
    ACCESSOR: "interest_due_amount",
    PLACEHOLDER: "Enter Amount of Interset Due",
    TYPE: "number",
  },
  {
    CONTROL: "select",
    HEADER: "Initials of Authorized Officer",
    ACCESSOR: "employee_id",
    PLACEHOLDER: "Select Authorized Officer",
    API: `${FINANCE_URL.EMPLOYEE_URL.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Amount of Interest Recovered (Rs)",
    ACCESSOR: "interest_recovered_amount",
    PLACEHOLDER: "Enter Interset Recovered Amount",
    TYPE: "number",
  },
  {
    CONTROL: "input",
    HEADER: "Date on Which Interest in Recovered",
    ACCESSOR: "interest_recovery_date",
    TYPE: "date",
  },
  {
    CONTROL: "input",
    HEADER: "Date in Which Rcovery Amount Adjusted in Accounts",
    ACCESSOR: "acc_adj_recovery_date",
    TYPE: "date",
  },
  {
    CONTROL: "input",
    HEADER: "Amount Realized either on sale or Maturity of Investment (Rs)",
    ACCESSOR: "realization_final_amount",
    PLACEHOLDER: "Enter Amount",
    TYPE: "number",
  },
  {
    CONTROL: "input",
    HEADER: "Date on Which Proceeds were Realized",
    ACCESSOR: "realization_date",
    TYPE: "date",
  },
  {
    CONTROL: "input",
    HEADER: "Date in Which Realization Amount Adjustment in Accounts",
    ACCESSOR: "acc_adj_realization_date",
    TYPE: "date",
  },
  {
    CONTROL: "input",
    HEADER: "Remarks",
    ACCESSOR: "remarks",
    PLACEHOLDER: "Enter Remarks",
  },
];
