"use client";

import React from "react";
import { Formik, FormikHelpers } from "formik";
import goBack from "@/utils/helper";
import Select from "@/components/global/atoms/Select";
import Input from "@/components/global/atoms/Input";
import { FINANCE_URL } from "@/utils/api/urls";
import Button from "@/components/global/atoms/Button";
import { ReceiptRegisterDetailsData } from "@/utils/types/masters/receipt_register_types";
import { useSelector } from "react-redux";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-03-2024
 * | Created for- Formik Container
 * | Status- Done
 */

export interface FormikWrapperProps {
  initialValues: ReceiptRegisterDetailsData;
  enableReinitialize?: boolean;
  validationSchema: object;
  onSubmit: (
    values: ReceiptRegisterDetailsData,
    actions?: FormikHelpers<ReceiptRegisterDetailsData>
  ) => void;
  readonly?: boolean;
  onClose?: () => void;
  removeShadow?: boolean;
  title: string;
  resetInitialValue?: () => void;
}

const FormikW: React.FC<FormikWrapperProps> = (props) => {
  const user = useSelector((state: any) => state.user.user);
  /////////////// For Transforming in JSON

  const {
    initialValues,
    validationSchema,
    onSubmit,
    readonly = false,
    onClose,
    enableReinitialize,
    removeShadow = false,
  } = props;

  return (
    <section
      className={`bg-white ${removeShadow ? "px-3" : "shadow-2xl p-6 border"} `}
    >
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
              <div className="flex flex-col">
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.receipt_no}
                    error={errors.receipt_no}
                    touched={touched.receipt_no}
                    readonly={readonly}
                    isRequired
                    label="Receipt Number"
                    name="receipt_no"
                    placeholder="Enter Receipt Number"
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ulb_id}
                    error={errors.ulb_id}
                    touched={touched.ulb_id}
                    readonly={readonly}
                    isRequired
                    label="ULBs"
                    name="ulb_id"
                    placeholder="Select ULBs"
                    api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.primary_acc_code_id}
                    error={errors.primary_acc_code_id}
                    touched={touched.primary_acc_code_id}
                    readonly={readonly}
                    isRequired
                    label="Primary Accounting Code"
                    name="primary_acc_code_id"
                    placeholder="Select Primary Accounting Code"
                    api={`${FINANCE_URL.ACCOUNTING_CODE_URL.get}`}
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.revenue_module_id}
                    error={errors.revenue_module_id}
                    touched={touched.revenue_module_id}
                    readonly={readonly}
                    isRequired
                    label="Revenue Module Name"
                    name="revenue_module_id"
                    placeholder="Select Revenue Module Name"
                    api={`${FINANCE_URL.REVENUE_MODULE.get}`}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.paid_by}
                    error={errors.paid_by}
                    touched={touched.paid_by}
                    readonly={readonly}
                    isRequired
                    label="Paid By"
                    name="paid_by"
                    placeholder="Enter Paid By"
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.receipt_mode_id}
                    error={errors.receipt_mode_id}
                    touched={touched.receipt_mode_id}
                    readonly={readonly}
                    isRequired
                    label="Mode of Receipt"
                    name="receipt_mode_id"
                    placeholder="Select Mode of Receipt"
                    api={`${FINANCE_URL.RECEIPT_MODE.get}`}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.receipt_date}
                    error={errors.receipt_date}
                    touched={touched.receipt_date}
                    readonly={readonly}
                    isRequired
                    label="Receipt Date"
                    name="receipt_date"
                    type="date"
                    placeholder="undefined"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cheque_or_draft_no}
                    error={errors.cheque_or_draft_no}
                    touched={touched.cheque_or_draft_no}
                    readonly={readonly}
                    label="Cheque / Draft No"
                    name="cheque_or_draft_no"
                    placeholder="Enter Cheque / Draft No"
                  />

                  {/* <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_id}
                    error={errors.bank_id}
                    touched={touched.bank_id}
                    readonly={readonly}
                    label="Bank"
                    name="bank_id"
                    placeholder="Select Bank"
                    api={`${FINANCE_URL.ACCOUNTING_CODE_URL.get}`}
                  /> */}

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_amount}
                    error={errors.bank_amount}
                    touched={touched.bank_amount}
                    readonly={readonly}
                    label="Bank Amount"
                    name="bank_amount"
                    type="number"
                    placeholder="Enter Bank Amount"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cash_amount}
                    error={errors.cash_amount}
                    touched={touched.cash_amount}
                    readonly={readonly}
                    label="Cash"
                    name="cash_amount"
                    type="number"
                    placeholder="Enter Cash Amount"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_acc_no}
                    error={errors.bank_acc_no}
                    touched={touched.bank_acc_no}
                    readonly={readonly}
                    label="Deposited into Bank Account No"
                    name="bank_acc_no"
                    placeholder="Enter Bank Account No"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.deposit_date}
                    error={errors.deposit_date}
                    touched={touched.deposit_date}
                    readonly={readonly}
                    label="Date of Deposit"
                    name="deposit_date"
                    type="date"
                    placeholder="undefined"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.realisation_date}
                    error={errors.realisation_date}
                    touched={touched.realisation_date}
                    readonly={readonly}
                    label="Date of Realisation"
                    name="realisation_date"
                    type="date"
                    placeholder="undefined"
                  />

                  <SelectForNoApi
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={String(values.wheather_returned)}
                    error={errors.wheather_returned}
                    touched={touched.wheather_returned}
                    readonly={readonly}
                    label="Wheather Returned"
                    name="wheather_returned"
                    placeholder="Select Weather Returned"
                    data={[
                      {
                        id: 1,
                        name: "Yes",
                        value: "true",
                      },
                      {
                        id: 2,
                        name: "No",
                        value: "false",
                      },
                    ]}
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.remarks}
                    error={errors.remarks}
                    touched={touched.remarks}
                    readonly={readonly}
                    isRequired
                    label="Remarks"
                    name="remarks"
                    placeholder="Enter Remarks"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <h2 className="mt-6 text-secondary">
                      Entered By<span className="text-red-600 pl-2">*</span>
                    </h2>
                    <Input
                      value={values.del_entered_by_name || user?.name}
                      readonly={true}
                      label=""
                      name="entered_by"
                      placeholder="Enter Name"
                    />

                    <Input
                      value={
                        values.del_entered_by_designation ||
                        user?.designation?.name
                      }
                      readonly={true}
                      label=""
                      name="designation"
                      placeholder="Enter Designation"
                    />

                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.entered_by_print_name}
                      error={errors.entered_by_print_name}
                      touched={touched.entered_by_print_name}
                      readonly={readonly}
                      label=""
                      name="entered_by_print_name"
                      placeholder="Enter Print Name"
                    />
                  </div>
                  {readonly && (
                    <div className="flex flex-col">
                      <h2 className="mt-6 text-secondary">Checked By</h2>
                      <Input
                        value={values.del_checked_by_name}
                        readonly={readonly}
                        label=""
                        name="checked_by"
                        placeholder="Enter Name"
                      />

                      <Input
                        value={values.del_checked_by_designation}
                        readonly={readonly}
                        label=""
                        name="designation1"
                        placeholder="Enter Designation"
                      />

                      <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.checked_by_print_name}
                        error={errors.checked_by_print_name}
                        touched={touched.checked_by_print_name}
                        readonly={readonly}
                        label=""
                        name="checked_by_print_name"
                        placeholder="Enter Print Name"
                      />
                    </div>
                  )}
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
