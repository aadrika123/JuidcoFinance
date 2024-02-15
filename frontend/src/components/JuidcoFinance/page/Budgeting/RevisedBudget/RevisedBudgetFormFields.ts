import { FINANCE_URL } from "@/utils/api/urls";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";

export const fields: FieldTypeProps[] = [
  {
    CONTROL: "select",
    HEADER: "Primary Accounting Code",
    ACCESSOR: "primary_acc_code_id",
    PLACEHOLDER: "Select primary accounting code",
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
    HEADER: "Revised Budget Amount",
    ACCESSOR: "revised_amount",
    PLACEHOLDER: "Enter revised budget amount",
    TYPE: "number",
  },
  {
    CONTROL: "input",
    HEADER: "Remarks",
    ACCESSOR: "remarks",
    PLACEHOLDER: "Enter remark",
  },
];
