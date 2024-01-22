"use client";

import React, { useState } from "react";
import axios from "@/lib/axiosConfig";
import ChequebookList from "./ChequebokList/ChequebookList";
import { useQuery} from "react-query";
import Loader from "../Helpers/Basic/Loader";

import { useDispatch } from "react-redux";
import { ChequebookTableData } from "@/utils/types/chequebook_master_types";
import ChequebookMasterHeader from "./Header/ChequebookMasterHeader";
import { addChequebookDetails } from "@/redux/chequebookMasterReducer";

export const HeroChequebookMaster = () => {
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


  // ----- FORMIK & YUP FORM VAIDATION ---------- //

  return (
    <>
      <section>
        <ChequebookMasterHeader />
      </section>

      <section className="mt-8">
      {chequebookLoading ? (
          <Loader />
        ) : (
      <ChequebookList
            title="List of chequebooks"
            nextPage={() => handlePageChangeAccountList("next")}
            prevPage={() => handlePageChangeAccountList("prev")}
            page={page}
          />
        )}
      </section>
    </>
  );
};
