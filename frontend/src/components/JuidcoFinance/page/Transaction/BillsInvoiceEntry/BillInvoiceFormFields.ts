import { FINANCE_URL } from "@/utils/api/urls";
import { FieldTypeProps } from "@/utils/types/formikTypes";

// Add Input Fields
export const fields: FieldTypeProps[] = [
  {
    CONTROL: "input",
    HEADER: "Bill Number",
    ACCESSOR: "bill_no",
    PLACEHOLDER: "Enter Bill Number",
  },
  {
    CONTROL: "select",
    HEADER: "Bill Type",
    ACCESSOR: "type_id",
    PLACEHOLDER: "Select Bill Type",
    API: `${FINANCE_URL.BILL_TYPE.get}`,
  },
  {
    CONTROL: "select",
    HEADER: "Vendor Name",
    ACCESSOR: "vendor_id",
    PLACEHOLDER: "Select Vendor Name",
    API: `${FINANCE_URL.VENDOR_MASTER_URL.getNames}`,
  },

  {
    CONTROL: "select",
    HEADER: "Department",
    ACCESSOR: "department_id",
    PLACEHOLDER: "Select Department",
    API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Bill Entry Date",
    ACCESSOR: "entry_date",
    TYPE: "date",
  },
  {
    CONTROL: "input",
    HEADER: "Narration",
    ACCESSOR: "narration",
    PLACEHOLDER: "Enter Narration",
  },
  {
    CONTROL: "select",
    HEADER: "Bill Stage",
    ACCESSOR: "stage_id",
    PLACEHOLDER: "Select Bill State",
    API: `${FINANCE_URL.BILL_TYPE.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Bill Date",
    ACCESSOR: "bill_date",
    TYPE: "date",
  },
  {
    CONTROL: "input",
    HEADER: "Address",
    ACCESSOR: "address",
    PLACEHOLDER: "Enter Address",
  },
  {
    CONTROL: "select",
    HEADER: "Administration Ward",
    ACCESSOR: "admin_ward_id",
    PLACEHOLDER: "Select Administration Ward",
    API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
  },
  {
    CONTROL: "input",
    HEADER: "Bill Amount",
    ACCESSOR: "amount",
    TYPE: "number",
    PLACEHOLDER: "Enter amount",
  },
  // Deduction Details
  // {
  //   TITLE: "Deduction Details",
  //   CHILDRENS: [
  //     {
  //       CONTROL: "select",
  //       HEADER: "Vendor Name",
  //       ACCESSOR: "voucher_id",
  //       PLACEHOLDER: "Select Vendor Name",
  //       API: `${FINANCE_URL.VOUCHER_SUB_TYPE_URL.get}`,
  //     },
  //     {
  //       CONTROL: "input",
  //       HEADER: "Concerned Work",
  //       ACCESSOR: "dr_cr",
  //       PLACEHOLDER: "Select Dr/Cr",
  //       API: "/bill-type/get",
  //     },
  //     {
  //       CONTROL: "input",
  //       HEADER: "Advance",
  //       ACCESSOR: "advance",
  //       PLACEHOLDER: "Enter Advance",
  //       TYPE: "number",
  //     },
  //     {
  //       CONTROL: "input",
  //       HEADER: "Amount",
  //       ACCESSOR: "amount1",
  //       TYPE: "number",
  //       PLACEHOLDER: "Enter amount",
  //     },
  //     {
  //       CONTROL: "input",
  //       HEADER: "Deposit",
  //       ACCESSOR: "deposit",
  //       TYPE: "number",
  //       PLACEHOLDER: "Enter deposit",
  //     },
  //   ],
  // },
];
