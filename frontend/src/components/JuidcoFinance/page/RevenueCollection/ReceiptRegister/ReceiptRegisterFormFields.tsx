"use client";

import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import goBack from "@/utils/helper";
import Select from "@/components/global/atoms/Select";
import Input from "@/components/global/atoms/Input";
import { FINANCE_URL } from "@/utils/api/urls";
import Button from "@/components/global/atoms/Button";
import { useSelector } from "react-redux";
import RadioButtons from "@/components/global/atoms/RadioButton";
import { ReceiptRegisterDetailsData } from "./receipt_register_types";
import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";
import InputForUpdateField from "@/components/global/atoms/InputForUpdateValue";
import { useParams } from "next/navigation";
import SelectForUpdateValue from "@/components/global/atoms/SelectForUpdateValue";

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

type stateProps = {
  ulbId: number | string | null;
  accCodeId: number | string | null;
  revModId: number | string | null;
  recMode: number | string;
};

const FormikW: React.FC<FormikWrapperProps> = (props) => {
  const params = useParams();
  const user = useSelector((state: any) => state.user.user?.userDetails);
  const [state, setState] = useState<stateProps>({
    ulbId: user?.ulb_id,
    accCodeId: null,
    revModId: null,
    recMode: "",
  });
  const { ulbId, accCodeId } = state;
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
  const handleulb = (e: number | string) => {
    setState((prev) => ({ ...prev, ulbId: e }));
  };

  const handleLedger = (e: number | string) => {
    setState((prev) => ({ ...prev, accCodeId: e }));
  };

  const handleRevModule = (e: number | string) => {
    setState({ ...state, revModId: e });
  };

  const fetchData = async (endpoint: string) => {
    try {
      if (accCodeId) {
        const res = await axios({
          url: endpoint,
          method: "GET",
        });

        return res.data?.data;
      }
      throw "Something Went Wrong!!!";
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const useForApiCall = (endpoint: string) => {
    return useQuery([endpoint], () => fetchData(endpoint));
  };

  //// Get bank_acc_no
  const { data: dataList, isFetching: isBankFetching } = useForApiCall(
    `${FINANCE_URL.BANK_MASTER_URL.getByAccCodeAndUlbId}/${accCodeId}/${ulbId}`
  );

  //// Get revenue accounted type
  const { data: raType, isFetching: isRevFetching } = useForApiCall(
    `${FINANCE_URL.REVENUE_ACCOUNTED_TYPE.getByReveAndAccId}/${accCodeId}`
  );

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
            setFieldValue,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <div id="receipt-print" className="flex flex-col">
                <div className="grid grid-cols-2 gap-x-6 gap-4">
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.receipt_no}
                    error={errors.receipt_no}
                    touched={touched.receipt_no}
                    readonly={readonly || (params?.id ? true : false)}
                    required
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
                    readonly={true}
                    required
                    label="ULBs"
                    name="ulb_id"
                    placeholder="Select ULBs"
                    api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
                    handler={handleulb}
                  />

                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.primary_acc_code_id}
                    error={errors.primary_acc_code_id}
                    touched={touched.primary_acc_code_id}
                    readonly={readonly}
                    required
                    label="Primary Accounting Code"
                    name="primary_acc_code_id"
                    placeholder="Select Primary Accounting Code"
                    api={`${FINANCE_URL.ACCOUNTING_CODE_URL.getLedgerCodes}`}
                    handler={handleLedger}
                  />

                  <SelectForUpdateValue
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={
                      raType?.revenue_module?.id || values.revenue_module_id
                    }
                    error={errors.revenue_module_id}
                    touched={touched.revenue_module_id}
                    readonly={true}
                    required
                    label="Revenue Module Name"
                    name="revenue_module_id"
                    placeholder="Select Revenue Module Name"
                    api={`${FINANCE_URL.REVENUE_MODULE.get}`}
                    handler={handleRevModule}
                    setFieldValue={setFieldValue}
                    isNull={
                      raType?.revenue_module?.id === undefined &&
                      !isRevFetching &&
                      accCodeId &&
                      true
                    }
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.paid_by}
                    error={errors.paid_by}
                    touched={touched.paid_by}
                    readonly={readonly}
                    required
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
                    required
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
                    required
                    label="Receipt Date"
                    name="receipt_date"
                    type="date"
                    placeholder="undefined"
                  />

                  {values.receipt_mode_id_name === "cheque" && (
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
                  )}

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

                  {(values.receipt_mode_id_name === "online" ||
                    values.receipt_mode_id_name === "cheque") && (
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bank_amount}
                      error={errors.bank_amount}
                      touched={touched.bank_amount}
                      readonly={readonly || values.cheque_or_draft_no === ""}
                      label="Bank Amount (amounts received through cheque / draft)"
                      name="bank_amount"
                      type="number"
                      placeholder="Enter Bank Amount"
                    />
                  )}

                  {values.receipt_mode_id_name === "cash" && (
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cash_amount}
                      error={errors.cash_amount}
                      touched={touched.cash_amount}
                      readonly={readonly || values.cheque_or_draft_no !== ""}
                      label="Cash Amount (amounts received by cash)"
                      name="cash_amount"
                      type="number"
                      placeholder="Enter Cash Amount"
                    />
                  )}

                  <InputForUpdateField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={dataList?.bank_acc_no || values.bank_acc_no}
                    error={errors.bank_acc_no}
                    touched={touched.bank_acc_no}
                    readonly={true}
                    setFieldValue={setFieldValue}
                    required
                    label="Deposited into Bank Account No"
                    name="bank_acc_no"
                    placeholder="Enter Bank Account No"
                    isNull={
                      dataList?.bank_acc_no === undefined &&
                      !isBankFetching &&
                      ulbId &&
                      accCodeId &&
                      true
                    }
                  />

                  <SelectForUpdateValue
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={
                      raType?.revenue_accounted_type?.id ||
                      values.revenue_accounted_type_id
                    }
                    error={errors.revenue_accounted_type_id}
                    touched={touched.revenue_accounted_type_id}
                    readonly={true}
                    required
                    label="Revenue Accounted By"
                    name="revenue_accounted_type_id"
                    placeholder="Select Revenue Accounted By"
                    api={`${FINANCE_URL.REVENUE_ACCOUNTED_TYPE.get}`}
                    setFieldValue={setFieldValue}
                    isNull={
                      raType?.revenue_accounted_type?.id === undefined &&
                      !isRevFetching &&
                      accCodeId &&
                      true
                    }
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
                  <RadioButtons
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={`${values.wheather_returned}`}
                    error={errors.wheather_returned}
                    touched={touched.wheather_returned}
                    readonly={readonly}
                    label="Wheather Returned"
                    name="wheather_returned"
                    options={[
                      {
                        key: "Yes",
                        value: "true",
                      },
                      {
                        key: "No",
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
                    required
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
                    {values.del_entered_by_name !== "null" && (
                      <>
                        <Input
                          value={
                            values.del_entered_by_designation || user?.role
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
                      </>
                    )}
                  </div>
                  {readonly && (
                    <div className="flex flex-col">
                      <h2 className="mt-6 text-secondary">Checked By</h2>
                      <Input
                        value={values?.del_checked_by_name}
                        readonly={readonly}
                        label=""
                        name="checked_by"
                        placeholder="Enter Name"
                      />

                      <Input
                        value={values?.del_checked_by_designation}
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
