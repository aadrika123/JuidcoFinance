import { FINANCE_URL } from "@/utils/api/urls";
import { Choice, FieldTypeProps } from "@/utils/types/formikTypes";

/////  Radio buttons list
const choices: Choice[] = [
  { key: "Cash", value: "cash" },
  { key: "Cheque", value: "cheque" },
  { key: "NFT/RTGS", value: "NFT/RTGS" },
];

  // Add Input Fields
export const fields: FieldTypeProps[] = [
  {
    CONTROL: "input",
    HEADER: "Payment Date",
    ACCESSOR: "payment_date",
    PLACEHOLDER: "DD/MM/YYYY",
    TYPE: "date",
  },
  {
    CONTROL: "select",
    HEADER: "Grant",
    ACCESSOR: "grant_id",
    PLACEHOLDER: "Select Grant",
    API: `${FINANCE_URL.GRANT_URL.get}`,
  },
  {
    CONTROL: "select",
    HEADER: "Payment Type",
    ACCESSOR: "payment_type_id",
    PLACEHOLDER: "Select Payment Type",
    API: `${FINANCE_URL.PAYMENT_TYPE_URL.get}`,
  },
  {
    CONTROL: "select",
    HEADER: "Department Name",
    ACCESSOR: "department_id",
    PLACEHOLDER: "Select Department",
    API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
  },
  {
    CONTROL: "select",
    HEADER: "Payee Name",
    ACCESSOR: "payee_name_id",
    PLACEHOLDER: "Select Payee Name",
    API: `${FINANCE_URL.EMPLOYEE_URL.get}`,
  },

  {
    CONTROL: "select",
    HEADER: "Administration Ward",
    ACCESSOR: "adminis_ward_id",
    PLACEHOLDER: "Select Administration Ward",
    API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
  },

  {
    CONTROL: "textarea",
    HEADER: "Narration",
    ACCESSOR: "narration",
    PLACEHOLDER: "Enter Narration",
  },
  {
    CONTROL: "textarea",
    HEADER: "Address",
    ACCESSOR: "address",
    PLACEHOLDER: "Enter Address",
  },
  {
    CONTROL: "select",
    HEADER: "Sub Ledger",
    ACCESSOR: "subledger_id",
    PLACEHOLDER: "Select Sub Ledger",
    API: `${FINANCE_URL.SUB_LEDGER_URL.getCodes}`,
  },
  {
    CONTROL: "input",
    HEADER: "Amount",
    ACCESSOR: "amount",
    PLACEHOLDER: "Amount",
    TYPE: "number",
  },
  {
    CONTROL: "checkbox",
    HEADER: "User Common Budget",
    ACCESSOR: "user_common_budget",
    TYPE: "checkbox",
  },
  {
    CONTROL: "radio",
    HEADER: "Payment Mode",
    ACCESSOR: "payment_mode",
    OPTIONS: choices,
    TYPE: "radio",
  },
];