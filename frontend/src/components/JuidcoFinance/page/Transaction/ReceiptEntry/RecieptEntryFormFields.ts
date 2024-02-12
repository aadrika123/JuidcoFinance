import APIs from "@/json/apis.json";
import { FINANCE_URL } from "@/utils/api/urls";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";

// Add Input Fields
export const fields: FieldTypeProps[] = [
  {
    CONTROL: "input",
    HEADER: "Receipt Date",
    ACCESSOR: "date",
    PLACEHOLDER: "DD/MM/YYYY",
    TYPE: "date",
  },
  {
    CONTROL: "input",
    HEADER: "Email",
    ACCESSOR: "email",
    PLACEHOLDER: "Example: ramesh@gmail.com",
  },
  {
    CONTROL: "input",
    HEADER: "Receipt Number",
    ACCESSOR: "receipt_no",
    PLACEHOLDER: "Example: 2444234324243",
  },
  {
    CONTROL: "select",
    HEADER: "Module",
    ACCESSOR: "module_id",
    PLACEHOLDER: "Select Module",
    API: `${APIs.modules_root}`,
  },
  {
    CONTROL: "input",
    HEADER: "Paid By",
    ACCESSOR: "paid_by",
    PLACEHOLDER: "Example: ",
  },
  {
    CONTROL: "select",
    HEADER: "Receipt Type",
    ACCESSOR: "receipt_type_id",
    PLACEHOLDER: "Select Receipt Type",
    API: `${APIs.receipt_type_root}`,
  },
  {
    CONTROL: "input",
    HEADER: "Mobile No",
    ACCESSOR: "mobile_no",
    PLACEHOLDER: "Example: 3283838",
  },
  {
    CONTROL: "select",
    HEADER: "Admin Ward",
    ACCESSOR: "admin_ward_id",
    PLACEHOLDER: "Select administrative ward",
    API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Narration",
    ACCESSOR: "narration",
    PLACEHOLDER: "Example: 3283838",
  },
  {
    CONTROL: "select",
    HEADER: "Subledger",
    ACCESSOR: "subledger_id",
    PLACEHOLDER: "Select Subledger",
    API: `${FINANCE_URL.SUB_LEDGER_URL.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Amount",
    ACCESSOR: "amount",
    PLACEHOLDER: "Example: 3283838",
    TYPE: "number",
  },
];
