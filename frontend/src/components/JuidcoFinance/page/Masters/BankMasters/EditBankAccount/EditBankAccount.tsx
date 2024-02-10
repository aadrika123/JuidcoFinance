"use client";

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import PrimaryButton from "@/components/Helpers/Button";
import InputBox from "@/components/Helpers/InputBox";
import { AddBankDetailsSchema } from "@/utils/validation/masters/bank_master.validation";
import axios from "@/lib/axiosConfig";
import { AddBankDetailsData } from "@/utils/types/bank_master_types";
import { FINANCE_URL } from "@/utils/api/urls";
import goBack from "@/utils/helper";
import { useMutation } from "react-query";
import { QueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";

const EditBankAccount = ({ bankID }: { bankID: string }) => {
  const [bankAccountDetails, setBankAccountDetails] =
    useState<AddBankDetailsData>();

  const queryClient = new QueryClient();

  // get single bank account details
  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${FINANCE_URL.BANK_MASTER_URL.getById}/${bankID}`,
        method: "GET",
      });
      setBankAccountDetails(res?.data?.data);
    })();
  }, [bankID]);

  const updateBankDetails = async (values: AddBankDetailsData) => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BANK_MASTER_URL.update}`,
        method: "POST",
        data: {
          id: bankAccountDetails?.id,
          ...values,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation(updateBankDetails, {
    onSuccess: () => {
      toast.success("Successfully Added Bank Details!");
    },

    onError: (error) => {
      console.log(error);
      alert("there was an error updating");
    },

    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const initialBankDetailsValues = {
    bank_name: bankAccountDetails?.bank_name || "",
    ifsc_code: bankAccountDetails?.ifsc_code || "",
    branch: bankAccountDetails?.branch || "",
    micr_code: bankAccountDetails?.micr_code || "",
    branch_address: bankAccountDetails?.branch_address || "",
    branch_city: bankAccountDetails?.branch_city || "",
    branch_state: bankAccountDetails?.branch_state || "",
    branch_district: bankAccountDetails?.branch_district || "",
    email: bankAccountDetails?.email || "",
    contact_no: bankAccountDetails?.contact_no || "",
    contact_person_name: bankAccountDetails?.contact_person_name || "",
  };

  return (
    <>
      <Toaster />
      <HeaderWidget
        title="Bank Details"
        variant="edit"
      />
      <section className="border bg-white rounded-lg border-[#12743B] p-6 px-10">
      <Formik
        initialValues={initialBankDetailsValues}
        validationSchema={AddBankDetailsSchema}
        enableReinitialize={true}
        onSubmit={(values: AddBankDetailsData) => {
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
          handleReset
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-6 gap-4 ">
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bank_name}
                error={errors.bank_name}
                touched={touched.bank_name}
                label="Name of Bank *"
                name="bank_name"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ifsc_code}
                error={errors.ifsc_code}
                touched={touched.ifsc_code}
                label="IFSC Code *"
                name="ifsc_code"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch}
                error={errors.branch}
                touched={touched.branch}
                label="Bank Branch *"
                name="branch"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.micr_code}
                error={errors.micr_code}
                touched={touched.micr_code}
                label="MICR Code"
                name="micr_code"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch_address}
                error={errors.branch_address}
                touched={touched.branch_address}
                label="Bank Branch Address"
                name="branch_address"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contact_no}
                error={errors.contact_no}
                touched={touched.contact_no}
                label="Contact Number"
                name="contact_no"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch_city}
                error={errors.branch_city}
                touched={touched.branch_city}
                label="Bank Branch City"
                name="branch_city"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch_district}
                error={errors.branch_district}
                touched={touched.branch_district}
                label="Bank Branch District"
                name="branch_district"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch_state}
                error={errors.branch_state}
                touched={touched.branch_state}
                label="Bank Branch State "
                name="branch_state"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                label="Email Id"
                name="email"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contact_person_name}
                error={errors.contact_person_name}
                touched={touched.contact_person_name}
                name="contact_person_name"
                label="Contact Person Name / Designation"
              />
            </div>
            <div className="mt-4 flex items-center gap-5 justify-end">
              <PrimaryButton
                buttonType="button"
                variant="cancel"
                onClick={goBack}
              >
                Back
              </PrimaryButton>
              <PrimaryButton onClick={handleReset} buttonType="button" variant="cancel">
                Reset
              </PrimaryButton>
              <PrimaryButton buttonType="submit" variant="primary">
                Save
              </PrimaryButton>
            </div>
          </form>
        )}
      </Formik>
      </section>
    </>
  );
};

export default EditBankAccount;
