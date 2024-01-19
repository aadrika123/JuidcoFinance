"use client"

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import InputBox from "../../Helpers/InputBox";
import FilledDisabledInputBox from "@/components/Helpers/FilledDisabledInputBox";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import { useQuery } from "react-query";
import Loader from "@/components/Helpers/Basic/Loader";


type VendorType = {
  id: BigInteger,
  type: string,
};

type DepartmentType = {
  id: BigInteger,
  name: string,
}

type VendorData = {
  id: BigInteger,
  vendor_no: string,
  name: string,
  mobile_no: string,
  tin_no: string,
  gst_no: string,
  is_authorized: boolean,
  vendor_type: VendorType,
  department: DepartmentType,
  email: string,
  bank_name: string,
  office_address: string,
  ifsc_code: string,
  bank_account_no: string,
  bank_branch_name: string,
  aadhar_no: string,
  pan_no: string,
  created_at: Date,
  updated_at: Date,
  authorized_date: Date
};

export const HeroViewVendor = ({vendorID}: {vendorID:string}) => {
   // ----- FETCH DATA ------////
   const fetchVendorData = async (): Promise<VendorData> => {
    const res = await axios({
      url: `/api/finance/get-single-vendor?id=${vendorID}`,
      method: "GET",
    });
    
    return res.data.data;
  };

  // ///
  const {
    data: vendorData,
    isError: vendorDataError,
    isLoading: vendorDataLoading,
  } = useQuery(["get-single-vendor", vendorID], fetchVendorData);

  if (vendorDataError) {
    throw new Error("some error occurred");
  }

  console.log(vendorData?.vendor_type?.type,"juyuj");


  return (
    <>
         <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>View Vendor</SubHeading>
        
      </div>

      
      <section className="mt-8">
        {vendorDataLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-x-6 gap-4">
            <FilledDisabledInputBox label="Vendor Type *"  value={vendorData?.vendor_type?.type}/>
            <FilledDisabledInputBox label="Contact Number" value={vendorData?.mobile_no}/>
            <FilledDisabledInputBox label="Department Name" value={vendorData?.department?.name} />
            <FilledDisabledInputBox label="Email Address" value={vendorData?.email}/>
            <FilledDisabledInputBox label="Vendor Name" value={vendorData?.name}/>
            <FilledDisabledInputBox label="Name of the Bank" value={vendorData?.bank_name} />
            <FilledDisabledInputBox label="Office Address" value={vendorData?.office_address}/>
            <FilledDisabledInputBox label="IFSC Code *" value={vendorData?.ifsc_code}/>
            <FilledDisabledInputBox label="TIN No" value={vendorData?.tin_no}/>
            <FilledDisabledInputBox label="Bank Account No." value={vendorData?.bank_account_no}/>
            <FilledDisabledInputBox label="GST No." value={vendorData?.gst_no}/>
            <FilledDisabledInputBox label="Bank Branch" value={vendorData?.bank_branch_name}/>
            <FilledDisabledInputBox label="Aadhaar No." value={vendorData?.aadhar_no}/>
            <div className="grid grid-cols-3 gap-x-6 gap-4">
            <FilledDisabledInputBox label="Date Created" value={vendorData?.created_at}/>
            <FilledDisabledInputBox label="Date Authorized" />
            <FilledDisabledInputBox label="Date Modified" />
              
            </div>
            <FilledDisabledInputBox label="Pan No." value={vendorData?.pan_no}/>
        </div>

        <div className="flex items-center justify-end mt-5 gap-5">
          
        

          <PrimaryButton
          variant={"cancel"}
          >
            Back
          </PrimaryButton>

          <PrimaryButton variant="primary">
            Print
          </PrimaryButton>
        </div>
          </div>
        )}
      </section>
      <div className="mt-8">
        
        
      </div>
    </section>
      
    </>
  );
};
