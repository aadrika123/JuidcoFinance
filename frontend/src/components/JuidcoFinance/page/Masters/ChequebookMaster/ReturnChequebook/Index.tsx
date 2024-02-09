"use client";

import React, { useState } from "react";
import axios from "@/lib/axiosConfig";
import { useMutation, useQuery } from "react-query";
import Loader from "@/components/Helpers/Basic/Loader";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { ChequebookTableData } from "@/utils/types/chequebook_master_types";
import { addChequebookDetails } from "@/redux/reducers/chequebookMasterReducer";
import ChequebookList from "../ChequebokList/ChequebookList";
import { SubHeading } from "@/components/Helpers/Heading";
import InputBox from "@/components/Helpers/InputBox";
import * as Yup from "yup";
import type { AddBankDetailsData } from "@/utils/types/types";
import toast, { Toaster } from "react-hot-toast";
import PrimaryButton from "@/components/Helpers/Button";

export const HeroReturnChequebook = () => {
  const [page, setPage] = useState<number>(1);
  
  const handlePageChangeAccountList = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };


  // redux
  const dispatch = useDispatch();

  // redux

  // ----- FETCH DATA ------////



  const fetchBankData = async (): Promise<ChequebookTableData[]> => {
    // const res = await axios({
    //   url: `/api/finance/bank-list?limit=10&page=${page}`,
    //   method: "GET",
    // });
    
    // return res.data?.data?.data;

    const chequebookData = [
      {
        id: 1, 
        date: '3-4-2022',
        bank_branch: "bank branch, ranchi", 
        bank_name: "SBI",
        bank_account_number: "2284834848484",
        cheque_no_from: "3838383",
        cheque_no_to: "34343243",
        employee_name: "Rajesh Kumar",
        issuer_name: "SBI ranchi",
        ifsc_code: "3737",
        page_count: 10,
        remarks: "no remarks"
      },
  
      {
        id: 2, 
        date: '1-1-2021',
        bank_branch: "bank branch, jamshedpur", 
        bank_name: "ICICI bank",
        bank_account_number: "43432423",
        cheque_no_from: "244",
        cheque_no_to: "300",
        employee_name: "Suresh Kumar",
        issuer_name: "ICICI Delhi",
        ifsc_code: "3737",
        page_count: 10,
        remarks: "no remarks"
      },
    ];
    
    return chequebookData;
  };

  const {
    data: chequebookListData = [],
    isError: chequebookError,
    isLoading: chequebookLoading,
  } = useQuery(["bank-list", page], fetchBankData);

  // console.log(chequebookListData);
  dispatch(addChequebookDetails(chequebookListData));

  if (chequebookError) {
    throw new Error("some error occurred");
  }


    // Add Bank Details
    const createBankDetails = async (
      values: AddBankDetailsData
    ): Promise<AddBankDetailsData> => {
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
    const AddBankDetailsSchema = Yup.object().shape({
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
  
    const initialBankDetailsValues = {
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
      <div className="overflow-x-auto flex justify-between">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Chequebook Master</SubHeading>
        </div>
      </div>

      <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>Return Chequebook</SubHeading>
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
                      <div className="grid grid-cols-4 gap-x-6 gap-4 ">
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.bankName}
                          error={errors.bankName}
                          touched={touched.bankName}
                          label="Bank Name"
                          name="bankName"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.ifscCode}
                          error={errors.ifscCode}
                          touched={touched.ifscCode}
                          label="Account Number"
                          name="ifscCode"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branch}
                          error={errors.branch}
                          touched={touched.branch}
                          label="Chequebook No From"
                          name="branch"
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
                        </div>
                        <div className="grid grid-cols-1 gap-x-6 gap-4 ">
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branchAddress}
                          error={errors.branchAddress}
                          touched={touched.branchAddress}
                          label="Remark"
                          name="branchAddress"
                        />
                        
                      </div>
                      <div className="mt-4 flex items-center gap-5 justify-end">
                        
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

      <section className="mt-8">
      {chequebookLoading ? (
          <Loader />
        ) : (
      <ChequebookList
            title="List of Returned Chequebooks"
            nextPage={() => handlePageChangeAccountList("next")}
            prevPage={() => handlePageChangeAccountList("prev")}
            page={page}
          />
        )}
      </section>
    </>
  );
};
