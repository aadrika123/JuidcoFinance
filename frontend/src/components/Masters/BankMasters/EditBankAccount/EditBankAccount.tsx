"use client";

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import PrimaryButton from "@/components/Helpers/Button";
import InputBox from "@/components/Helpers/InputBox";
import { AddBankDetailsSchema } from "../Index";
import axios from "@/lib/axiosConfig";
import { AddBankDetailsData } from "@/utils/types/bank_master_types";

const EditBankAccount = ({ bankID }: { bankID: string }) => {
  const [bankAccountDetails, setBankAccountDetails] =
    useState<AddBankDetailsData>();

  // get single bank account details
  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `/bank-master/get-by-id/${bankID}`,
        method: "GET",
      });
      setBankAccountDetails(res?.data?.data);
    })();
  }, [bankID]);
  console.log(bankAccountDetails, "data");
  //Formik initiali state.
  const initialBankDetailsValues = {
    bankName: bankAccountDetails?.bank_name,
    ifscCode: bankAccountDetails?.ifsc_code,
    branch: bankAccountDetails?.branch,
    micrCode: bankAccountDetails?.micr_code,
    branchAddress: bankAccountDetails?.branch_address,
    branchCity: bankAccountDetails?.branch_city,
    branchState: bankAccountDetails?.branch_state,
    branchDistrict: bankAccountDetails?.branch_district,
    email: bankAccountDetails?.email,
    contactNo: bankAccountDetails?.contact_no,
    contactPersonName: bankAccountDetails?.contact_person_name,
  };

  return (
    <>
      <Formik
        initialValues={initialBankDetailsValues}
        validationSchema={AddBankDetailsSchema}
        onSubmit={(values) => {
          console.log(values);
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
            <div className="grid grid-cols-2 gap-x-6 gap-4 ">
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bankName}
                error={errors.bankName}
                touched={touched.bankName}
                label="Name of Bank *"
                name="bank_name"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ifscCode}
                error={errors.ifscCode}
                touched={touched.ifscCode}
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
                value={values.micrCode}
                error={errors.micrCode}
                touched={touched.micrCode}
                label="MICR Code"
                name="micr_code"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branchAddress}
                error={errors.branchAddress}
                touched={touched.branchAddress}
                label="Bank Branch Address"
                name="branch_address"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactNo}
                error={errors.contactNo}
                touched={touched.contactNo}
                label="Contact Number"
                name="contact_no"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branchCity}
                error={errors.branchCity}
                touched={touched.branchCity}
                label="Bank Branch City"
                name="branch_city"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branchDistrict}
                error={errors.branchDistrict}
                touched={touched.branchDistrict}
                label="Bank Branch District"
                name="branch_district"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branchState}
                error={errors.branchState}
                touched={touched.branchState}
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
                value={values.contactPersonName}
                error={errors.contactPersonName}
                touched={touched.contactPersonName}
                name="contact_person_name"
                label="Contact Person Name / Designation"
              />
            </div>
            <div className="mt-4 flex items-center gap-5 justify-end">
              <PrimaryButton buttonType="button" variant="cancel">
                Close
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
    </>
  );
};

export default EditBankAccount;
