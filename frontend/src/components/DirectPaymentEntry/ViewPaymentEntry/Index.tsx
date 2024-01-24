"use client";

import React from "react";
import axios from "@/lib/axiosConfig";
import { useMutation } from "react-query";
import { Formik } from "formik";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import * as Yup from "yup";
import type { AddPaymentDetailsData } from "@/utils/types/direct_payment_entry_types";
import toast, { Toaster } from "react-hot-toast";
import PrimaryButton from "@/components/Helpers/Button";
import goBack from "@/utils/helper";
import PaymentModeRadioWrapper from "@/components/Helpers/PaymentModeRadioWrapper";
import PaymentModeRadioButton from "@/components/Helpers/PaymentModeRadioButton";

export const HeroViewPaymentEntry = ({ paymentId }: { paymentId: string }) => {
  // Add New Payment Details
  const createPaymentDetails = async (
    values: AddPaymentDetailsData
  ): Promise<AddPaymentDetailsData> => {
    const res = await axios({
      url: `/api/finance/add-bank-details/df`,
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
    onSettled: () => {
      console.log("settled");
      // queryClient.invalidateQueries("create");
    },
  });
  // ----- FORMIK & YUP FORM VAIDATION ---------- //
  const AddPaymenttDetailsSchema = Yup.object().shape({
    paymentDate: Yup.string().required("Payment Date is required"),
    narration: Yup.string().required("Narration is required"),
    paymentType: Yup.string().required("Payment Type is required"),
    department: Yup.string().required("Department is required"),
    payeeName: Yup.string().required("Payee Name is required"),
    administrativeWard: Yup.string().required(
      "Administrative Ward is required"
    ),
    grant: Yup.string().required("Grant is required"),
    address: Yup.string().required("Address is required"),
  });

  const initialPaymenttDetails = {
    paymentDate: "",
    narration: "",
    paymentType: "",
    department: "",
    payeeName: "",
    administrativeWard: "",
    grant: "",
    address: "",
  };

  // ----- FORMIK & YUP FORM VAIDATION ---------- //

  return (
    <>
      <Toaster />

      <section className="border rounded-lg border-zinc-300 p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>View/Edit Payment Entry</SubHeading>
        </div>

        <div className="mt-8">
          <Formik
            initialValues={initialPaymenttDetails}
            validationSchema={AddPaymenttDetailsSchema}
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
                    value={values.paymentDate}
                    error={errors.paymentDate}
                    touched={touched.paymentDate}
                    label="Payment Date"
                    name="paymentDate"
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
                    value={values.paymentType}
                    error={errors.paymentType}
                    touched={touched.paymentType}
                    label="Payment Type"
                    name="paymentType"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department}
                    error={errors.department}
                    touched={touched.department}
                    label="Department"
                    name="department"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payeeName}
                    error={errors.payeeName}
                    touched={touched.payeeName}
                    label="Payee Name"
                    name="payeeName"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.administrativeWard}
                    error={errors.administrativeWard}
                    touched={touched.administrativeWard}
                    label="Administrative Ward"
                    name="administrativeWard"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.grant}
                    error={errors.grant}
                    touched={touched.grant}
                    label="Grant"
                    name="grant"
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
                      name="paymentEntryMode"
                      label="Select Mode of Payment"
                    />
                    <div className="flex items-center">
                      <input
                        className="mr-1 bg-white"
                        id="checkbox1"
                        type="checkbox"
                      ></input>
                      <label htmlFor="checkbox1">User Common Budget *</label>
                    </div>
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
