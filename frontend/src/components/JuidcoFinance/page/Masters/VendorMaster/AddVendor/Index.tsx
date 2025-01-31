"use client";

// Imports // ----------------------------------------------------------------
import React from "react";
import axios from "@/lib/axiosConfig";
import InputBox from "@/components/Helpers/InputBox";
import { useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import { Formik } from "formik";
import type { VendorDetailsData } from "@/utils/types/vendor_master_types";
import {
  VendorDetailsSchema,
  initialVendorDetails,
} from "@/utils/validation/masters/vendor_master.validation";
import { FINANCE_URL } from "@/utils/api/urls";
import goBack from "@/utils/helper";
import DropDownList from "@/components/Helpers/DropDownList";
// Imports // ----------------------------------------------------------------

// Main Functions // ----------------------------------------------------------------
export const HeroAddVendor = () => {
  const queryClient = useQueryClient();

  // Add Bank Details
  const createVendorDetails = async (
    values: VendorDetailsData
  ): Promise<VendorDetailsData> => {
    const res = await axios({
      url: `${FINANCE_URL.VENDOR_MASTER_URL.create}`,
      method: "POST",
      data: values,
    });
    return res.data;
  };
  const { mutate } = useMutation(createVendorDetails, {
    onSuccess: () => {
      toast.success("Successfully Added Vendor Details!");
      setTimeout(() => {
        goBack();
      }, 1000);
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("vendor-list");
    },
  });

  return (
    <>
      <Toaster />
      <section className="border bg-white shadow-xl p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>Add Vendor</SubHeading>
        </div>

        <div className="mt-8">
          <Formik
            initialValues={initialVendorDetails}
            validationSchema={VendorDetailsSchema}
            onSubmit={(values: VendorDetailsData) => {
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
              handleReset,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                  <DropDownList
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.vendor_type_id}
                    error={errors.vendor_type_id}
                    touched={touched.vendor_type_id}
                    label="Vendor Type *"
                    name="vendor_type_id"
                    placeholder={"Select Vendor Type"}
                    api={FINANCE_URL.VENDOT_TYPE_URL.get || ""}
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile_no}
                    error={errors.mobile_no}
                    touched={touched.mobile_no}
                    label="Contact Number *"
                    name="mobile_no"
                    placeholder="Enter Contact Number"
                  />

                  <DropDownList
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department_id}
                    error={errors.department_id}
                    touched={touched.department_id}
                    label="Department *"
                    name="department_id"
                    placeholder={"Select Department"}
                    api={FINANCE_URL.DEPARTMENT_URL.get || ""}
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    label="Email Address"
                    name="email"
                    placeholder="Enter Eamil Id"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                    label="Vendor Name"
                    name="name"
                    placeholder="Enter Vendor Name"
                  />
                  {/* <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_name}
                    error={errors.bank_name}
                    touched={touched.bank_name}
                    label="Name of the bank"
                    name="bank_name"
                    placeholder="Enter Bank Name"
                  /> */}
                  <DropDownList
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_id}
                    error={errors.bank_id}
                    touched={touched.bank_id}
                    label="Name of the bank"
                    name="bank_id"
                    placeholder={"Select Bank Name"}
                    api={FINANCE_URL.BANK_URL.get || ""}
                  />

                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contact_address}
                    error={errors.contact_address}
                    touched={touched.contact_address}
                    label="Contact Address"
                    name="contact_address"
                    placeholder="Enter Contact Address"
                  />

                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ifsc_code}
                    error={errors.ifsc_code}
                    touched={touched.ifsc_code}
                    label="IFSC Code *"
                    name="ifsc_code"
                    placeholder="Enter IFSC Code"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tin_no}
                    error={errors.tin_no}
                    touched={touched.tin_no}
                    label="TIN No."
                    name="tin_no"
                    placeholder="Enter TIN No"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_account_no}
                    error={errors.bank_account_no}
                    touched={touched.bank_account_no}
                    label="Bank Account No."
                    name="bank_account_no"
                    placeholder="Enter Bank Account No"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gst_no}
                    error={errors.gst_no}
                    touched={touched.gst_no}
                    label="GST No."
                    name="gst_no"
                    placeholder="Enter GST No"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_branch_name}
                    error={errors.bank_branch_name}
                    touched={touched.bank_branch_name}
                    name="bank_branch_name"
                    label="Bank Branch"
                    placeholder="Enter Bank Branch"
                  />

                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.aadhar_no}
                    error={errors.aadhar_no}
                    touched={touched.aadhar_no}
                    name="aadhar_no"
                    label="Aadhaar No."
                    placeholder="Enter Aadhaar no"
                  />
                  <span></span>
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pan_no}
                    error={errors.pan_no}
                    touched={touched.pan_no}
                    name="pan_no"
                    label="Pan No."
                    placeholder="Enter PAN no"
                  />
                </div>

                <div className="flex items-center justify-end mt-5 gap-5">
                  <PrimaryButton
                    buttonType="button"
                    variant={"cancel"}
                    onClick={goBack}
                  >
                    Back
                  </PrimaryButton>
                  {dirty && (
                    <>
                      <PrimaryButton
                        onClick={handleReset}
                        buttonType="button"
                        variant={"cancel"}
                      >
                        Reset
                      </PrimaryButton>

                      <PrimaryButton buttonType="submit" variant="primary">
                        Save
                      </PrimaryButton>
                    </>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};
