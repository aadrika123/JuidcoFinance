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
import goBack from "@/utils/helper";

export const HeroEditVendor = ({ vendorID }: { vendorID: string }) => {
  const [vendorDetails, setVendorDetails] = useState<[]>();
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
  return (
    <>
      <section className="border rounded-lg border-zinc-300 p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>Edit Vendor</SubHeading>
        </div>

        <div className="mt-8">
          <Formik
            initialValues={{
              vendor_type_id: 0,
              department_id: 0,
              name: "",
              mobile_no: "",
              tin_no: "",
              gst_no: "",
              pan_no: "",
              bank_name: "",
              ifsc_code: "",
              email: "",
              contact_address: "",
              aadhar_no: "",
              bank_account_no: "",
              bank_branch_name: "",
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
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.vendor_type_id}
                    error={errors.vendor_type_id}
                    touched={touched.vendor_type_id}
                    label="Vendor Type *"
                    name="vendor_type_id"
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
                    value={values.department_id}
                    error={errors.department_id}
                    touched={touched.department_id}
                    label="Department Name"
                    name="department_id"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_account_no}
                    error={errors.bank_account_no}
                    touched={touched.bank_account_no}
                    label="bank_account_no Address"
                    name="bank_account_no"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.vendor_no}
                    error={errors.vendor_no}
                    touched={touched.vendor_no}
                    label="Vendor Name"
                    name="vendor_no"
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
                    label="IFSC Code"
                    name="ifsc_code"
                  />
                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tin_no}
                    error={errors.tin_no}
                    touched={touched.tin_no}
                    label="TIN No. "
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
                    name="gst_no"
                    label="GST No."
                  />

                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_branch_name}
                    error={errors.bank_branch_name}
                    touched={touched.bank_branch_name}
                    name="bank_branch"
                    label="Bank Branch."
                  />

                  <InputBox
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.aadhar_no}
                    error={errors.aadhar_no}
                    touched={touched.aadhar_no}
                    name="aadhaar_no"
                    label="Aadhaar No.."
                  />

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

          <div className="flex items-center justify-end mt-5 gap-5">
            <PrimaryButton variant={"cancel"}>Back</PrimaryButton>

            <PrimaryButton variant={"cancel"}>Reset</PrimaryButton>

            <PrimaryButton variant="primary">Print</PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
};
