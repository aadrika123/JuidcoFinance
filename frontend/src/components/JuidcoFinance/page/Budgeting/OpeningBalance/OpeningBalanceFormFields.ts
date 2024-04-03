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
    PLACEHOLDER: "Select primary accounting code",
    API: `${FINANCE_URL.ACCOUNTING_CODE_URL.getMainCodes}`,
  },
  {
    CONTROL: "select",
    HEADER: "Dr/Cr Type",
    ACCESSOR: "dr_cr_id",
    PLACEHOLDER: "Select Dr/Cr",
    API: `${FINANCE_URL.DR_CR_URL.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Opening Balance Amount",
    ACCESSOR: "amount",
    TYPE: "number",
    PLACEHOLDER: "Enter Amount",
  },
];
