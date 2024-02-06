"use client";

import React, { useState } from "react";
import axios from "@/lib/axiosConfig";
import { useMutation } from "react-query";
import { Formik } from "formik";
import { SubHeading } from "@/components/Helpers/Heading";
import toast, { Toaster } from "react-hot-toast";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import { AddPaymentDetailsData } from "@/utils/types/direct_payment_entry_types";
import PaymentModeRadioWrapper from "@/components/Helpers/PaymentModeRadioWrapper";
import PaymentModeRadioButton from "@/components/Helpers/PaymentModeRadioButton";
import {
  PaymentDetailsSchema,
  initialPaymentDetails,
} from "@/utils/validation/transactions/direct_payment.validation";
import { FINANCE_URL } from "@/utils/api/urls";
import InputBox from "@/components/Helpers/InputBox";
import DateInputBox from "@/components/Helpers/DateInputBox";
import DropDownList from "@/components/Helpers/DropDownList";
import CheckBox from "@/components/Helpers/CheckBox";
import SubLedgerTable from "../SubLedgerTable/SubLedgerTable";

export const HeroAddPaymentEntry = () => {
  // Add New Payment Details
  const createPaymentDetails = async (
    values: AddPaymentDetailsData
  ): Promise<AddPaymentDetailsData> => {
    const res = await axios({
      url: FINANCE_URL.DIRECT_PAYMENT_ENTRY_URL.create,
      method: "POST",
      data: values,
    });
    return res.data;
  };
  const { mutate } = useMutation(createPaymentDetails, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("Successfully Added New Payment");
    },
    onError: () => {
      alert("there was an error");
    },
  });
  // Inside your component

  const [dirPaymentEntries, setDirPaymentEntries] = useState<
    AddPaymentDetailsData[]
  >([
    {
      payment_date: "",
      narration: "",
      payment_type_id: "",
      department_id: "",
      payee_name: "",
      adminis_ward_id: "",
      grant_id: "",
      address: "",
      amount: "",
      user_common_budget: false,
      payment_mode: "",
      ledger_code_id: 0,
    },
  ]);

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>, index: number
  ) => {
    if (e) {
      e.preventDefault();
    }
    setDirPaymentEntries((prev) => {
      const updatedEntries = [...prev];
        updatedEntries[index] = { ...updatedEntries[index], ledger_code_id: parseInt(e.target.value) };
        return updatedEntries;

    });
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>, index: number
  ) => {
    if (e) {
      e.preventDefault();
    }

    setDirPaymentEntries((prev) => {
      const updatedEntries = [...prev];
        updatedEntries[index] = { ...updatedEntries[index], amount: e.target.value };
        return updatedEntries;

    });

  };

  const handleRemoveEntry = (index: number) =>{
    setDirPaymentEntries((prev) => {
      const updatedEntries = [...prev];
      return updatedEntries.filter((i, idx) => {
        if(idx !== index){
          return i;
        }
        
      })
    });
  }

  return (
    <>
      <Toaster />
      <section>
        <div className="mt-8">
          <Formik
            initialValues={initialPaymentDetails}
            validationSchema={PaymentDetailsSchema}
            onSubmit={(values, {resetForm}) => {
              console.log("first dsf dfsd", values);
              setDirPaymentEntries((prev) => [...prev, values]);
              resetForm()
              // mutate(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <section className="border rounded-lg border-zinc-300 p-6 px-10">
                  <div className="flex justify-between">
                    <SubHeading>Add New Payment</SubHeading>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-x-6 gap-4 ">
                    {/* <DateInputBox
                    label="Payment Date"
                    name="payment_date"
                    value={values.payment_date}
                    error={errors.payment_date}
                    touched={touched.payment_date}
                  /> */}
                    <InputBox
                      type="date"
                      placeholder="Enter Narration"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.payment_date}
                      error={errors.payment_date}
                      touched={touched.payment_date}
                      label="Payment Date"
                      name="payment_date"
                    />
                    <InputBox
                      type="text"
                      placeholder="Enter Narration"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.narration}
                      error={errors.narration}
                      touched={touched.narration}
                      label="Narration"
                      name="narration"
                    />
                    <DropDownList
                      api={`${FINANCE_URL.PAYMENT_TYPE_URL.get}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Select payment type"
                      value={values.payment_type_id}
                      error={errors.payment_type_id}
                      touched={touched.payment_type_id}
                      label="Payment Type"
                      name="payment_type_id"
                    />
                    <DropDownList
                      api={`${FINANCE_URL.DEPARTMENT_URL.get}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Select department"
                      value={values.department_id}
                      error={errors.department_id}
                      touched={touched.department_id}
                      label="Department"
                      name="department_id"
                    />
                    <InputBox
                      type="text"
                      placeholder="Enter Payee Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.payee_name}
                      error={errors.payee_name}
                      touched={touched.payee_name}
                      label="Payee Name"
                      name="payee_name"
                    />
                    <DropDownList
                      api={`${FINANCE_URL.ADMINIS_WARD_URL.get}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Select administrative ward"
                      value={values.adminis_ward_id}
                      error={errors.adminis_ward_id}
                      touched={touched.adminis_ward_id}
                      label="Administrative Ward"
                      name="adminis_ward_id"
                    />
                    <DropDownList
                      api={`${FINANCE_URL.GRANT_URL.get}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Select grant"
                      value={values.grant_id}
                      error={errors.grant_id}
                      touched={touched.grant_id}
                      label="Grant"
                      name="grant_id"
                    />
                    <InputBox
                      type="text"
                      placeholder="Enter Address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      error={errors.address}
                      touched={touched.address}
                      label="Address"
                      name="address"
                    />
                    <CheckBox
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.user_common_budget}
                      error={errors.user_common_budget}
                      touched={touched.user_common_budget}
                      name="user_common_budget"
                      label="User Common Budget *"
                    />
                  </div>
                </section>
                <section className="mt-8 border rounded-lg border-zinc-300 p-6 px-10">
                  <div className="mb-8 flex justify-between">
                    <SubHeading>Sub-Leger Details</SubHeading>
                  </div>
                  <PaymentModeRadioWrapper label="Select Mode of Payment">
                    <div className="grid grid-cols-2">
                      <PaymentModeRadioButton
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.payment_mode}
                        error={errors.payment_mode}
                        touched={touched.payment_mode}
                        name="payment_mode"
                        label="Select Mode of Payment"
                      />
                    </div>
                  </PaymentModeRadioWrapper>
                  <SubLedgerTable
                    handleSelectChange={handleSelectChange}
                    handleTextChange={handleTextChange}
                    handleRemoveEntry={handleRemoveEntry}
                    tableList={dirPaymentEntries}
                  />
                  <div className="mt-4 flex items-center gap-5 justify-end">
                    <PrimaryButton
                      onClick={goBack}
                      buttonType="button"
                      variant="cancel"
                    >
                      Back
                    </PrimaryButton>

                    <PrimaryButton buttonType="button" variant="cancel">
                      Reset
                    </PrimaryButton>
                    <PrimaryButton buttonType="button" variant="primary">
                      Save
                    </PrimaryButton>
                  </div>
                </section>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};
