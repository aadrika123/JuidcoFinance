"use client";

import React from "react";
import { Formik, FormikHelpers } from "formik";
import goBack from "@/utils/helper";
import Select from "@/components/global/atoms/Select";
import Input from "@/components/global/atoms/Input";
import { FINANCE_URL } from "@/utils/api/urls";
import Button from "@/components/global/atoms/Button";
import { VoucherEntryDetailsData } from "@/utils/types/documentation/voucher_entry_types";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- Formik Container
 * | Status- Intermittently Updating
 */

export interface FormikWrapperProps {
  initialValues: VoucherEntryDetailsData;
  enableReinitialize?: boolean;
  validationSchema: object;
  onSubmit: (
    values: VoucherEntryDetailsData,
    actions?: FormikHelpers<VoucherEntryDetailsData>
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
    <section className="bg-white rounded-lg p-2 px-5">
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
              <div className="grid gap-4">
                <div className="flex items-center justify-center">
                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.voucher_type_id}
                    error={errors.voucher_type_id}
                    touched={touched.voucher_type_id}
                    readonly={readonly}
                    label="Voucher Type"
                    name="voucher_type_id"
                    placeholder="Select Voucher Type"
                    api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ulb_id}
                    error={errors.ulb_id}
                    touched={touched.ulb_id}
                    readonly={readonly}
                    label="ULBs"
                    name="ulb_id"
                    placeholder="Select ULBs"
                    api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
                    required
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    error={errors.date}
                    touched={touched.date}
                    readonly={readonly}
                    label="Date"
                    name="date"
                    type="date"
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fund_id}
                    error={errors.fund_id}
                    touched={touched.fund_id}
                    readonly={readonly}
                    label="Name of Fund"
                    name="fund_id"
                    placeholder="Select Name of Fund"
                    api={`${FINANCE_URL.DEPARTMENT_URL.get}`}
                    required
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.journal_voucher_no}
                    error={errors.journal_voucher_no}
                    touched={touched.journal_voucher_no}
                    readonly={readonly}
                    label="Journal Voucher No"
                    name="journal_voucher_no"
                    placeholder="Enter Journal Voucher No"
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_id}
                    error={errors.bank_id}
                    touched={touched.bank_id}
                    readonly={readonly}
                    label="Name of Bank"
                    name="bank_id"
                    placeholder="Select Bank"
                    api={`${FINANCE_URL.DEPARTMENT_URL.get}`}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payment_date}
                    error={errors.payment_date}
                    touched={touched.payment_date}
                    readonly={readonly}
                    label="Date of Payment"
                    name="payment_date"
                    type="date"
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department_id}
                    error={errors.department_id}
                    touched={touched.department_id}
                    readonly={readonly}
                    label="Name of Department"
                    name="department_id"
                    placeholder="Select Department"
                    api={`${FINANCE_URL.DEPARTMENT_URL.get}`}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pay_slip_ref_no}
                    error={errors.pay_slip_ref_no}
                    touched={touched.pay_slip_ref_no}
                    readonly={readonly}
                    label="Pay-in-Slip Ref No"
                    name="pay_slip_ref_no"
                    placeholder="Enter Pay-in-Slip Ref No"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pay_slip_date}
                    error={errors.pay_slip_date}
                    touched={touched.pay_slip_date}
                    readonly={readonly}
                    label="Pay in Slip Date"
                    name="pay_slip_date"
                    type="date"
                    placeholder="undefined"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.crv_bpv_no}
                    error={errors.crv_bpv_no}
                    touched={touched.crv_bpv_no}
                    readonly={readonly}
                    label="CRV/BPV No"
                    name="crv_bpv_no"
                    placeholder="Enter CRV/BPV No"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.receipt_date}
                    error={errors.receipt_date}
                    touched={touched.receipt_date}
                    readonly={readonly}
                    label="Receipt Date"
                    name="receipt_date"
                    type="date"
                    placeholder="undefined"
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.primary_acc_code_id}
                    error={errors.primary_acc_code_id}
                    touched={touched.primary_acc_code_id}
                    readonly={readonly}
                    label="Primary Accounting Code"
                    name="primary_acc_code_id"
                    placeholder="Select Primary Accounting Code"
                    api={`${FINANCE_URL.DEPARTMENT_URL.get}`}
                    required
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payment_order_no}
                    error={errors.payment_order_no}
                    touched={touched.payment_order_no}
                    readonly={readonly}
                    label="Payment Order No"
                    name="payment_order_no"
                    placeholder="Enter Payment Order No"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.acc_description}
                    error={errors.acc_description}
                    touched={touched.acc_description}
                    readonly={readonly}
                    label="Accounting Description"
                    name="acc_description"
                    placeholder="Enter Accounting Description"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.debit_amount}
                    error={errors.debit_amount}
                    touched={touched.debit_amount}
                    readonly={readonly}
                    label="Debit Amount (Rs)"
                    name="debit_amount"
                    type="number"
                    placeholder="Enter Debit Amount"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.credit_amount}
                    error={errors.credit_amount}
                    touched={touched.credit_amount}
                    readonly={readonly}
                    label="Credit Amount (Rs)"
                    name="credit_amount"
                    type="number"
                    placeholder="Enter Credit Amount"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.remittance_money_no}
                    error={errors.remittance_money_no}
                    touched={touched.remittance_money_no}
                    readonly={readonly}
                    label="Challan for Remittance of Money No"
                    name="remittance_money_no"
                    placeholder="Enter Challan for Remittance of Money No"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    error={errors.amount}
                    touched={touched.amount}
                    readonly={readonly}
                    label="Amount (Rs)"
                    name="amount"
                    type="number"
                    placeholder="Enter Amount"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cheque_no}
                    error={errors.cheque_no}
                    touched={touched.cheque_no}
                    readonly={readonly}
                    label="Cheque No"
                    name="cheque_no"
                    placeholder="Enter Cheque No"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.total_amount}
                    error={errors.total_amount}
                    touched={touched.total_amount}
                    readonly={readonly}
                    label="Total Amount (Rs)"
                    name="total_amount"
                    type="number"
                    placeholder="Enter Total Amount"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount_in_words}
                    error={errors.amount_in_words}
                    touched={touched.amount_in_words}
                    readonly={readonly}
                    label="Total Amount in Word"
                    name="amount_in_words"
                    placeholder="Enter Total Amount in Word"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.prepared_by}
                    error={errors.prepared_by}
                    touched={touched.prepared_by}
                    readonly={readonly}
                    label="Prepared By"
                    name="prepared_by"
                    placeholder="Enter Prepared By"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.prepared_by_date}
                    error={errors.prepared_by_date}
                    touched={touched.prepared_by_date}
                    readonly={readonly}
                    label="Prepared By Date"
                    name="prepared_by_date"
                    type="date"
                    placeholder="undefined"
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.verified_by_id}
                    error={errors.verified_by_id}
                    touched={touched.verified_by_id}
                    readonly={readonly}
                    label="Verified By"
                    name="verified_by_id"
                    placeholder="Select Verified By"
                    api={`${FINANCE_URL.DEPARTMENT_URL.get}`}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.verified_by_date}
                    error={errors.verified_by_date}
                    touched={touched.verified_by_date}
                    readonly={readonly}
                    label="Verified By Date"
                    name="verified_by_date"
                    type="date"
                    placeholder="undefined"
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.approved_by_id}
                    error={errors.approved_by_id}
                    touched={touched.approved_by_id}
                    readonly={readonly}
                    label="Approved By"
                    name="approved_by_id"
                    placeholder="Select Approved By"
                    api={`${FINANCE_URL.DEPARTMENT_URL.get}`}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.approved_by_date}
                    error={errors.approved_by_date}
                    touched={touched.approved_by_date}
                    readonly={readonly}
                    label="Approved By Date"
                    name="approved_by_date"
                    type="date"
                    placeholder="undefined"
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.posted_by_id}
                    error={errors.posted_by_id}
                    touched={touched.posted_by_id}
                    readonly={readonly}
                    label="Posted By"
                    name="posted_by_id"
                    placeholder="Select Posted By"
                    api={`${FINANCE_URL.DEPARTMENT_URL.get}`}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.posted_by_date}
                    error={errors.posted_by_date}
                    touched={touched.posted_by_date}
                    readonly={readonly}
                    label="Posted By Date"
                    name="posted_by_date"
                    type="date"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.receiver_name}
                    error={errors.receiver_name}
                    touched={touched.receiver_name}
                    readonly={readonly}
                    label="Signature of the Receiver"
                    name="receiver_name"
                    placeholder="Enter Signature of the Receiver"
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
