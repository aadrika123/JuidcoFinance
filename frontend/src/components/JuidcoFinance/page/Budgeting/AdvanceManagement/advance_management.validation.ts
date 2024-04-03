import * as Yup from "yup";
export const advanceManagementDetailsSchema = Yup.object().shape({
  ulb_id: Yup.number().required("Ulb is required"),
  primary_acc_code_id: Yup.number().required("Primary Acc Code is required"),
  serial_no_of_estimate: Yup.string().required(
    "Serial No Of Estimate is required"
  ),
  work_order_no: Yup.string().required("Work Order No is required"),
  work_name: Yup.string().required("Work Name is required"),
  work_nature: Yup.string().required("Work Nature is required"),
  contract_amount: Yup.number().required("Contract Amount is required"),
  contractor_name: Yup.string().required("Contractor Name is required"),
  order_sanctioning_the_contract_no: Yup.string().required(
    "Order Sanctioning The Contract No is required"
  ),
  order_sanctioning_the_contract_resolution_date: Yup.string().required(
    "Order Sanctioning The Contract Resolution Date is required"
  ),
  order_sanctioning_the_estimate_no: Yup.string().required(
    "Order Sanctioning The Estimate No is required"
  ),
  order_sanctioning_the_estimate_date: Yup.string().required(
    "Order Sanctioning The Estimate Date is required"
  ),
  voucher_no: Yup.string().required("Voucher No is required"),
  date: Yup.string().required("Date is required"),
  amount: Yup.number().required("Amount is required"),
  officer_id: Yup.number().required("Officer is required"),
  bill_no: Yup.string().required("Bill No is required"),
  bill_date: Yup.string().required("Bill Date is required"),
  payable_amount: Yup.number().required("Payable Amount is required"),
  approved_amount: Yup.number().required("Approved Amount is required"),
  cumulative_approved_amount: Yup.number().required(
    "Cumulative Approved Amount is required"
  ),
  pwd_officer_id: Yup.number().required("Pwd Officer  is required"),
  security_deposit_deducted_amount: Yup.number().required(
    "Security Deposit Deducted Amount is required"
  ),
  tds_amount: Yup.number().required("Tds Amount is required"),
  work_contract_tax_amount: Yup.number().required(
    "Work Contract Tax Amount is required"
  ),
  material_issued_recovery_amount: Yup.number().required(
    "Material Issued Recovery Amount is required"
  ),
  advance_provided_recovery_amount: Yup.number().required(
    "Advance Provided Recovery Amount is required"
  ),
  other_deduction_amount: Yup.number().required(
    "Other Deduction Amount is required"
  ),
  net_paid_amount: Yup.number().required("Net Paid Amount is required"),
  department_id: Yup.number().required("Department  is required"),
  remarks: Yup.string().required("Remarks is required"),
});
