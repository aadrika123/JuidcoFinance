import * as Yup from "yup";
export const loanManagementDetailsSchema = Yup.object().shape({
ulb_id: Yup.number().required("Ulb  is required"),
primary_acc_code_id: Yup.number().required("Primary Acc Code  is required"),
purpose_of_loan: Yup.string().required("Purpose Of Loan is required"),
department_id: Yup.number().required("Department  is required"),
resolution_date: Yup.string().required("Resolution Date is required"),
loan_no: Yup.string().required("Loan No is required"),
loan_sanctioned_amount: Yup.number().required("Loan Sanctioned Amount is required"),
interest_rate: Yup.number().required("Interest Rate is required"),
instalments_no: Yup.number().required("Instalments No is required"),
instalment_amount: Yup.number().required("Instalment Amount is required"),
receipt_date: Yup.string().required("Receipt Date is required"),
received_amount: Yup.number().required("Received Amount is required"),
total_received_amount: Yup.number().required("Total Received Amount is required"),
repayment_due_date: Yup.string().required("Repayment Due Date is required"),
principal_amount: Yup.number().required("Principal Amount is required"),
interest_amount: Yup.number().required("Interest Amount is required"),
total_due_amount_to_repayment: Yup.number().required("Total Due Amount To Repayment is required"),
officer_id: Yup.number().required("Officer  is required"),
repaid_repayment_date: Yup.string().required("Repaid Repayment Date is required"),
repaid_principal_amount: Yup.number().required("Repaid Principal Amount is required"),
repaid_interest: Yup.number().required("Repaid Interest is required"),
repaid_total_amount: Yup.number().required("Repaid Total Amount is required"),
balance_principal_amount: Yup.number().required("Balance Principal Amount is required"),
balance_interest: Yup.number().required("Balance Interest is required"),
balance_total_amount: Yup.number().required("Balance Total Amount is required"),
balance_remarks: Yup.string().required("Balance Remarks is required"),
employee_id: Yup.number().required("Employee  is required"),
designation_id: Yup.number().required("Designation  is required"),
})
