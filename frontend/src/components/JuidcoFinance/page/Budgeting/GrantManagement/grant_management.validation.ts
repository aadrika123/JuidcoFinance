import * as Yup from "yup";
export const grantManagementDetailsSchema = Yup.object().shape({
  ulb_id: Yup.number().required("Ulb is required"),
  primary_acc_code_id: Yup.number().required("Primary Accounting Code is required"),
  sanction_number: Yup.string().required("Sanction Number is required"),
  grant_id: Yup.number().required("Grant is required"),
  grant_nature_id: Yup.number().required("Grant Nature is required"),
  employee_id: Yup.number().required("Designation is required"),
  sanctioned_amount: Yup.number().required("Sanctioned Amount is required"),
  grant_from_date: Yup.string().required("Grant From Date is required"),
  grant_to_date: Yup.string().required("Grant To Date is required"),
  advance_amount: Yup.number().required("Advance Amount is required"),
  advance_rcving_date: Yup.string().required("Advance Rcving Date is required"),
  expenditure_date: Yup.string().required("Expenditure Date is required"),
  voucher_id: Yup.number().required("Voucher is required"),
  expenditure_nature_id: Yup.number().required(
    "Expenditure Nature is required"
  ),
  refund_date: Yup.string().required("Refund Date is required"),
  refund_amount: Yup.number().required("Refund Amount is required"),
});
