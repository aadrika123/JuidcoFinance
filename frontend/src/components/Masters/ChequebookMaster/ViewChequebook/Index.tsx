"use client"
import React from "react";
import axios from "@/lib/axiosConfig";
import FilledDisabledInputBox from "@/components/Helpers/FilledDisabledInputBox";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import { useQuery } from "react-query";
import Loader from "@/components/Helpers/Basic/Loader";
import { ChequebookTableData } from "@/utils/types/chequebook_master_types";



export const HeroViewChequebook = ({chequebookID}: {chequebookID:string}) => {
   // ----- FETCH DATA ------////
   const fetchVendorData = async (): Promise<ChequebookTableData> => {
    // const res = await axios({
    //   url: `/api/finance/get-single-vendor?id=${vendorID}`,
    //   method: "GET",
    // });
    
    // return res.data.data;

  const chequebook = {
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
  };
  return chequebook;

  };

  // ///
  const {
    data: chequebookData,
    isError: chequebookDataError,
    isLoading: vendorDataLoading,
  } = useQuery(["get-single-vendor", chequebookID], fetchVendorData);

  if (chequebookDataError) {
    throw new Error("some error occurred");
  }

  // console.log(chequebookData?.vendor_type?.type,"juyuj");


  return (
    <>
      <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>View / Edit Chequebook</SubHeading>
        
      </div>

      
      <section className="mt-8">
        {vendorDataLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-x-6 gap-4">
            <FilledDisabledInputBox label="Date"  value={chequebookData?.date}/>
            <FilledDisabledInputBox label="Issuer Name"  value={chequebookData?.issuer_name}/>
            <FilledDisabledInputBox label="Name of the Bank"  value={chequebookData?.bank_name}/>
            <FilledDisabledInputBox label="Employee Name"  value={chequebookData?.employee_name}/>
            <FilledDisabledInputBox label="Bank Branch Name"  value={chequebookData?.bank_branch}/>
            <FilledDisabledInputBox label="Cheque Number From"  value={chequebookData?.cheque_no_from}/>
            <FilledDisabledInputBox label="Bank Account No"  value={chequebookData?.bank_account_number}/>
            <FilledDisabledInputBox label="Cheque Number To"  value={chequebookData?.cheque_no_to}/>
            <FilledDisabledInputBox label="IFSC Code"  value={chequebookData?.ifsc_code}/>
            <FilledDisabledInputBox label="Number of Pages"  value={""+chequebookData?.page_count}/>

            
        </div>

        <div className="flex items-center justify-end mt-5 gap-5">
        
          <PrimaryButton variant={"cancel"}>
            Print
          </PrimaryButton>

          <PrimaryButton
          variant={"cancel"}
          >
            Reset
          </PrimaryButton>

          <PrimaryButton variant="primary">
            Save
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
