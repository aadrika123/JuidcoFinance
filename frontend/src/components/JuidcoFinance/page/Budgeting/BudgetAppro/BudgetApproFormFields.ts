import { FINANCE_URL } from "@/utils/api/urls";
import { FieldTypeProps } from "@/utils/types/formikTypes";

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
    API: `${FINANCE_URL.ACCOUNTING_CODE_URL.getMainCodes}`,
  },
  {
    CONTROL: "input",
    HEADER: "Budget Appropriation Remark",
    ACCESSOR: "remark",
    PLACEHOLDER: "Enter budget appropriation remark",
  },
  {
    TITLE: "Budget Transfer From",
    CHILDRENS: [
      {
        CONTROL: "select",
        HEADER: "From Primary Accounting Code",
        ACCESSOR: "from_primary_acc_code_id",
        PLACEHOLDER: "Select From Primary Accounting Code",
        API: `${FINANCE_URL.ACCOUNTING_CODE_URL.getChildCodes}?id=1`,
      },
      {
        CONTROL: "input",
        HEADER: "Approved Amount",
        ACCESSOR: "approved_amount",
        PLACEHOLDER: "Enter approved amount",
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
