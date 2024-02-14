import { FINANCE_URL } from "@/utils/api/urls";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";

export const fields: FieldTypeProps[] = [
  {
    CONTROL: "select",
    HEADER: "Financial Year",
    ACCESSOR: "fin_year_id",
    PLACEHOLDER: "Select financial year",
    API: `${FINANCE_URL.FINANCIAL_YEAR_URL.get}`,
  },
  {
    CONTROL: "select",
    HEADER: "Primary Accounting Code",
    ACCESSOR: "primary_acc_code_id",
    PLACEHOLDER: "Select Primary Accounting Code",
    API: `${FINANCE_URL.ACCOUNTING_CODE_URL.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Transaction Date",
    ACCESSOR: "transaction_date",
    TYPE: "date",
  },
  {
    CONTROL: "select",
    HEADER: "Budget Name",
    ACCESSOR: "budget_name_id",
    PLACEHOLDER: "Select budget name",
    API: `${FINANCE_URL.BUDGET_NAME_URL.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Actual Budget Amount",
    ACCESSOR: "actual_amount",
    PLACEHOLDER: "Enter Actual Amount",
    TYPE: "number",
  },
  {
    TITLE: "Budget Transfer Form",
    CHILDRENS: [
      {
        CONTROL: "select",
        HEADER: "From Primary Accounting Code",
        ACCESSOR: "from_primary_acc_code_id",
        PLACEHOLDER: "Select From Primary Accounting Code",
        API: `${FINANCE_URL.ACCOUNTING_CODE_URL.get}`,
      },
      {
        CONTROL: "input",
        HEADER: "Approved Budget Amount",
        ACCESSOR: "approved_amount",
        PLACEHOLDER: "Enter approved budget amount",
        TYPE: "number",
      },
      {
        CONTROL: "input",
        HEADER: "Balance Approved Amount",
        ACCESSOR: "balance_amount",
        PLACEHOLDER: "Enter balance amount",
        TYPE: "number",
      },
      {
        CONTROL: "input",
        HEADER: "Transfer Amount",
        ACCESSOR: "transfer_amount",
        PLACEHOLDER: "Enter transfer amount",
        TYPE: "number",
      },
    ],
  },
];
