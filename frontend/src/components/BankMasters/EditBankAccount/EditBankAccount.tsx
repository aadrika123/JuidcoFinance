"use client";

import React from "react";
import { Formik } from "formik";
import PrimaryButton from "@/components/Helpers/Button";
import InputBox from "@/components/Helpers/InputBox";
import { initialBankDetailsValues } from "../Index";
import { AddBankDetailsSchema } from "../Index";

const EditBankAccount = () => {
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
                name="bankName"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ifscCode}
                error={errors.ifscCode}
                touched={touched.ifscCode}
                label="IFSC Code *"
                name="ifscCode"
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
                name="micrCode"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branchAddress}
                error={errors.branchAddress}
                touched={touched.branchAddress}
                label="Bank Branch Address"
                name="branchAddress"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactNo}
                error={errors.contactNo}
                touched={touched.contactNo}
                label="Contact Number"
                name="contactNo"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branchCity}
                error={errors.branchCity}
                touched={touched.branchCity}
                label="Bank Branch City"
                name="branchCity"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branchDistrict}
                error={errors.branchDistrict}
                touched={touched.branchDistrict}
                label="Bank Branch District"
                name="branchDistrict"
              />
              <InputBox
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branchState}
                error={errors.branchState}
                touched={touched.branchState}
                label="Bank Branch State "
                name="branchState"
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
                name="contactPersonName"
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
