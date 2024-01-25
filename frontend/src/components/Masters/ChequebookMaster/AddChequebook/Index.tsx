"use client";

import React from "react";
import axios from "@/lib/axiosConfig";
import { useMutation } from "react-query";
import { Formik } from "formik";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import type { AddChequebookDetailsData } from "@/utils/types/chequebook_master_types";
import {
  CheckbookDetailsSchema,
  initialChequebookDetails,
} from "@/utils/validation/masters/chequebook_master.validation";
import toast, { Toaster } from "react-hot-toast";
import PrimaryButton from "@/components/Helpers/Button";
import { QueryClient } from "@tanstack/react-query";

export const HeroAddChequebook = () => {
  const queryClient = new QueryClient();

  // Add Bank Details
  const createBankDetails = async (
    values: AddChequebookDetailsData
  ): Promise<AddChequebookDetailsData> => {
    const res = await axios({
      url: `/api/finance/add-bank-details`,
      method: "POST",
      data: values,
    });
    return res.data;
  };
  const { mutate } = useMutation(createBankDetails, {
    onSuccess: (data) => {
      console.log(data);

      toast.success("Successfully Added Bank Details!");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  return (
    <>
      <Toaster />

      <section className="border rounded-lg border-zinc-300 p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>Add Chequebook</SubHeading>
        </div>

        <div className="mt-8">
          <Formik
            initialValues={initialChequebookDetails}
            validationSchema={CheckbookDetailsSchema}
            onSubmit={(values) => {
              console.log(values);
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
                    value={values.bankName}
                    error={errors.bankName}
                    touched={touched.bankName}
                    label="Date"
                    name="bankName"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ifscCode}
                    error={errors.ifscCode}
                    touched={touched.ifscCode}
                    label="Issuer Name"
                    name="ifscCode"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.branch}
                    error={errors.branch}
                    touched={touched.branch}
                    label="Name of the bank"
                    name="branch"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.micrCode}
                    error={errors.micrCode}
                    touched={touched.micrCode}
                    label="Employee Name"
                    name="micrCode"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.micrCode}
                    error={errors.micrCode}
                    touched={touched.micrCode}
                    label="Bank Branch Name"
                    name="micrCode"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.micrCode}
                    error={errors.micrCode}
                    touched={touched.micrCode}
                    label="Chequebook No From"
                    name="micrCode"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.micrCode}
                    error={errors.micrCode}
                    touched={touched.micrCode}
                    label="Bank Account No"
                    name="micrCode"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.micrCode}
                    error={errors.micrCode}
                    touched={touched.micrCode}
                    label="Chequebook No To"
                    name="micrCode"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.micrCode}
                    error={errors.micrCode}
                    touched={touched.micrCode}
                    label="IFSC Code"
                    name="micrCode"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.micrCode}
                    error={errors.micrCode}
                    touched={touched.micrCode}
                    label="Number of Pages"
                    name="micrCode"
                  />
                </div>

                <div className="mt-4 flex items-center gap-5 justify-end">
                  <PrimaryButton buttonType="button" variant="cancel">
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
