"use client";

import React from "react";
import axios from "@/lib/axiosConfig";
import InputBox from "../../Helpers/InputBox";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import * as Yup from "yup";
import { Formik } from "formik";

interface VendorData {
  vendorType: number;
  name: string;
  mobileNo: string;
  contactAddress: string;
  tinNo: string;
  panNo: string;
  bankName: string;
  ifscCode: string;
  departmentId: number;
  email: string;
  gstNo: string;
  aadharNo: string;
  bankAccountNo: string;
  bankBranchName: string;
}

export const HeroAddVendor = () => {
  const queryClient = useQueryClient();

  // Add Bank Details

  const createVendorDetails = async (
    values: VendorData
  ): Promise<VendorData> => {
    const res = await axios({
      url: `/api/finance/add-vendor-details`,
      method: "POST",
      data: values,
    });
    return res.data;
  };
  const { mutate } = useMutation(
    createVendorDetails,
    {
      onSuccess: (data) => {
        console.log(data);
        toast.success("Successfully Added Vendor Details!");
      },
      onError: () => {
        alert("there was an error");
      },
      onSettled: () => {
        queryClient.invalidateQueries("create");
      },
    }
  );

  // ----- FORMIK & YUP FORM VAIDATION ---------- //

  const AddBankDetailsSchema = Yup.object().shape({
    vendorType: Yup.string().required("Vendor type is required"),
    mobileNo: Yup.string()
      .matches(/^\d{10}$/, "Invalid mobile number")
      .required("Mobile Number is required"),
    departmentId: Yup.number().required("Department is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string().required("Vendor Name is required"),
    bankName: Yup.string().required("Bank Name is required"),

    contactAddress: Yup.string().required("Contact address is required"),
    ifscCode: Yup.string().required("IFSC code is required"),
    tinNo: Yup.string().required("TIN No. is required"),

    bankAccountNo: Yup.string().required("Bank account no. is required"),
    gstNo: Yup.string().required("GST No. Name is required"),
    bankBranchName: Yup.string().required("Bank Branch Name is required"),
    aadharNo: Yup.string().required("Aaadhaar number is required"),
    panNo: Yup.string().required("Pan number is required"),
  });

  const initialBankDetailsValues = {
    vendorType: -1,
    mobileNo: "",
    departmentId: -1,
    email: "",
    name: "",
    bankName: "",
    contactAddress: "",
    ifscCode: "",
    tinNo: "",
    bankAccountNo: "",
    gstNo: "",
    bankBranchName: "",
    aadharNo: "",
    panNo: "",
  };

  // ----- FORMIK & YUP FORM VAIDATION ---------- //

  return (
    <>
      <section className="border rounded-lg border-zinc-300 p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>Add Vendor</SubHeading>
        </div>

        <div className="mt-8">
          <Formik
            initialValues={initialBankDetailsValues}
            validationSchema={AddBankDetailsSchema}
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
                    value={values.vendorType}
                    error={errors.vendorType}
                    touched={touched.vendorType}
                    label="Vendor Type *"
                    name="vendorType"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobileNo}
                    error={errors.mobileNo}
                    touched={touched.mobileNo}
                    label="Contact Number *"
                    name="mobileNo"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.departmentId}
                    error={errors.departmentId}
                    touched={touched.departmentId}
                    label="Department *"
                    name="departmentId"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    label="Email Address"
                    name="email"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                    label="Vendor Name"
                    name="name"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bankName}
                    error={errors.bankName}
                    touched={touched.bankName}
                    label="Name of the bank"
                    name="bankName"
                  />

                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contactAddress}
                    error={errors.contactAddress}
                    touched={touched.contactAddress}
                    label="Contact Address"
                    name="contactAddress"
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
                    value={values.tinNo}
                    error={errors.tinNo}
                    touched={touched.tinNo}
                    label="TIN No."
                    name="tinNo"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bankAccountNo}
                    error={errors.bankAccountNo}
                    touched={touched.bankAccountNo}
                    label="Bank Account No."
                    name="bankAccountNo"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gstNo}
                    error={errors.gstNo}
                    touched={touched.gstNo}
                    label="GST No."
                    name="gstNo"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bankBranchName}
                    error={errors.bankBranchName}
                    touched={touched.bankBranchName}
                    name="bankBranchName"
                    label="Bank Branch"
                  />

                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.aadharNo}
                    error={errors.aadharNo}
                    touched={touched.aadharNo}
                    name="aadharNo"
                    label="Aadhaar No."
                  />
                  <span></span>
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.panNo}
                    error={errors.panNo}
                    touched={touched.panNo}
                    name="panNo"
                    label="Pan No."
                  />
                </div>

                <div className="flex items-center justify-end mt-5 gap-5">
                  <PrimaryButton
                    variant={"cancel"}
                    onClick={() => {
                      history.back();
                    }}
                  >
                    Back
                  </PrimaryButton>

                  <PrimaryButton buttonType="button" variant={"cancel"}>
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
