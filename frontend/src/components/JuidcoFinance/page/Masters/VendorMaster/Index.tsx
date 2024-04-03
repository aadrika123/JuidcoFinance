"use client";

import React, { useState } from "react";
import axios from "@/lib/axiosConfig";
import VendorList from "./VendorList/VendorList";
import AddVendorHeader from "./AddVendorWidget/AddVendorWidget";
import { useQuery } from "react-query";
import { FINANCE_URL } from "@/utils/api/urls";
import { VendorDetailsData } from "./vendor_master_types";
import { MasterProps } from "../../Documentation/ChartsOfAccount/types";
import Loader from "@/components/global/atoms/Loader";
export const HeroVendorMaster = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fetchSearchQuery, setFetchSearchQuery] = useState<boolean>(false);

  const handleChangePage = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };

  function handleChangeSearchQuery() {
    setFetchSearchQuery(!fetchSearchQuery);
  }

  // ----- FETCH DATA ------////

  const fetchBankData = async (): Promise<MasterProps<VendorDetailsData>> => {
    const res = await axios({
      url: `${FINANCE_URL.VENDOR_MASTER_URL.get}&page=${page}&search=${searchQuery}`,
      method: "GET",
    });
    if(!res.data.status)  throw new Error("Something Went Wrong!!");
    
    return res.data?.data as MasterProps<VendorDetailsData>;
  };

  const {
    data: vendorListData,
    isError: vendorError,
    isLoading: vendorLoading,
  } = useQuery(["vendor-list", page, fetchSearchQuery], fetchBankData);

  // if (vendorListData?.data) {
  //   dispatch(addBankDetails(accountListData?.data ?? []));
  // }

  if (vendorError) {
    throw new Error("some error occurred");
  }

  return (
    <>
      <section>
        <AddVendorHeader />
      </section>

      <section className="mt-8">
        {vendorLoading ? (
          <Loader />
        ) : (
          <VendorList
            data={vendorListData?.data ?? []}
            nextPage={() => handleChangePage("next")}
            prevPage={() => handleChangePage("prev")}
            page={page}
            setSearchQuery={setSearchQuery}
            fetchVendorSearchQuery={handleChangeSearchQuery}
          />
        )}
      </section>
    </>
  );
};
