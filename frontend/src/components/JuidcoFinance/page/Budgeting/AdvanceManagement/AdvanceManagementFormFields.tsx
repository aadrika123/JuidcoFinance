"use client";

import React from "react";
import { Formik, FormikHelpers } from "formik";
import goBack from "@/utils/helper";
import Select from "@/components/global/atoms/Select";
import Input from "@/components/global/atoms/Input";
import { FINANCE_URL } from "@/utils/api/urls";
import Button from "@/components/global/atoms/Button";
import { AdvanceManagementDetailsData } from "@/utils/types/budgeting/advance_management_types";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- Formik Container
 * | Status- Intermittently Updating
 */

export interface FormikWrapperProps {
  initialValues: AdvanceManagementDetailsData;
  enableReinitialize?: boolean;
  validationSchema: object;
  onSubmit: (
    values: AdvanceManagementDetailsData,
    actions?: FormikHelpers<AdvanceManagementDetailsData>
  ) => void;
  readonly?: boolean;
  onClose?: () => void;
  title: string;
  resetInitialValue?: () => void;
}

const FormikW: React.FC<FormikWrapperProps> = (props) => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    readonly = false,
    onClose,
    enableReinitialize,
  } = props;

  return (
    <section className="border bg-white rounded-lg border-[#12743B] p-6 px-10">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={enableReinitialize}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ulb_id}
                    error={errors.ulb_id}
                    touched={touched.ulb_id}
                    label="ULBs"
                    name="ulb_id"
                    placeholder="Select ULBs"
                    readonly={readonly}
                    api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
                  />
                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.primary_acc_code_id}
                    error={errors.primary_acc_code_id}
                    touched={touched.primary_acc_code_id}
                    label="Primary Accounting Code"
                    name="primary_acc_code_id"
                    placeholder="Select Primary Accounting Code"
                    readonly={readonly}
                    api={`${FINANCE_URL.ACCOUNTING_CODE_URL.get}`}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.serial_no_of_estimate}
                    error={errors.serial_no_of_estimate}
                    touched={touched.serial_no_of_estimate}
                    label="Serial No. of Estimate"
                    name="serial_no_of_estimate"
                    readonly={readonly}
                    placeholder="Enter Serial No. of Estimate"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.work_order_no}
                    error={errors.work_order_no}
                    touched={touched.work_order_no}
                    label="Work Order No"
                    name="work_order_no"
                    readonly={readonly}
                    placeholder="Enter Work Order No"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.work_name}
                    error={errors.work_name}
                    touched={touched.work_name}
                    label="Work Name"
                    name="work_name"
                    readonly={readonly}
                    placeholder="Enter Work Name"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.work_nature}
                    error={errors.work_nature}
                    touched={touched.work_nature}
                    label="Nature of Work"
                    name="work_nature"
                    readonly={readonly}
                    placeholder="Enter Nature of Work"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contract_amount}
                    error={errors.contract_amount}
                    touched={touched.contract_amount}
                    label="Contract Amount"
                    name="contract_amount"
                    type="number"
                    readonly={readonly}
                    placeholder="Enter Contract Amount"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contractor_name}
                    error={errors.contractor_name}
                    touched={touched.contractor_name}
                    label="Contractor Name"
                    name="contractor_name"
                    placeholder="Enter Contractor Name"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.order_sanctioning_the_contract_no}
                    error={errors.order_sanctioning_the_contract_no}
                    touched={touched.order_sanctioning_the_contract_no}
                    label="Order Sanctioning the Contract Number"
                    name="order_sanctioning_the_contract_no"
                    placeholder="Enter Order Sanctioning the Contract Number"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={
                      values.order_sanctioning_the_contract_resolution_date
                    }
                    error={
                      errors.order_sanctioning_the_contract_resolution_date
                    }
                    touched={
                      touched.order_sanctioning_the_contract_resolution_date
                    }
                    label="Order Sanctioning the Contract Date of Resolution"
                    name="order_sanctioning_the_contract_resolution_date"
                    type="date"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.order_sanctioning_the_estimate_no}
                    error={errors.order_sanctioning_the_estimate_no}
                    touched={touched.order_sanctioning_the_estimate_no}
                    label="Number of Order Sanctioning the Estimate (Administrative Approval)"
                    name="order_sanctioning_the_estimate_no"
                    placeholder="Enter Number of Order Sanctioning the Estimate"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.order_sanctioning_the_estimate_date}
                    error={errors.order_sanctioning_the_estimate_date}
                    touched={touched.order_sanctioning_the_estimate_date}
                    label="Date of Order Sanctioning the Estimate (Administrative Approval)"
                    name="order_sanctioning_the_estimate_date"
                    type="date"
                    readonly={readonly}
                  />
                </div>
                <h2 className="text-xl font-medium text-black mt-6 mb-3">
                  Voucher Details
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.voucher_no}
                    error={errors.voucher_no}
                    touched={touched.voucher_no}
                    label="Voucher Number"
                    name="voucher_no"
                    placeholder="Enter Voucher Number"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    error={errors.date}
                    touched={touched.date}
                    label="Date"
                    name="date"
                    type="date"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    error={errors.amount}
                    touched={touched.amount}
                    label="Amount"
                    name="amount"
                    type="number"
                    placeholder="Enter Amount"
                    readonly={readonly}
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.officer_id}
                    error={errors.officer_id}
                    touched={touched.officer_id}
                    label="Initials of the Officer"
                    name="officer_id"
                    placeholder="Select Officer"
                    api={`${FINANCE_URL.EMPLOYEE_URL.get}`}
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bill_no}
                    error={errors.bill_no}
                    touched={touched.bill_no}
                    label="Bill Number"
                    name="bill_no"
                    placeholder="Enter Bill Number"
                    readonly={readonly}
                  />
                </div>
                <h2 className="text-xl font-medium text-black mt-6 mb-3">
                  Others Details
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bill_date}
                    error={errors.bill_date}
                    touched={touched.bill_date}
                    label="Bill Date"
                    name="bill_date"
                    type="date"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payable_amount}
                    error={errors.payable_amount}
                    touched={touched.payable_amount}
                    label="Amount Claimed Payable as per the Contractor's Bill"
                    name="payable_amount"
                    type="number"
                    placeholder="Enter Payable Amount"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.approved_amount}
                    error={errors.approved_amount}
                    touched={touched.approved_amount}
                    label="Amount Approved by the Authorized Officer (Rs)"
                    name="approved_amount"
                    type="number"
                    placeholder="Enter Approved Amount"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cumulative_approved_amount}
                    error={errors.cumulative_approved_amount}
                    touched={touched.cumulative_approved_amount}
                    label="Cumulative Approved Bill amount (Rs)"
                    name="cumulative_approved_amount"
                    type="number"
                    placeholder="Enter Cumulative Approved Amount"
                    readonly={readonly}
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pwd_officer_id}
                    error={errors.pwd_officer_id}
                    touched={touched.pwd_officer_id}
                    label="Initials of the Authorized Officer - PWD"
                    name="pwd_officer_id"
                    placeholder="Select Officer-PWD"
                    api={`${FINANCE_URL.EMPLOYEE_URL.get}`}
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.security_deposit_deducted_amount}
                    error={errors.security_deposit_deducted_amount}
                    touched={touched.security_deposit_deducted_amount}
                    label="Security Deposit Deducted (Rs)"
                    name="security_deposit_deducted_amount"
                    type="number"
                    placeholder="Enter Deposit Deducted Amount"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tds_amount}
                    error={errors.tds_amount}
                    touched={touched.tds_amount}
                    label="TDS (Rs)"
                    name="tds_amount"
                    type="number"
                    placeholder="Enter TDS"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.work_contract_tax_amount}
                    error={errors.work_contract_tax_amount}
                    touched={touched.work_contract_tax_amount}
                    label="Work Contract Tax (Rs)"
                    name="work_contract_tax_amount"
                    type="number"
                    placeholder="Enter Work Contract Tax"
                    readonly={readonly}
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.material_issued_recovery_amount}
                    error={errors.material_issued_recovery_amount}
                    touched={touched.material_issued_recovery_amount}
                    label="Recovery of Material Issued (Rs)"
                    name="material_issued_recovery_amount"
                    type="number"
                    placeholder="Enter Recovery of Material Issued"
                    readonly={readonly}
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.advance_provided_recovery_amount}
                    error={errors.advance_provided_recovery_amount}
                    touched={touched.advance_provided_recovery_amount}
                    label="Recovery of Advance Provided (Rs)"
                    name="advance_provided_recovery_amount"
                    type="number"
                    placeholder="Enter Recovery of Advance Provided"
                    readonly={readonly}
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.other_deduction_amount}
                    error={errors.other_deduction_amount}
                    touched={touched.other_deduction_amount}
                    label="Other Deduction (Rs)"
                    name="other_deduction_amount"
                    type="number"
                    placeholder="Enter Other Deduction"
                    readonly={readonly}
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.net_paid_amount}
                    error={errors.net_paid_amount}
                    touched={touched.net_paid_amount}
                    label="Net Amount Paid (Rs)"
                    name="net_paid_amount"
                    type="number"
                    placeholder="Enter Net Amount Paid"
                    readonly={readonly}
                  />
                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department_id}
                    error={errors.department_id}
                    touched={touched.department_id}
                    label="Department from which Loan Reveived"
                    name="department_id"
                    placeholder="Select department name"
                    api={`${FINANCE_URL.DEPARTMENT_URL.get}`}
                    readonly={readonly}
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.remarks}
                    error={errors.remarks}
                    touched={touched.remarks}
                    label="Remarks"
                    name="remarks"
                    placeholder="Enter Remarks"
                    readonly={readonly}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <Button
                  onClick={onClose || goBack}
                  variant="cancel"
                  buttontype="button"
                >
                  {onClose ? "Close" : "Back"}
                </Button>

                {!readonly && dirty && (
                  <>
                    <Button
                      variant="cancel"
                      buttontype="button"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <Button variant="primary" buttontype="submit">
                      Save
                    </Button>
                  </>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default FormikW;
