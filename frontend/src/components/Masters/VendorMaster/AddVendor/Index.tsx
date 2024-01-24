"use client";

import React from "react";
import axios from "@/lib/axiosConfig";
import InputBox from "@/components/Helpers/InputBox";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import * as Yup from "yup";
import { Formik } from "formik";
import type { VendorDetailsData } from "@/utils/types/vendor_master_types";

export const HeroAddVendor = () => {
  const queryClient = useQueryClient();

  // Add Bank Details

  const createVendorDetails = async (
    values: VendorDetailsData
  ): Promise<VendorDetailsData> => {
    const res = await axios({
      url: `/api/finance/add-vendor-details`,
      method: "POST",
      data: values,
    });
    return res.data;
  };
  const { mutate } = useMutation(createVendorDetails, {
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
  });

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

  const initialVendorDetails: VendorDetailsData = {
    id: 0,
    vendor_type: {
      id: 0,
      name: "",
    },
    department: {
      id: 0,
      name: "",
    },
    name: "",
    mobile_no: "",
    tin_no: "",
    gst_no: "",
    comm_address: "",
    pan_no: "",
    bank_name: "",
    ifsc_code: "",
    email: "",
    office_address: "",
    aadhar_no: "",
    bank_account_no: "",
    bank_branch_name: "",
    is_authorized: false,
    created_at: "",
    authorized_date: null,
    updated_at: "",
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
            initialValues={initialVendorDetails}
            validationSchema={AddBankDetailsSchema}
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
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.vendor_type.name}
                    error={errors.vendor_type?.name}
                    touched={touched.vendor_type?.name}
                    label="Vendor Type *"
                    name="vendor_type"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile_no}
                    error={errors.mobile_no}
                    touched={touched.mobile_no}
                    label="Contact Number *"
                    name="mobile_no"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department.name}
                    error={errors.department?.name}
                    touched={touched.department?.name}
                    label="Department *"
                    name="department"
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
                    value={values.bank_name}
                    error={errors.bank_name}
                    touched={touched.bank_name}
                    label="Name of the bank"
                    name="bank_name"
                  />

                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.office_address}
                    error={errors.office_address}
                    touched={touched.office_address}
                    label="Office Address"
                    name="office_address"
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
                    value={values.tin_no}
                    error={errors.tin_no}
                    touched={touched.tin_no}
                    label="TIN No."
                    name="tin_no"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_account_no}
                    error={errors.bank_account_no}
                    touched={touched.bank_account_no}
                    label="Bank Account No."
                    name="bank_account_no"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gst_no}
                    error={errors.gst_no}
                    touched={touched.gst_no}
                    label="GST No."
                    name="gst_no"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_branch_name}
                    error={errors.bank_branch_name}
                    touched={touched.bank_branch_name}
                    name="bank_branch_name"
                    label="Bank Branch"
                  />

                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.aadhar_no}
                    error={errors.aadhar_no}
                    touched={touched.aadhar_no}
                    name="aadhar_no"
                    label="Aadhaar No."
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
