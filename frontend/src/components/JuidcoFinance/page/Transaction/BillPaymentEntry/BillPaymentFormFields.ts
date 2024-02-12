import { FINANCE_URL } from "@/utils/api/urls";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";

// Add Input Fields
export const fields: FieldTypeProps[] = [
  {
    CONTROL: "input",
    HEADER: "Bill Number",
    ACCESSOR: "bill_no",
    PLACEHOLDER: "Enter Bill Number",
  },
  {
    CONTROL: "input",
    HEADER: "Bill Entry Date",
    ACCESSOR: "bill_entry_date",
    PLACEHOLDER: "DD/MM/YYYY",
    TYPE: "date",
  },
  {
    CONTROL: "select",
    HEADER: "Bill Type",
    ACCESSOR: "bill_type_id",
    PLACEHOLDER: "Select Bill Type",
    API: `${FINANCE_URL.GRANT_URL.get}`,
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
    HEADER: "Vendor Name",
    ACCESSOR: "vendor_id",
    PLACEHOLDER: "Select Vendor Name",
    API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
  },
  {
    CONTROL: "textarea",
    HEADER: "Address",
    ACCESSOR: "address",
    PLACEHOLDER: "Enter Address",
  },
  {
    CONTROL: "select",
    HEADER: "Payee Name",
    ACCESSOR: "payee_id",
    PLACEHOLDER: "Select Payee Name",
    API: `${FINANCE_URL.VOUCHER_TYPE_URL.get}`,
  },
  {
    CONTROL: "select",
    HEADER: "Administration Ward",
    ACCESSOR: "adminis_ward_id",
    PLACEHOLDER: "Select Administration Ward",
    API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Bill Amount",
    ACCESSOR: "bill_amount",
    PLACEHOLDER: "Bill Amount",
    TYPE: "number",
  },
  {
    CONTROL: "input",
    HEADER: "Advance",
    ACCESSOR: "advance",
    PLACEHOLDER: "Enter Advance",
    TYPE: "number",
  },
  {
    CONTROL: "input",
    HEADER: "Deposit",
    ACCESSOR: "deposit",
    PLACEHOLDER: "Enter Deposit",
    TYPE: "number",
  },
  {
    CONTROL: "input",
    HEADER: "Other Deduction",
    ACCESSOR: "deductions_amount",
    PLACEHOLDER: "Enter Other Deduction",
    TYPE: "number",
  },
];
