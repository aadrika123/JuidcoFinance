"use client";

import React from "react";
import axios from "@/lib/axiosConfig";
import { useMutation} from "react-query";
import { Formik } from "formik";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import * as Yup from "yup";
import type { AddReceiptDetailsData } from "@/utils/types/receipt_entry_types";
import toast, { Toaster } from "react-hot-toast";
import PrimaryButton from "@/components/Helpers/Button";
import PaymentModeRadioButtonSet from "@/components/Helpers/PaymentModeRadioButtonSet";

export const HeroViewReceipt = ({receiptId}: {receiptId:string}) => {
  
    // Add Bank Details
    const createBankDetails = async (
      values: AddReceiptDetailsData
    ): Promise<AddReceiptDetailsData> => {
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
    // ----- FORMIK & YUP FORM VAIDATION ---------- //
    const AddReceiptDetailsSchema = Yup.object().shape({
      bankName: Yup.string().required("Bank Name is required"),
      ifscCode: Yup.string().required("IFSC Code is required"),
      branch: Yup.string().required("Branch Name is required"),
      micrCode: Yup.string().required("Micr Code is required"),
      branchAddress: Yup.string().required("Branch Address is required"),
      branchCity: Yup.string().required("Branch City is required"),
      branchState: Yup.string().required("Branch State is required"),
      branchDistrict: Yup.string().required("Branch District is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      contactNo: Yup.string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Contact Number is required"),
      contactPersonName: Yup.string().required("Contact Person Name is required"),
    });
  
    const initialReceiptDetails = {
      bankName: "",
      ifscCode: "",
      branch: "",
      micrCode: "",
      branchAddress: "",
      branchCity: "",
      branchState: "",
      branchDistrict: "",
      email: "",
      contactNo: "",
      contactPersonName: "",
    };
  
    // ----- FORMIK & YUP FORM VAIDATION ---------- //
  

  return (
    <>
      <Toaster />
     
      <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>View/Edit Receipt</SubHeading>
      </div>

      
      <div className="mt-8">
      <Formik
                  initialValues={initialReceiptDetails}
                  validationSchema={AddReceiptDetailsSchema}
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
                          label="Reciept Date"
                          name="bankName"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.ifscCode}
                          error={errors.ifscCode}
                          touched={touched.ifscCode}
                          label="Email Id"
                          name="ifscCode"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branch}
                          error={errors.branch}
                          touched={touched.branch}
                          label="Reference No"
                          name="branch"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.micrCode}
                          error={errors.micrCode}
                          touched={touched.micrCode}
                          label="Module"
                          name="micrCode"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.micrCode}
                          error={errors.micrCode}
                          touched={touched.micrCode}
                          label="Paid By"
                          name="micrCode"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.micrCode}
                          error={errors.micrCode}
                          touched={touched.micrCode}
                          label="Receipt Type"
                          name="micrCode"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.micrCode}
                          error={errors.micrCode}
                          touched={touched.micrCode}
                          label="Reference Date"
                          name="micrCode"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.micrCode}
                          error={errors.micrCode}
                          touched={touched.micrCode}
                          label="Mobile No"
                          name="micrCode"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.micrCode}
                          error={errors.micrCode}
                          touched={touched.micrCode}
                          label="Administration Ward"
                          name="micrCode"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.micrCode}
                          error={errors.micrCode}
                          touched={touched.micrCode}
                          label="Narration"
                          name="micrCode"
                        />

                          <PaymentModeRadioButtonSet
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="paymentMode"
                          label="Select Mode of Payment"
                          value="Cash"
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
