"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import { Formik } from "formik";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import { VendorDetailsSchema } from "@/utils/validation/masters/vendor_master.validation";
import { VendorDetailsData } from "@/utils/types/vendor_master_types";
import { FINANCE_URL } from "@/utils/api/urls";
import DropDownList from "@/components/Helpers/DropDownList";
import goBack from "@/utils/helper";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";

export const HeroEditVendor = ({ vendorID }: { vendorID: string }) => {
  const [vendorDetails, setVendorDetails] = useState<VendorDetailsData>();

  const queryClient = useQueryClient();
  // GET VENDOR DETAILS BY ID
  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${FINANCE_URL.VENDOR_MASTER_URL.getById}/${vendorID}`,
        method: "GET",
      });
      setVendorDetails(res?.data?.data);
    })();
  }, [vendorID]);

  // UPDATE VENDOR DETAILS
  const updateVendorDetails = async (
    values: VendorDetailsData
  ): Promise<VendorDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.VENDOR_MASTER_URL.update}`,
        method: "POST",
        data: {
          id: vendorDetails?.id,
          ...values,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<VendorDetailsData, Error, VendorDetailsData>(
    updateVendorDetails,
    {
      onSuccess: () => {
        toast.success("Updated vendor details");
      },
      onError: () => {
        alert("Error updating vendor details");
      },
      onSettled: () => {
        queryClient.invalidateQueries("vendor-list");
        goBack();
      },
    }
  );

  return (
    <>
      <Toaster />
      <section className="border rounded-lg bg-white border-primary_green p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>Edit Vendor</SubHeading>
        </div>

        <div className="mt-8">
          <Formik
            initialValues={{
              vendor_type_id: vendorDetails?.vendor_type?.id || "",
              department_id: vendorDetails?.department?.id || "",
              name: vendorDetails?.name || "",
              mobile_no: vendorDetails?.mobile_no || "",
              tin_no: vendorDetails?.tin_no || "",
              gst_no: vendorDetails?.gst_no || "",
              pan_no: vendorDetails?.pan_no || "",
              bank_id: vendorDetails?.bank?.id || "",
              ifsc_code: vendorDetails?.ifsc_code || "",
              email: vendorDetails?.email || "",
              contact_address: vendorDetails?.contact_address || "",
              aadhar_no: vendorDetails?.aadhar_no || "",
              bank_account_no: vendorDetails?.bank_account_no || "",
              bank_branch_name: vendorDetails?.bank_branch_name || "",
            }}
            validationSchema={VendorDetailsSchema}
            enableReinitialize={true}
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
              dirty
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
                <div className="mt-4 flex items-center gap-5 justify-end">
                  <PrimaryButton
                    buttonType="button"
                    variant="cancel"
                    onClick={goBack}
                  >
                    Close
                  </PrimaryButton>
                  {dirty && <>
                  <PrimaryButton onClick={handleReset} buttonType="button" variant="cancel">
                    Reset
                  </PrimaryButton>
                  <PrimaryButton buttonType="submit" variant="primary">
                    Save
                  </PrimaryButton>
                  </>}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};
