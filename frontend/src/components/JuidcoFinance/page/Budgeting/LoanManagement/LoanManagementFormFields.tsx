"use client";

import React from "react";
import { Formik, FormikHelpers } from "formik";
import goBack from "@/utils/helper";
import Select from "@/components/global/atoms/Select";
import Input from "@/components/global/atoms/Input";
import { FINANCE_URL } from "@/utils/api/urls";
import Button from "@/components/global/atoms/Button";
import { LoanManagementDetailsData } from "@/utils/types/budgeting/loan_management_types";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- Formik Container
 * | Status- Intermittently Updating
 */

export interface FormikWrapperProps {
  initialValues: LoanManagementDetailsData;
  enableReinitialize?: boolean;
  validationSchema: object;
  onSubmit: (
    values: LoanManagementDetailsData,
    actions?: FormikHelpers<LoanManagementDetailsData>
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
    <section className="border bg-white rounded-lg border-primary_green p-6 px-10">
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
                <h2 className="text-xl font-medium text-black mt-6 mb-3">
                  Loan Entry
                </h2>
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
                    api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
                    readonly={readonly}
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
                    api={`${FINANCE_URL.ACCOUNTING_CODE_URL.get}`}
                    readonly={readonly}
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.purpose_of_loan}
                    error={errors.purpose_of_loan}
                    touched={touched.purpose_of_loan}
                    label="Purpose of Loan"
                    name="purpose_of_loan"
                    placeholder="Enter Purpose of Loan"
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
                    value={values.resolution_date}
                    error={errors.resolution_date}
                    touched={touched.resolution_date}
                    label="Date of Resolution/Order Sanctioning the loan"
                    name="resolution_date"
                    type="date"
                    placeholder="undefined"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.loan_no}
                    error={errors.loan_no}
                    touched={touched.loan_no}
                    label="Loan Number"
                    name="loan_no"
                    placeholder="Enter Remarks"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.loan_sanctioned_amount}
                    error={errors.loan_sanctioned_amount}
                    touched={touched.loan_sanctioned_amount}
                    label="Amount of Loan Sanctioned"
                    name="loan_sanctioned_amount"
                    type="number"
                    placeholder="Enter Amount of Loan Sanctioned"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.interest_rate}
                    error={errors.interest_rate}
                    touched={touched.interest_rate}
                    label="Rate of Interest"
                    name="interest_rate"
                    type="number"
                    placeholder="Enter Rate of Interest"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.instalments_no}
                    error={errors.instalments_no}
                    touched={touched.instalments_no}
                    label="Number of Instalments"
                    name="instalments_no"
                    type="number"
                    placeholder="Enter Number of Instalments"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.instalment_amount}
                    error={errors.instalment_amount}
                    touched={touched.instalment_amount}
                    label="Amount of Instalment"
                    name="instalment_amount"
                    type="number"
                    placeholder="Enter Amount of Instalment"
                    readonly={readonly}
                  />
                </div>
                <h2 className="text-xl font-medium text-black mt-6 mb-3">
                  Receipt of Loan
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.receipt_date}
                    error={errors.receipt_date}
                    touched={touched.receipt_date}
                    label="Date of Receipt"
                    name="receipt_date"
                    type="date"
                    placeholder="undefined"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.received_amount}
                    error={errors.received_amount}
                    touched={touched.received_amount}
                    label="Amount Received"
                    name="received_amount"
                    type="number"
                    placeholder="Enter Amount Received"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.total_received_amount}
                    error={errors.total_received_amount}
                    touched={touched.total_received_amount}
                    label="Total Received Amount"
                    name="total_received_amount"
                    type="number"
                    placeholder="Enter Total Received Amount"
                    readonly={readonly}
                  />
                </div>
                <h2 className="text-xl font-medium text-black mt-6 mb-3">
                  Amount Due for Repayment
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.repayment_due_date}
                    error={errors.repayment_due_date}
                    touched={touched.repayment_due_date}
                    label="Due Date of Repayment"
                    name="repayment_due_date"
                    type="date"
                    placeholder="undefined"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.principal_amount}
                    error={errors.principal_amount}
                    touched={touched.principal_amount}
                    label="Amount of Principal"
                    name="principal_amount"
                    type="number"
                    placeholder="Enter Amount of Principal"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.interest_amount}
                    error={errors.interest_amount}
                    touched={touched.interest_amount}
                    label="Amount of Interest"
                    name="interest_amount"
                    type="number"
                    placeholder="Enter Amount of Interest"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.total_due_amount_to_repayment}
                    error={errors.total_due_amount_to_repayment}
                    touched={touched.total_due_amount_to_repayment}
                    label="Total Amount Due to Repayment"
                    name="total_due_amount_to_repayment"
                    type="number"
                    placeholder="Enter Total Amount Due to Repayment"
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
                </div>
                <h2 className="text-xl font-medium text-black mt-6 mb-3">
                  Amount Repaid
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.repaid_repayment_date}
                    error={errors.repaid_repayment_date}
                    touched={touched.repaid_repayment_date}
                    label="Date of Repayment"
                    name="repaid_repayment_date"
                    type="date"
                    placeholder="undefined"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.repaid_principal_amount}
                    error={errors.repaid_principal_amount}
                    touched={touched.repaid_principal_amount}
                    label="Principal Amount"
                    name="repaid_principal_amount"
                    type="number"
                    placeholder="Enter Principal Amount"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.repaid_interest}
                    error={errors.repaid_interest}
                    touched={touched.repaid_interest}
                    label="Interest"
                    name="repaid_interest"
                    type="number"
                    placeholder="Enter Interest"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.repaid_total_amount}
                    error={errors.repaid_total_amount}
                    touched={touched.repaid_total_amount}
                    label="Total Amount"
                    name="repaid_total_amount"
                    type="number"
                    placeholder="Enter Total Amount"
                    readonly={readonly}
                  />
                </div>
                <h2 className="text-xl font-medium text-black mt-6 mb-3">
                  Balance
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.balance_principal_amount}
                    error={errors.balance_principal_amount}
                    touched={touched.balance_principal_amount}
                    label="Principal Amount"
                    name="balance_principal_amount"
                    type="number"
                    placeholder="Enter Principal Amount"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.balance_interest}
                    error={errors.balance_interest}
                    touched={touched.balance_interest}
                    label="Interest"
                    name="balance_interest"
                    type="number"
                    placeholder="Enter Interest"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.balance_total_amount}
                    error={errors.balance_total_amount}
                    touched={touched.balance_total_amount}
                    label="Total Amount"
                    name="balance_total_amount"
                    type="number"
                    placeholder="Enter Total Amount"
                    readonly={readonly}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.balance_remarks}
                    error={errors.balance_remarks}
                    touched={touched.balance_remarks}
                    label="Remarks"
                    name="balance_remarks"
                    placeholder="Enter Remarks"
                    readonly={readonly}
                  />
                </div>
                <h2 className="text-xl font-medium text-black mt-6 mb-3">
                  Person who is Entering the Loan
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.employee_id}
                    error={errors.employee_id}
                    touched={touched.employee_id}
                    label="Name"
                    name="employee_id"
                    placeholder="Select Name"
                    api={`${FINANCE_URL.EMPLOYEE_URL.get}`}
                    readonly={readonly}
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.designation_id}
                    error={errors.designation_id}
                    touched={touched.designation_id}
                    label="Designation"
                    name="designation_id"
                    placeholder="Select Designation"
                    api={`${FINANCE_URL.EMPLOYEE_URL.get}`}
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
