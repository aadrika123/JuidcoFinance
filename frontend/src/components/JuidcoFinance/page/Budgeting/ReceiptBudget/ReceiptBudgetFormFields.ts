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
  // {
  //   CONTROL: "select",
  //   HEADER: "Department Name",
  //   ACCESSOR: "department_id",
  //   PLACEHOLDER: "Select department name",
  //   API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
  // },
  {
    CONTROL: "select",
    HEADER: "Primary Accounting Code",
    ACCESSOR: "primary_acc_code_id",
    PLACEHOLDER: "Select Primary Accounting Code",
    API: `${FINANCE_URL.ACCOUNTING_CODE_URL.getMainCodes}`,
  },
  // {
  //   CONTROL: "select",
  //   HEADER: "Administrative Ward",
  //   ACCESSOR: "admin_ward_id",
  //   PLACEHOLDER: "Select Administrative Ward",
  //   API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
  // },
  // {
  //   CONTROL: "select",
  //   HEADER: "Budget Type",
  //   ACCESSOR: "budget_type_id",
  //   PLACEHOLDER: "Select Budget Type",
  //   API: `${FINANCE_URL.BUDGET_TYPE_URL.get}`,
  // },
  {
    CONTROL: "input",
    HEADER: "Amount",
    ACCESSOR: "amount",
    PLACEHOLDER: "Enter Amount",
    TYPE: "number",
  },
];
