import { FINANCE_URL } from "@/utils/api/urls";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";

export const fields: FieldTypeProps[] = [
  {
    TITLE: "Grant Receipt",
    CHILDRENS: [
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
        HEADER: "Grant Sanction Number",
        ACCESSOR: "sanction_number",
        PLACEHOLDER: "Enter Sanction Number",
      },
      {
        CONTROL: "select",
        HEADER: "Name of the Grant",
        ACCESSOR: "grant_id",
        PLACEHOLDER: "Select Grant Name",
        API: `${FINANCE_URL.GRANT_URL.get}`,
      },
      {
        CONTROL: "select",
        HEADER: "Nature of the Grant",
        ACCESSOR: "grant_nature_id",
        PLACEHOLDER: "Select Grant Nature",
        API: `${FINANCE_URL.GRANT_URL.getNatures}`,
      },
      {
        CONTROL: "selectForNoApi",
        HEADER: "Designation of the Authority",
        ACCESSOR: "employee_id",
        PLACEHOLDER: "Select Designation",
        DATA: [],
      },
      {
        CONTROL: "input",
        HEADER: "Sanctioned Amount (Rs)",
        ACCESSOR: "sanctioned_amount",
        PLACEHOLDER: "Enter Sanctioned Amount",
        TYPE: "number",
      },
      {
        CONTROL: "input",
        HEADER: "Grant From Date",
        ACCESSOR: "grant_from_date",
        TYPE: "date",
      },
      {
        CONTROL: "input",
        HEADER: "Grant To Date",
        ACCESSOR: "grant_to_date",
        TYPE: "date",
      },
      {
        CONTROL: "input",
        HEADER: "Grant Received in Advance Amount (Rs)",
        ACCESSOR: "advance_amount",
        PLACEHOLDER: "Enter Reveived in Advance Amount",
        TYPE: "number",
      },
      {
        CONTROL: "input",
        HEADER: "Grant Received in Advance Date",
        ACCESSOR: "advance_rcving_date",
        TYPE: "date",
      },
    ],
  },
  {
    TITLE: "Expenditure Incurred On Specific Grants",
    CHILDRENS: [
      {
        CONTROL: "input",
        HEADER: "Date",
        ACCESSOR: "expenditure_date",
        TYPE: "date",
      },
      {
        CONTROL: "select",
        HEADER: "Voucher Number",
        ACCESSOR: "voucher_id",
        PLACEHOLDER: "Select Voucher Number",
        API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
      },
      {
        CONTROL: "select",
        HEADER: "Nature of Expenditure",
        ACCESSOR: "expenditure_nature_id",
        PLACEHOLDER: "Select Nature of Expenditure",
        API: `${FINANCE_URL.EXPENDITURE_NATURE_URL.get}`,
      },
    ],
  },
  {
    TITLE: "Expenditure Incurred On Specific Grants",
    CHILDRENS: [
      {
        CONTROL: "input",
        HEADER: "Date",
        ACCESSOR: "refund_date",
        TYPE: "date",
      },
      {
        CONTROL: "input",
        HEADER: "Amount (Rs)",
        ACCESSOR: "refund_amount",
        PLACEHOLDER: "Enter Amount",
        TYPE: "number",
      },
    ],
  },
];
