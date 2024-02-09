"use client";

import React from "react";
import axios from "@/lib/axiosConfig";
import { useMutation } from "react-query";
import { Formik } from "formik";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import * as Yup from "yup";
import type { BillPaymentDetailsData } from "@/utils/types/bill_payment_entry_types";
import toast, { Toaster } from "react-hot-toast";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import PaymentModeRadioWrapper from "@/components/Helpers/PaymentModeRadioWrapper";
import PaymentModeRadioButton from "@/components/Helpers/PaymentModeRadioButton";
import {
    BillPaymentDetailsSchema,
    initialBillPaymentDetails,
  } from "@/utils/validation/transactions/bill_payment.validation";

export const HeroViewBillPaymentEntry = ({ paymentId }: { paymentId: string }) => {
  // Add New Payment Details
  const createBillPaymentDetails = async (
    values: BillPaymentDetailsData
  ): Promise<BillPaymentDetailsData> => {
    const res = await axios({
      url: `/api/finance/add-bank-details/df`,
      method: "POST",
      data: values,
    });
    return res.data;
  };
  const { mutate } = useMutation(createBillPaymentDetails, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("Successfully Added New Payment");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      console.log("settled");
      // queryClient.invalidateQueries("create");
    },
  });
  
  return (
    <>
      <Toaster />

      <section className="border rounded-lg border-zinc-300 p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>View/Edit Payment Entry</SubHeading>
        </div>

        <div className="mt-8">
          <Formik
            initialValues={initialBillPaymentDetails}
            validationSchema={BillPaymentDetailsSchema}
            onSubmit={(values) => {
              mutate(values);
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
                <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payment_date}
                    error={errors.payment_date}
                    touched={touched.payment_date}
                    label="Payment Date"
                    name="payment_date"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.narration}
                    error={errors.narration}
                    touched={touched.narration}
                    label="Narration"
                    name="narration"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payment_type_id}
                    error={errors.payment_type_id}
                    touched={touched.payment_type_id}
                    label="Payment Type"
                    name="payment_type_id"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department_id}
                    error={errors.department_id}
                    touched={touched.department_id}
                    label="Department"
                    name="department_id"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payee_name}
                    error={errors.payee_name}
                    touched={touched.payee_name}
                    label="Payee Name"
                    name="payee_name"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.adminis_ward_id}
                    error={errors.adminis_ward_id}
                    touched={touched.adminis_ward_id}
                    label="Administrative Ward"
                    name="adminis_ward_id"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.grant_id}
                    error={errors.grant_id}
                    touched={touched.grant_id}
                    label="Grant"
                    name="grant_id"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    error={errors.address}
                    touched={touched.address}
                    label="Address"
                    name="address"
                  />
                </div>

                <hr className="h-[1px] rounded my-12 mx-10 bg-[#12743B]" />

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
                <div className="mt-8">
                  <InputBox
                    className="w-72"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    error={errors.address}
                    touched={touched.address}
                    label="Payment Amount"
                    name="amount"
                  />
                </div>

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
                  <PrimaryButton buttonType="submit" variant="primary">
                    Save
                  </PrimaryButton>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};
